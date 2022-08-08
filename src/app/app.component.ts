import { Component } from '@angular/core';
import { YaEvent } from 'angular8-yandex-maps';

interface Placemark {
  geometry: number[];
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  chosenBalloon: any;
  placemarks: Placemark[] = [];
  coords: any;
  newBalloon: any
  ngOnInit() {
    const testLocation: Placemark = {
      geometry: [55.99673422345336, 37.21478035583862],
      properties: {hintContent: 'информация о точке', balloonContent: 'Торговый центр'},
      options: {
        preset: 'islands#greenDotIcon',
      }
    };
    // @ts-ignore
    const coordinates = JSON.parse(localStorage.getItem('coordinates'));
    this.placemarks = coordinates ? coordinates : [];
    this.placemarks.push(testLocation);
  }

  onMapClick(e: YaEvent<ymaps.Map>): void {
    const {target, event} = e;
    if (!target.balloon.isOpen()) {
      this.newBalloon = target
      this.coords = event.get('coords');
      target.balloon.open(this.coords, {
        contentHeader: 'Добавьте информацию о точке',
        contentBody:
          '<p>Информация: <input type="text" id="balloon" ></p>',
      });
    } else {
      target.balloon.close();
      this.newBalloon = null;
    }
  }

  addPoint(): void {
    // @ts-ignore
    let data = document.getElementById('balloon').value;
    this.placemarks.push({
      geometry: this.coords,
      properties: {
        hintContent: 'Информация о точке',
        balloonContent: data,
      },
      options: {
        preset: 'islands#greenDotIcon',
      },
    });
    localStorage.setItem('coordinates', JSON.stringify(this.placemarks));
    this.newBalloon.balloon.close()
  }

  deletePoint(): void {
    this.placemarks = this.placemarks.filter(item => {
      return item.geometry !== this.chosenBalloon;
    });
    this.chosenBalloon = null;
    localStorage.setItem('coordinates', JSON.stringify(this.placemarks));
  }

  actionClick($event: YaEvent<ymaps.Placemark>) {
    this.chosenBalloon = $event.target.geometry?.getCoordinates();
  }

  onMapBalloonClose() {
    this.newBalloon = null;
  }
}
