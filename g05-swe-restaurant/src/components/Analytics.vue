<template>
  <div class="analytics lg:h-screen">
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
          <option
            v-for="range in timeRanges"
            :key="range.value"
            :value="range.value"
          >
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
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import axios from "axios";
import { format, subDays } from "date-fns";

export default {
  name: "Analytics",
  setup() {
    const selectedType = ref("regularCustomers");
    const selectedTimeRange = ref("30days");
    const chartInstance = ref(null);

    const types = ref([
      { value: "regularCustomers", text: "Most Regular Customers" },
      { value: "bestSellerProducts", text: "Best Seller Products" },
      { value: "orderNumbers", text: "Order Numbers in a Time Range" },
    ]);

    const timeRanges = ref([
      { value: "30days", text: "Past 30 Days" },
      { value: "90days", text: "Past 90 Days" },
      { value: "180days", text: "Past 180 Days" },
    ]);

    const fetchData = async () => {
      let data;
      try {
        const response = await axios.get(`http://localhost:8000/api/orders`, {
          withCredentials: true,
        });
        const orders = response.data;
        if (selectedType.value === "regularCustomers") {
          data = generateCustomerData(orders);
        } else if (selectedType.value === "bestSellerProducts") {
          data = generateProductData(orders);
        } else {
          data = generateOrderData(orders);
        }
        updateChart(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const generateCustomerData = (orders) => {
      const customerData = {};
      orders.forEach((order) => {
        if (customerData[order.customer_id]) {
          customerData[order.customer_id] += 1;
        } else {
          customerData[order.customer_id] = 1;
        }
      });
      const sortedCustomers = Object.entries(customerData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      return {
        labels: sortedCustomers.map((item) => `Customer ${item[0]}`),
        datasets: [
          {
            label: "Order Numbers",
            data: sortedCustomers.map((item) => item[1]),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    const generateProductData = (orders) => {
      const productData = {};
      orders.forEach((order) => {
        order.items.forEach((item) => {
          if (productData[item.item.id]) {
            productData[item.item.id] += 1;
          } else {
            productData[item.item.id] = 1;
          }
        });
      });
      const sortedProducts = Object.entries(productData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      return {
        labels: sortedProducts.map((item) => `Product ${item[0]}`),
        datasets: [
          {
            label: "Sales Numbers",
            data: sortedProducts.map((item) => item[1]),
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    const generateOrderData = (orders) => {
      let interval;
      if (selectedTimeRange.value === "30days") {
        interval = 1; // 1 day interval
      } else if (selectedTimeRange.value === "90days") {
        interval = 3; // 3 days interval
      } else {
        interval = 6; // 6 days interval
      }

      const endDate = new Date();
      const startDate = subDays(endDate, parseInt(selectedTimeRange.value));

      // Initialize date ranges and counts
      const dateRanges = [];
      const orderCounts = [];
      for (let d = startDate; d <= endDate; d = subDays(d, -interval)) {
        dateRanges.push(format(d, "yyyy-MM-dd"));
        orderCounts.push(0);
      }

      // Aggregate orders
      orders.forEach((order) => {
        const orderDate = new Date(order.created_at);
        for (let i = 0; i < dateRanges.length - 1; i++) {
          if (
            orderDate >= new Date(dateRanges[i]) &&
            orderDate < new Date(dateRanges[i + 1])
          ) {
            orderCounts[i] += 1;
            break;
          }
        }
      });

      return {
        labels: dateRanges.slice(0, -1), // Exclude the last label
        datasets: [
          {
            label: "Order Numbers",
            data: orderCounts,
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    const updateChart = (data) => {
      const ctx = document.getElementById("analytics-chart").getContext("2d");
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
      chartInstance.value = new Chart(ctx, {
        type: "bar",
        data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
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
      fetchData,
    };
  },
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

#type-select,
#time-range-select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 16px;
  margin-top: 5px;
}

.submit-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
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
