import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-websites-list',
  templateUrl: './websites-list.component.html',
  styleUrls: ['./websites-list.component.scss']
})
export class WebsitesListComponent {

  constructor(private passwordManagerService: PasswordManagerService, private toastr: ToastrService, private fb: FormBuilder) {
    this.LoadSites();
  }
  SelectedImageUrl !: string;
  AllWebsites !: Observable<Array<any>>;
  Website: Site = new Site();
  WebsiteForm: FormGroup = this.fb.group({
    site_id: [],
    site_name: [this.Website.site_name, Validators.required],
    site_image_url: [this.Website.site_image_url, Validators.required],
    site_url: [this.Website.site_url, Validators.required]
  })

  onSubmit(): void {
    this.UpdateSelectedImageUrl(this.WebsiteForm.get('site_image_url')?.value);
    if (this.WebsiteForm.valid) {
      if (!this.Website.id) {
        this.passwordManagerService.AddSite(this.WebsiteForm.value)
          .then(() => {
            this.toastr.success("Success", "Data Post Successfully");
            this.ResetEveryThing();
          })
          .catch((err: Error) => {
            this.toastr.error("Error", `${err}`);
          });
      } else {
        const form_value = this.WebsiteForm.value;
        const is_identical = Object.keys(form_value).every(key => form_value[key] === this.Website[key]);

        if (!is_identical) {
          this.passwordManagerService.UpdateSite(this.Website.id, form_value)
            .then(() => {
              this.toastr.success("Success", "Data Updated Successfully");
              this.ResetEveryThing();
            })
            .catch((err: Error) => {
              this.toastr.error("Error", `${err}`);
            });
        } else {
          this.toastr.warning("Warning", "Nothing to Update");
          this.ResetEveryThing();
        }
      }
    } else {
      this.toastr.error("Please fill all required fields", 'Error')
    }

  }


  ResetEveryThing() {
    this.WebsiteForm.reset();
    this.Website = new Site();
    this.SelectedImageUrl = ''
  }
  LoadSites() {
    this.AllWebsites = this.passwordManagerService.LoadSites();
  }

  EditSite(site: Site) {
    this.Website = site;
    this.WebsiteForm.patchValue({
      site_id: site.id,
      site_name: site.site_name,
      site_image_url: site.site_image_url,
      site_url: site.site_url
    });
    this.SelectedImageUrl = site.site_image_url
  }


  DeleteSite(id: string) {
    this.passwordManagerService.DeleteSite(id).then(() => {
      this.toastr.success("Success", "Data Deleted Successfully")
    }).catch((err: Error) => {
      this.toastr.error("Error", `${err}`)
    })
  }

  UpdateSelectedImageUrl(image_url: string) {
    if (image_url) {
      this.SelectedImageUrl = image_url;
    }
  }
}

export class Site {
  id !: string;
  site_name !: string;
  site_image_url !: string;
  site_url !: string;
  [key: string]: any;
}