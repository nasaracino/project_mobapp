import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import emailjs from '@emailjs/browser';
import {ToastanddialogService} from '../services/toastanddialog.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {
  inputName: '';
  inputEmail: '';
  inputSuggestionText: '';
  templateParams;
  suggestionsForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private toastAndDialog: ToastanddialogService) {}
  ngOnInit() {
    //Validatie regels van de input velden aanmaken
    this.suggestionsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      suggestionText: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.suggestionsForm.valid) {
      //Toast met bericht om alle velden correct in te vullen
      this.toastAndDialog.showToast('Please fill in all the fields.');
      return false;
    } else {
      this.templateParams = {
        name: this.inputName,
        email: this.inputEmail,
        suggestionText: this.inputSuggestionText
      };
      this.toastAndDialog.showConfirm('Are you sure you want to send this message?').then((dialogResult) => {
        //Als de gebruiker op 'ok' drukt
        if (dialogResult.value) {
          //EmailJS aanspreken om een email te sturen
          emailjs.send('service_8cats7d', 'template_m25p0bh', this.templateParams, 'JSmvVelsW0PiXH7ep')
            .then((result) => {
              console.log(result.text);
              //Toast tonen met success bericht
              this.toastAndDialog.showToast('Your email has been successfully sent!');
            }, (error) => {
              console.log(error.text);
              //Toast tonen met bericht dat er iets misgelopen is met EmailJS
              this.toastAndDialog.showToast('Something went wrong with sending your email. Please try again.');
            });
        }
      });
    }
  }
}
