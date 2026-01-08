import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, ApplicationRef, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MetersMapService } from './meters-map.service';
import { MeterInfo } from 'src/app/model/interfaces/meters/meterInfo';
import { MeterPopupComponent } from './meter-popup/meter-popup.component';

@Component({
  selector: 'app-meters-map-page',
  templateUrl: './meters-map.component.html',
  styleUrls: ['./meters-map.component.css'],
})
export class MetersMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
  map?: mapboxgl.Map;

  // Markers list for direct DOM markers
  private markers: mapboxgl.Marker[] = [];
  // track dynamically created popup component refs so we can destroy them
  private popupComponentRefs: ComponentRef<MeterPopupComponent>[] = [];

  constructor(
    private readonly metersService: MetersMapService,
    private readonly appRef: ApplicationRef,
    private readonly cfr: ComponentFactoryResolver,
    private readonly injector: Injector
  ) {}

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = "pk.eyJ1Ijoic2FudGlhZ292aXpjYWlubyIsImEiOiJjbGt0MWlsbGIwN2d0M2ZtYWlmOXJwdDd5In0.fShLdUaQGEZKXprKykIk3Q";

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-78, -1.53],
      zoom: 7,
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    // Once the map is ready, load meters and render them
    this.map.on('load', () => {
      this.loadMeters();
    });
  }

  private loadMeters(): void {
    this.metersService.getMeters().subscribe({
      next: (resp) => {
        const meters = resp.result || [] as MeterInfo[];

        const geojson = {
          type: 'FeatureCollection',
          features: meters
            .filter(m => m.latitude != null && m.longitude != null)
            .map(m => ({
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [m.longitude, m.latitude] },
              properties: {
                id: m.id,
                serial: m.serial,
                name: m.codigo,
                status: m.status,
                manufacturingYear: m.manufacturingYear,
                province: m.province,
                sector: m.sector
              }
            }))
        };

        if (!this.map) return;

        if (this.map.getLayer && this.map.getLayer('meters-points')) {
          try { this.map.removeLayer('meters-points'); } catch {}
        }
        if (this.map.getSource && this.map.getSource('meters')) {
          try { this.map.removeSource('meters'); } catch {}
        }

        this.markers.forEach(m => m.remove());
        this.markers = [];
        this.popupComponentRefs.forEach(ref => {
          try {
            this.appRef.detachView(ref.hostView);
            ref.destroy();
          } catch (e) {
            // ignore
          }
        });
        this.popupComponentRefs = [];

        // Create markers for each meter
        meters.forEach(m => {
          const lngLat: [number, number] = [m.longitude, m.latitude];
          const color = m.status === 'Active' ? '#2563eb' : '#9e9e9e';

            // Create a DOM container and bootstrap the Angular popup component into it
          const popupContainer = document.createElement('div');
          const factory = this.cfr.resolveComponentFactory(MeterPopupComponent);
          const compRef = factory.create(this.injector);
          compRef.instance.meter = m;
          this.appRef.attachView(compRef.hostView);
          const rootNode = (compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
          popupContainer.appendChild(rootNode);

          const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContainer);

          const marker = new mapboxgl.Marker({ color })
            .setLngLat(lngLat)
            .setPopup(popup)
            .addTo(this.map as mapboxgl.Map);


          // Track so we can destroy if marker removed
          this.popupComponentRefs.push(compRef);

          // Make cursor pointer when hovering marker element
          const el = marker.getElement();
          el.style.cursor = 'pointer';

          this.markers.push(marker);
        });

        // Adjust map view to fit all markers
        this.fitToMarkers({ padding: 40, maxZoom: 12 });
      },
      error: (err) => {
        console.error('Failed to load meters', err);
      }
    });
  }

  private fitToMarkers(opts: { padding?: number; maxZoom?: number; animate?: boolean } = {}) {
    const { padding = 20, maxZoom = 14, animate = true } = opts;
    if (!this.map || !this.markers.length) return;

    // Single marker -> flyTo (better zoom control)
    if (this.markers.length === 1) {
      const lngLat = this.markers[0].getLngLat();
      this.map.flyTo({ center: [lngLat.lng, lngLat.lat], zoom: maxZoom, speed: 1.2 });
      return;
    }

    // Multiple markers -> compute bounds and fit
    const bounds = new mapboxgl.LngLatBounds();
    this.markers.forEach(m => bounds.extend(m.getLngLat()));
    this.map.fitBounds(bounds, { padding, maxZoom, duration: animate ? 1000 : 0 });
  }

  ngOnDestroy(): void {
    if (this.map) {
      // Remove markers
      this.markers.forEach(m => m.remove());
      this.markers = [];

      this.map.remove();
    }
  }
}
