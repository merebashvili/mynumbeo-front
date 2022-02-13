import { Subscription } from 'rxjs';

export class SubscriptionsContainer {
  private subs: Subscription[] = [];

  set add(sub: Subscription) {
    this.subs.push(sub);
  }

  dispose() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
