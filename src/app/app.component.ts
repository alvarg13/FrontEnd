import { Component,HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { concat } from 'rxjs';
import { core } from '@angular/compiler';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

//Variables iniciales
  PrefijoBase: string = "00";
  TelefonoBase: string = "111 22 33 44";

  CorreoBase: string = "example@email.com";
  linkedinBase: string = "https://www.linkedin.com/in/alvaro-royan/";
  githubBase: string = "https://github.com/alvarg13";

  //Función para copiar el correo al hacer click
  CopiaCorreo(Correo:string) {
    
    const ElementoTemporal = document.createElement('input');
    ElementoTemporal.value = Correo;
    document.body.appendChild(ElementoTemporal);

    ElementoTemporal.select();
    document.execCommand('copy');

    document.body.removeChild(ElementoTemporal);
  }

  //Función que calcula la anchura del grid
  //Primero escuchamos el evendo de redimensionamiento de la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    this.CalculaAnchuraMalla();
  }

  //Ahora hacemos el cálculo
  gridTemplateColumns:string="";
  fontcolor:string="white";

  ngOnInit(): void {
    this.CalculaAnchuraMalla();
    this.fontcolor="black";

  }

  CalculaAnchuraMalla()
  {
    const AnchuraVentana=window.innerWidth;
    let Centro: string;

    if (AnchuraVentana <= 1000){
      Centro="80%";
    } else {
      Centro="clamp(800px,60%,80%)"
    }

    this.gridTemplateColumns="auto "+Centro+" auto";
  }

  //Defino las variables en las que se va a incluir el texto para la página
  OcultarTexto:boolean = false;

  aboutmeBase:string = "I am a physicist with a strong background in physics and mathematics. During my undergraduate and master's studies, I acquired significant knowledge in programming by developing simulations using languages such as C++, Python, and Fortran,and applying software like Mathematica for complex calculations. Currently, I am enrolled in a full-stack Java developerprogram from Board Infinite, where I am expanding my skills in web development, learning modern frameworks, and enhancing  my proficiency in both front-end and back-end technologies. This combination of a solid scientific foundation and advanced programmingexpertise equips me to tackle complex problems and develop innovative solutions in technology.";
  workBase:string[] = [];
  studiesBase:string[] =["Physics Degree (University of Granada)   2019/2023","Master's Degree in Physics: Radiation, Nanotechnology, Particles, and Astrophysics (University of Granada)   2023/2024"]
  infoBase:string[]=[
    "Academic excellence during my undergraduate and master's studies",
    "Actively engaged in the process of publishing a scientific article.",
    "Experience in developing simulations using various programming languages (C++, Python, Fortran).",
    "Proficiency in applying symbolic computation software for solving complex calculations (Mathematica)."];

  languagesBase:string[]=[
    "Spanish - Native",
    "English - Advanced(B2)"
  ]

  FotoURLBase:string="https://i.imgur.com/S94ll5p.jpeg";

  //Defino las variables para recoger los datos después
  Prefijo:string="";
  Telefono: string = "";
  Correo: string = "";
  linkedin: string = "";
  github: string = "";

  aboutme:string="";
  work:string="";
  studies:string="";
  info:string="";
  languages:string="";
  FotoURL:string="";

  BoolGit:boolean=true;
  BoolLkd:boolean=true;
  BoolFoto:boolean=true;
  FinForm:boolean=true;

  Finalizado:boolean=false;
  BoolWork:boolean=true;
  BoolValid:boolean=true;
  BoolCorreo:boolean=false;

  BoolPhone:boolean=true;
  BoolPrefix:boolean=true;
  BoolEmail:boolean=true;
  BoolAbout:boolean=true;
  BoolLanguage:boolean=true;
  BoolBack:boolean=true;
  BoolInfo:boolean=true;



  //Función que verifica la validez del correo
  validarEmail(email:string) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
        return false;
    }
    return true;
}
   
  AnadirDatos(){

    //Verifico que todos los campos sean correctos

    let aux = this.Telefono.toString();
    let aux2 = this.Prefijo.toString();

    this.BoolWork=(this.work.trim()!="");

    this.BoolPhone=(aux.length==9);
    this.BoolPrefix=(aux2.length==2) ;
    this.BoolEmail=this.validarEmail(this.Correo);
    this.BoolAbout=(this.aboutme.trim()!="");
    this.BoolBack=(this.studies.trim()!="");
    this.BoolInfo=(this.info.trim()!="");
    this.BoolLanguage=(this.languages.trim()!="");


    this.BoolValid=(this.BoolAbout) && (this.BoolBack) 
    && (this.BoolInfo) &&  (this.BoolLanguage)
    && (this.BoolPhone) && (this.BoolPrefix)
    && (this.BoolEmail);


    if (this.linkedin.trim()==""){
      this.BoolLkd=false;
    } else{
      this.linkedinBase=this.linkedin;
      this.BoolLkd=true;
    }
    
    if (this.github.trim()==""){
      this.BoolGit=false;
    } else{
      this.githubBase=this.github;
      this.BoolGit=true;
    }




    //Asigno la información introducida
    if(this.BoolValid){

      this.TelefonoBase=aux.slice(0,3)+" "+ aux.slice(3,5)+" "+ aux.slice(5,7)+" "+ aux.slice(7,9);  
      this.PrefijoBase=this.Prefijo 
      this.CorreoBase=this.Correo;
      this.linkedinBase=this.linkedin;
      this.githubBase=this.github;

      if (this.FotoURL.trim()==""){

        this.FotoURLBase="https://i.imgur.com/D9ze9GA.png"; 
      } else{
        this.FotoURLBase=this.FotoURL;
      }
  
      this.aboutmeBase=this.aboutme;
      this.workBase=this.work.split("\n");
      this.studiesBase=this.studies.split("\n");
      this.infoBase=this.info.split("\n");
      this.languagesBase=this.languages.split("\n");
      this.Finalizado=true;}

      this.OcultarTexto=true;
  }

  OcultarTodo(){
    this.Finalizado=false;
    this.FinForm=false;
  }
}


