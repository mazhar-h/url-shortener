import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private linkService: LinkService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        let code = params.get('id');
        if (!code)
          return;
        this.linkService.getLink(code)
          .subscribe({
            next: (response) => { location.replace(response.url); },
            error: (error) => { location.replace('not-found'); }
          });
      });
  }
}
