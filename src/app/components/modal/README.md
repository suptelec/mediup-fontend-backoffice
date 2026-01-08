Usage
-----

1) Inject and use `ModalService` where you want to open the modal (e.g. in a component):

```ts
constructor(private modalService: ModalService) {}

openModal() {
  this.modalService.open();
}
```

2) Add the `app-modal` component somewhere (e.g. in `app.component.html`) and provide the header/body/footer using the child components:

```html
<button (click)="openModal()">Open modal</button>

<app-modal>
  <app-modal-header>
    <h3>Title</h3>
  </app-modal-header>

  <app-modal-body>
    <p>Modal content goes here.</p>
  </app-modal-body>

  <app-modal-footer>
    <button (click)="modalService.close()">Close</button>
    <button class="primary">Save</button>
  </app-modal-footer>
</app-modal>
```

Notes
-----
- Clicking the overlay or the close button will close the modal.
- `ModalService` is provided in root; use it to open/close the modal from any component.