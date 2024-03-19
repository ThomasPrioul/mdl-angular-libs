import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateTime } from 'luxon';
import { BehaviorSubject, map, take, tap } from 'rxjs';

type SupportedDurationsMs = 2000 | 5000;

export interface AppNotification {
  classes: string[];
  date: DateTime;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: AppNotification[] = [];
  private notificationsSub = new BehaviorSubject<AppNotification[]>([]);

  constructor(private snackBar: MatSnackBar) {}

  public get count$() {
    return this.notificationsSub.asObservable().pipe(map((n) => n.length));
  }

  public get notifications$() {
    return this.notificationsSub.asObservable();
  }

  public ack(notificationIdx: number) {
    this.notifications.splice(notificationIdx, 1);
    this.notificationsSub.next(this.notifications);
  }

  public clear() {
    this.notificationsSub.next((this.notifications = []));
  }

  public error(message: string, duration?: SupportedDurationsMs) {
    this.showNotification(message, ['error', 'with-info-icon'], duration);
  }

  public info(message: string, duration?: SupportedDurationsMs) {
    this.showNotification(message, ['info', 'with-info-icon'], duration);
  }

  public showNotification(
    message: string,
    classes: string[],
    duration?: SupportedDurationsMs,
    button?: string
  ) {
    if (!button) {
      classes.push('with-close-button');
      button = '🗙';
    }

    if (duration) {
      classes.push(`duration-${duration}`);
    }

    // If an old notification exists and is still open, push it to the notifications list
    if (this.snackBar._openedSnackBarRef) {
      this.snackBar.dismiss();
    }

    const newNotification =
      // duration
      //   ? undefined
      //   :
      {
        date: DateTime.now(),
        message: message,
        classes: classes,
      };

    const newSnackBar = this.snackBar.open(message, button, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['mdl', 'small', ...classes],
      duration: duration,
    });

    newSnackBar
      .afterDismissed()
      .pipe(
        take(1),
        tap((dismiss) => {
          if (!dismiss.dismissedByAction && newNotification) {
            this.notifications.push(newNotification);
            this.notificationsSub.next(this.notifications);
          }
        })
      )
      .subscribe();
  }

  public success(message: string, duration?: SupportedDurationsMs) {
    this.showNotification(message, ['info', 'with-checked-icon'], duration);
  }

  public trackByNotifDate(index: number, item: AppNotification) {
    return item.date.toMillis();
  }
}
