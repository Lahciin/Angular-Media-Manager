import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../models/alert';
import { Router, NavigationStart } from '@angular/router';



@Injectable(
  {
    providedIn: 'root',
  }
)
export class AlertService {

    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;
    constructor(private router: Router) {
       // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
       router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            if (this.keepAfterRouteChange) {
                // only keep for a single route change
                this.keepAfterRouteChange = false;
            } else {
                // clear alert messages
                this.clear();
            }
        }
    });
    }

    // subscribe to alerts
    getAlert(): Observable<any>  {
        return this.subject.asObservable();
    }

    // convenience methods
    success(message: string) {
        this.alert(new Alert({ message, type: AlertType.Success }));
    }

    error(message: string) {
        this.alert(new Alert({ message, type: AlertType.Error }));
    }

    info(message: string) {
        this.alert(new Alert({ message, type: AlertType.Info }));
    }

    warn(message: string) {
        this.alert(new Alert({ message, type: AlertType.Warning }));
    }

    // main alert method
    alert(alert: Alert) {
        this.subject.next(alert);
    }

    // clear alerts
    clear() {
        this.subject.next();
    }

}
