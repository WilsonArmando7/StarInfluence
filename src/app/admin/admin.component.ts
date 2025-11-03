// ✅ Importaciones necesarias
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Necesario para *ngIf y *ngIfElse
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

// ✅ Registrar todos los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-admin',
  standalone: true,
  // ⚠️ Aquí estaba el problema: faltaba incluir CommonModule dentro del array `imports`
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // 🟢 Total de visitas desde la base de datos
  totalVisitas = 0;

  // 🟣 Referencia al gráfico de Chart.js
  chart: any;

  // ✅ Método que se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.obtenerVisitas(); // Obtiene el total de visitas desde el backend
    this.generarGrafica();       // Genera el gráfico de visitas
  }

  // 🔹 Llama al backend para obtener el número total de visitas
  async obtenerVisitas() {
    try {
      const respuesta = await axios.get('http://localhost:3000/total-visitas');
      this.totalVisitas = respuesta.data.total;
    } catch (error) {
      console.error('❌ Error al obtener visitas:', error);
    }
  }

  // 🔹 Genera un gráfico de barras con el número total de visitas
  generarGrafica() {
    const ctx = document.getElementById('visitasChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error('⚠️ No se encontró el elemento del gráfico.');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Visitas'],
        datasets: [{
          label: 'Número de visitas',
          data: [this.totalVisitas],
          backgroundColor: ['#00e0ff'],
          borderColor: ['#ffffff'],
          borderWidth: 2
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: '📊 Total de visitas a la aplicación',
            color: '#fff',
            font: { size: 18 }
          },
          legend: {
            labels: { color: '#fff' }
          }
        },
        scales: {
          x: {
            ticks: { color: '#fff' },
            grid: { color: '#333' }
          },
          y: {
            ticks: { color: '#fff' },
            grid: { color: '#333' }
          }
        }
      }
    });
  }
}
