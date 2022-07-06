import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import emailjs, { EmailJSResponseStatus} from '@emailjs/browser';
import { Toast } from '@capacitor/toast';
import {ConfirmResult, Dialog} from '@capacitor/dialog';

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

  constructor(public formBuilder: FormBuilder) {}
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
      this.showToast('Please fill in all the fields.');
      return false;
    } else {
      this.templateParams = {
        name: this.inputName,
        email: this.inputEmail,
        suggestionText: this.inputSuggestionText
      };
      this.showConfirm('Are you sure you want to send this message?').then((dialogResult) => {
        //Als de gebruiker op 'ok' drukt
        if (dialogResult.value) {
          //EmailJS aanspreken om een email te sturen
          emailjs.send('service_8cats7d', 'template_m25p0bh', this.templateParams, 'JSmvVelsW0PiXH7ep')
            .then((result) => {
              console.log(result.text);
              //Toast tonen met success bericht
              this.showToast('Your email has been successfully sent!');
            }, (error) => {
              console.log(error.text);
              //Toast tonen met bericht dat er iets misgelopen is met EmailJS
              this.showToast('Something went wrong with sending your email. Please try again.');
            });
        }
      });
    }
  }
  async showToast(msg: string) {
       await Toast.show({
      text: msg,
      duration: 'long',
      position: 'bottom'
    });
  }
  async showConfirm(msg: string): Promise<ConfirmResult> {
    const { value: value } = await Dialog.confirm({
      title: 'Confirm',
      message: msg
    });
    return { value };
  }
}
