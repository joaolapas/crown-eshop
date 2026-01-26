import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Busy {
  private busyRequestCount = signal(0);
  loading = signal(false);

  busy() {
    this.busyRequestCount.update(v => v + 1);
    this.loading.set(true);
  }

  idle() {
    this.busyRequestCount.update(v => Math.max(0, v - 1));

    if (this.busyRequestCount() === 0) {
      this.loading.set(false);
    }
  }
}
