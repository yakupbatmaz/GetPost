import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Get Post Projesi';
  urlCrud = 'http://localhost:8080/crud/';
  urlListe = 'liste';
  urlEkle = 'ekle';
  urlGuncelle = 'guncelle';
  urlSil = 'sil'
  data: any;
  mesaj: any;

  date: any;
  bugun: any;
  yil : any;
  ay : any;
  gun: any;
  sonay: any;
  songun: any;

  @ViewChild('efirma') efirma: any;
  @ViewChild('eadi') eadi: any;
  @ViewChild('epolice') epolice: any;
  @ViewChild('etarih') etarih: any;
  
  @ViewChild('gsiranu') gsiranu: any;
  @ViewChild('gfirma') gfirma: any;
  @ViewChild('gadi') gadi: any;
  @ViewChild('gpolice') gpolice: any;
  @ViewChild('gtarih') gtarih: any;

  constructor(private http: HttpClient) { }



  
  ngOnInit(): void {
    this.getItems();
    this.gunAyarla();
  }

  gunAyarla(){
    this.date = new Date();
    this.yil = this.date.getFullYear();
    this.ay = this.date.getMonth()+1;
    this.gun = this.date.getDate();

    if(this.ay < 10)
      this.sonay = "0"+this.ay;
    else
      this.sonay = this.ay;
    
    if(this.gun < 10)
      this.songun = "0"+this.gun;
    else
      this.songun = this.gun;

    this.bugun = this.yil+"-"+this.sonay+"-"+this.songun;
  }
  
  getItems() {
    return this.http.get<any>(this.urlCrud + this.urlListe).subscribe({
      next: data => {
          this.data = data;
      },
      error: error => {
        console.error(error);
      }
    })
  }

  addItem(){
    const body = {
      firma: this.efirma?.nativeElement.value, 
      adi: this.eadi?.nativeElement.value,
      police: this.epolice?.nativeElement.value,
      tarih: this.etarih?.nativeElement.value
    };

    return this.http.post<any>(this.urlCrud + this.urlEkle, body).subscribe({
      next: data => {
        this.mesaj = data.mesaj;
        console.log(data.mesaj);
        this.getItems();
        this.clearAdd();
      },
      error: error => {
        console.error(error);
        alert(error);
      }
    })
  }

  delInfo(){
    this.mesaj = null;
  }

  updateItem(item: any){
    this.gsiranu.nativeElement.value= item.siranu;
    this.gfirma.nativeElement.value= item.firma;
    this.gadi.nativeElement.value= item.adi;
    this.gpolice.nativeElement.value= item.police;
    this.gtarih.nativeElement.value= item.tarih;
  }
  
  update(){
    const body = {
      siranu: this.gsiranu?.nativeElement.value, 
      firma: this.gfirma?.nativeElement.value, 
      adi: this.gadi?.nativeElement.value,
      police: this.gpolice?.nativeElement.value,
      tarih: this.gtarih?.nativeElement.value
    };

    return this.http.post<any>(this.urlCrud + this.urlGuncelle, body).subscribe({
      next: data => {
        this.mesaj = data.mesaj;
        console.log(data.mesaj);
        this.getItems();
        this.clearUpdate();
      },
      error: error => {
        console.error(error);
        alert(error);
      }
    })
  }
  
  deleteItem(siranu: number){
    const body = {
      siranu: siranu
    }
    return this.http.post<any>(this.urlCrud + this.urlSil, body).subscribe({
      next: data => {
          console.log(data.mesaj);
          this.getItems();
      },
      error: error => {
        console.error(error);
      }
    })
  }

  clearAdd(){
    this.efirma.nativeElement.value='';
    this.eadi.nativeElement.value='';
    this.epolice.nativeElement.value='';
    this.etarih.nativeElement.value='';
  }
  
  clearUpdate(){
    this.gsiranu.nativeElement.value='';
    this.gfirma.nativeElement.value='';
    this.gadi.nativeElement.value='';
    this.gpolice.nativeElement.value='';
    this.gtarih.nativeElement.value='';
  }
}