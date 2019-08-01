import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IChannel } from './channel.model';
import {faArrowLeft, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ng-notification-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['../../style/style.css']
})
export class ChannelDetailComponent implements OnInit {
  channel: IChannel;

  faArrowLeft = faArrowLeft;
  faTimes = faTimes;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ channel }) => {
      this.channel = channel;
    });
  }

  previousState() {
    window.history.back();
  }
}
