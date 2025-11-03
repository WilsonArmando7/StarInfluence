import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  totalVisitas = 0;
  chart: any;

  async ngOnInit() {
    await this.obtenerVisitas();
    this.generarGrafica();
  }

  async obtenerVisitas() {
    try {
      const respuesta = await axios.get('http://localhost:3000/total-visitas');
      this.totalVisitas = respuesta.data.total;
    } catch (error) {
      console.error('Error al obtener visitas:', error);
    }
  }

  generarGrafica() {
    const ctx = document.getElementById('graficaVisitas') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Visitas registradas'],
        datasets: [{
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
          }
        }
      }
    });
  }
}
