// ✅ Importaciones necesarias
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Necesario para *ngFor y *ngIf
import { HttpClient, HttpClientModule } from '@angular/common/http';
import axios from 'axios';

// ✅ Interfaz del modelo de datos
interface Influencer {
  id?: number; // ✅ Coincide con los IDs del backend
  nombre: string;
  foto: string;
  descripcion: string;
  votosSi: number;
  votosNo: number;
  facebook: string;
}

@Component({
  selector: 'app-voto',
  standalone: true, // ✅ Importante para standalone components
  imports: [CommonModule, HttpClientModule], // ✅ Permite usar *ngFor, *ngIf y HttpClient
  templateUrl: './voto.component.html',
  styleUrls: ['./voto.component.css']
})
export class VotoComponent implements OnInit {
  influencers: Influencer[] = [];
  votosUsuario: { [key: number]: 'si' | 'no' } = {};

  constructor(private http: HttpClient) {}

  // ✅ Al iniciar el componente
  async ngOnInit() {
    // 👇 Cada vez que alguien entre a la página /voto se registrará una visita
    this.http.post('http://localhost:3000/registrar-visita', {}).subscribe({
      next: () => console.log('✅ Visita registrada correctamente.'),
      error: (err) => console.error('❌ Error al registrar visita:', err)
    });

    try {
      // 🔹 Intenta obtener datos desde el backend
      const respuesta = await axios.get('http://localhost:3000/influencers');
      this.influencers = respuesta.data;
    } catch (error) {
      console.warn('⚠️ No se pudo conectar al servidor. Usando datos locales.');

      const dataGuardada = localStorage.getItem('influencers');
      if (dataGuardada) {
        this.influencers = JSON.parse(dataGuardada);
      } else {
        // ✅ Datos por defecto (modo offline)
        this.influencers = [
          { nombre: 'Isaac Pérez', foto: 'issac.png', descripcion: 'Creador de contenido', facebook: 'https://www.facebook.com/lopezisaac123', votosSi: 0, votosNo: 0 },
          { nombre: 'Esme la Chapina', foto: 'esme.png', descripcion: 'Influencer chapina popular en redes.', facebook: 'https://www.facebook.com/profile.php?id=100075909349271', votosSi: 0, votosNo: 0 },
          { nombre: 'David Godoy', foto: 'david.png', descripcion: 'Comedia.', facebook: 'https://www.facebook.com/eldavidgodoy', votosSi: 0, votosNo: 0 },
          { nombre: 'Q na Gladis', foto: 'qna.png', descripcion: 'Cómica y entretenimiento.', facebook: 'https://www.facebook.com/profile.php?id=100090748044643', votosSi: 0, votosNo: 0 },
          { nombre: 'Benito GT', foto: 'venito.png', descripcion: 'Creador de contenido juvenil.', facebook: 'https://www.facebook.com/loshijosdeqanagladys', votosSi: 0, votosNo: 0 },
          { nombre: 'Manex', foto: 'manex.png', descripcion: 'Comedia.', facebook: 'https://www.facebook.com/ElManex23', votosSi: 0, votosNo: 0 },
          { nombre: 'El Chimador', foto: 'chimador.png', descripcion: 'Comedia', facebook: 'https://www.facebook.com/Elchimadorasiiii', votosSi: 0, votosNo: 0 },
          { nombre: 'Alexander', foto: 'alexander.png', descripcion: 'Comedia', facebook: 'https://www.facebook.com/profile.php?id=61572552557939', votosSi: 0, votosNo: 0 },
          { nombre: 'Todo GT', foto: 'todo.png', descripcion: 'Contenido Viral', facebook: 'https://www.facebook.com/groups/105686143867933', votosSi: 0, votosNo: 0 },
          { nombre: 'Josh y Deana', foto: 'josh.png', descripcion: 'Pareja influencer con contenido positivo.', facebook: 'https://www.facebook.com/HELLOMUCHA', votosSi: 0, votosNo: 0 },
          { nombre: 'Historia de Xela', foto: 'historia.png', descripcion: 'Creador de humor callejero.', facebook: 'https://www.facebook.com/historiasdexela/photos', votosSi: 0, votosNo: 0 },
          { nombre: 'Henry López', foto: 'henrry.png', descripcion: 'Comedia', facebook: 'https://www.facebook.com/pupiloxthesbestchava?locale=es_LA', votosSi: 0, votosNo: 0 },
          { nombre: 'REBELLCAM', foto: 'rebeca.png', descripcion: 'Influencer de moda y estilo.', facebook: 'https://www.facebook.com/profile.php?id=100087977056534&locale=es_LA', votosSi: 0, votosNo: 0 },
          { nombre: 'Alisson Valdez', foto: 'alison.png', descripcion: 'Modelo e influencer de belleza.', facebook: 'https://www.facebook.com/AllissonValdezOficial?locale=es_LA', votosSi: 0, votosNo: 0 },
          { nombre: 'Rafael Pacheco', foto: 'rafael.png', descripcion: 'Creador de videos cómicos.', facebook: 'https://www.facebook.com/profile.php?id=61552988270337&locale=es_LA', votosSi: 0, votosNo: 0 },
          { nombre: 'Antonio Pacheco', foto: 'antonio.png', descripcion: 'Influencer musical.', facebook: 'https://www.facebook.com/profile.php?id=61552500433885&locale=es_LA', votosSi: 0, votosNo: 0 },
          { nombre: 'Katerine Menchú', foto: 'caterin.png', descripcion: 'Modelo y activista juvenil.', facebook: 'https://www.tiktok.com/@caterinmenchu8?_t=ZM-90gWy4Ys9f9&_r=1', votosSi: 0, votosNo: 0 },
          { nombre: 'Cóndor GT', foto: 'condor.png', descripcion: 'Influencer deportivo.', facebook: 'https://www.facebook.com/Condorsit?locale=es_LA', votosSi: 0, votosNo: 0 },
          { nombre: 'Primaso', foto: 'primaso.png', descripcion: 'Cómico y personaje viral.', facebook: 'https://www.facebook.com/profile.php?id=100089293848287&locale=es_LA', votosSi: 0, votosNo: 0 },
          { nombre: 'Rudy Gamaliel', foto: 'rudy.png', descripcion: 'Gaming', facebook: 'https://www.facebook.com/profile.php?id=100078818351769&locale=es_LA', votosSi: 0, votosNo: 0 }
        ];
        this.guardarDatos();
      }
    }

    // 🔹 Cargar votos guardados localmente
    const votosUsuarioGuardados = localStorage.getItem('votosUsuario');
    if (votosUsuarioGuardados) {
      this.votosUsuario = JSON.parse(votosUsuarioGuardados);
    }
  }

  // ✅ Guarda los influencers en localStorage para uso offline
  guardarDatos(): void {
    try {
      localStorage.setItem('influencers', JSON.stringify(this.influencers));
    } catch (e) {
      console.warn('⚠️ No se pudieron guardar los datos en localStorage', e);
    }
  }

  // 🟢 Nuevo: Función para votar “Grato”
  async votarSi(influencer: Influencer) {
    if (this.votosUsuario[influencer.id!]) {
      alert('⚠️ Ya has votado por este influencer.');
      return;
    }
    await axios.post(`http://localhost:3000/votar/si/${influencer.id}`);
    influencer.votosSi++;
    this.votosUsuario[influencer.id!] = 'si';
    localStorage.setItem('votosUsuario', JSON.stringify(this.votosUsuario));
  }

  // 🟢 Función para votar “No Grato”
  async votarNo(influencer: Influencer) {
    if (this.votosUsuario[influencer.id!]) {
      alert('⚠️ Ya has votado por este influencer.');
      return;
    }
    await axios.post(`http://localhost:3000/votar/no/${influencer.id}`);
    influencer.votosNo++;
    this.votosUsuario[influencer.id!] = 'no';
    localStorage.setItem('votosUsuario', JSON.stringify(this.votosUsuario));
  }

  // 🔹 Calcula el porcentaje de votos “Grato”
  obtenerPorcentajeGrato(influencer: Influencer): number {
    const maxVotos = 1000;
    return Math.min((influencer.votosSi / maxVotos) * 100, 100);
  }

  // 🔹 Calcula el porcentaje de votos “No Grato”
  obtenerPorcentajeNoGrato(influencer: Influencer): number {
    const maxVotos = 1000;
    return Math.min((influencer.votosNo / maxVotos) * 100, 100);
  }
}
