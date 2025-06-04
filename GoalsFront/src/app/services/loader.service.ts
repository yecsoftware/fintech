// src/app/core/services/loader.service.ts
import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private requestCount = signal(0);
  readonly loading = computed(() => this.requestCount() > 0);

  start() {
    this.requestCount.set(this.requestCount() + 1);
  }

  stop() {
    const next = Math.max(0, this.requestCount() - 1);
    this.requestCount.set(next);
  }
}