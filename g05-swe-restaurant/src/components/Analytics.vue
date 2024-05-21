<template>
    <div class="analytics">
      <h1>Analytics</h1>
      <div class="controls">
        <div class="dropdown">
          <label for="type-select">Select Type</label>
          <select id="type-select" v-model="selectedType">
            <option v-for="type in types" :key="type.value" :value="type.value">
              {{ type.text }}
            </option>
          </select>
        </div>
        <div class="dropdown">
          <label for="time-range-select">Select Time Range</label>
          <select id="time-range-select" v-model="selectedTimeRange">
            <option v-for="range in timeRanges" :key="range.value" :value="range.value">
              {{ range.text }}
            </option>
          </select>
        </div>
        <button class="submit-button" @click="fetchData">Submit</button>
      </div>
      <div class="chart">
        <canvas id="analytics-chart"></canvas>
        <p>Graph of {{ selectedType }} over {{ selectedTimeRange }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'Analytics',
    setup() {
      const selectedType = ref('regularCustomers');
      const selectedTimeRange = ref('30days');
      const chartInstance = ref(null);
      
      const types = ref([
        { value: 'regularCustomers', text: 'Most Regular Customers' },
        { value: 'bestSellerProducts', text: 'Best Seller Products' },
        { value: 'orderNumbers', text: 'Order Numbers in a Time Range' },
      ]);
      
      const timeRanges = ref([
        { value: '30days', text: 'Past 30 Days' },
        { value: '90days', text: 'Past 90 Days' },
        { value: '12months', text: 'Past 12 Months' },
      ]);
      
      const fetchData = () => {
        let data;
        if (selectedType.value === 'regularCustomers') {
          data = generateCustomerData(selectedTimeRange.value);
        } else if (selectedType.value === 'bestSellerProducts') {
          data = generateProductData(selectedTimeRange.value);
        } else {
          data = generateOrderData(selectedTimeRange.value);
        }
        updateChart(data);
      };
      
      const generateCustomerData = (timeRange) => {
        return {
          labels: ['Customer 1', 'Customer 2', 'Customer 3', 'Customer 4', 'Customer 5', 'Customer 6', 'Customer 7', 'Customer 8', 'Customer 9', 'Customer 10'],
          datasets: [{
            label: 'Order Numbers',
            data: Array.from({ length: 10 }, () => Math.floor(Math.random() * (timeRange === '30days' ? 20 : timeRange === '90days' ? 50 : 120))),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        };
      };
      
      const generateProductData = (timeRange) => {
        return {
          labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G', 'Product H', 'Product I', 'Product J'],
          datasets: [{
            label: 'Sales Numbers',
            data: Array.from({ length: 10 }, () => Math.floor(Math.random() * (timeRange === '30days' ? 50 : timeRange === '90days' ? 150 : 300))),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        };
      };
      
      const generateOrderData = (timeRange) => {
        const intervals = timeRange === '30days' ? 30 : timeRange === '90days' ? 30 : 12;
        const data = Array.from({ length: intervals }, () => Math.floor(Math.random() * (timeRange === '30days' ? 100 : timeRange === '90days' ? 200 : 300)));
        const labels = Array.from({ length: intervals }, (_, i) => `Interval ${i + 1}`);
        return {
          labels,
          datasets: [{
            label: 'Order Numbers',
            data,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }]
        };
      };
      
      const updateChart = (data) => {
        const ctx = document.getElementById('analytics-chart').getContext('2d');
        if (chartInstance.value) {
          chartInstance.value.destroy();
        }
        chartInstance.value = new Chart(ctx, {
          type: 'bar',
          data,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      };
      
      onMounted(() => {
        fetchData();
      });
      
      return {
        selectedType,
        selectedTimeRange,
        types,
        timeRanges,
        fetchData
      };
    }
  };
  </script>
  
  <style scoped>
  .analytics {
    padding: 20px;
  }
  
  .controls {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .dropdown {
    display: flex;
    flex-direction: column;
  }
  
  #type-select, #time-range-select {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    font-size: 16px;
    margin-top: 5px;
  }
  
  .submit-button {
    padding: 10px 10px;
    font-size: 16px;
    color: #fff;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  
  .chart {
    margin-top: 20px;
  }
  
  canvas {
    background-color: #eee;
    border: 1px solid #ccc;
  }
  </style>
  