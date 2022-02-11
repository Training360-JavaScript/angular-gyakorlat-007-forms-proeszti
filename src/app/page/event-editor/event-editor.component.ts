import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {


  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap(params => this.eventService.get(params['id'])),
  );

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  onUpdate(ngForm: NgForm): void {
    this.eventService.update(ngForm.form.value).subscribe(
      event => this.router.navigate(['/', 'event']),
      console.log);
  }
}
