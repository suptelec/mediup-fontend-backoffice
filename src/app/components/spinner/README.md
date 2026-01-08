Usage
-----

1) Add the `<app-spinner></app-spinner>` component to a root template (e.g., `app.component.html`) so it can render globally:

```html
<app-spinner></app-spinner>
```

2) Use the `SpinnerService` to show/hide manually:

```ts
constructor(private spinner: SpinnerService) {}

someAction() {
  this.spinner.show();
  doSomething().finally(() => this.spinner.hide());
}
```

3) Wrap Observables/Promises using `SpinnerService.track()` to automatically show/hide:

```ts
this.spinner.track(this.myService.doWork()).subscribe(...);
```

4) Enable automatic spinner for HTTP calls by registering the interceptor (already provided). To skip spinner for a specific request, set the header `X-Skip-Spinner` on the `HttpRequest`.

Notes
-----
- The spinner overlay blocks pointer events to prevent user interaction while active.
- The service uses a reference counter, so multiple concurrent calls won't prematurely hide the spinner.