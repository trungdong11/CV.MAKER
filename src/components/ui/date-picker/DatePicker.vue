<template>
  <Popover>
    <PopoverTrigger as="div">
      <Button variant="outline" class="w-[250px] justify-start text-left font-normal">
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span v-if="date">{{ format(date, 'PPP') }}</span>
        <span v-else>Pick a date</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <div class="flex justify-between p-2">
        <Select v-model="selectedMonth" @update:modelValue="handleMonthChange">
          <SelectTrigger class="w-[110px]"><SelectValue placeholder="Month" /></SelectTrigger>
          <SelectContent>
            <SelectItem v-for="(month, index) in months" :key="index" :value="month">{{ month }}</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="selectedYear" @update:modelValue="handleYearChange">
          <SelectTrigger class="w-[110px]"><SelectValue placeholder="Year" /></SelectTrigger>
          <SelectContent>
            <SelectItem v-for="year in years" :key="year" :value="year.toString()">{{ year }}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Calendar
        mode="single"
        :selected="date"
        @update:model-value="handleSelect"
        :month="date"
        @update="handleMonthUpdate"
      />
    </PopoverContent>
  </Popover>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const props = defineProps({
  startYear: { type: Number, default: getYear(new Date()) - 100 },
  endYear: { type: Number, default: getYear(new Date()) + 100 }
});

const date = ref(new Date());
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const years = computed(() => Array.from(
  { length: props.endYear - props.startYear + 1 },
  (_, i) => props.startYear + i
));

const selectedMonth = ref(months[getMonth(date.value)]);
const selectedYear = ref(getYear(date.value).toString());

watch(date, (newDate) => {
  selectedMonth.value = months[getMonth(newDate)];
  selectedYear.value = getYear(newDate).toString();
});

const handleMonthChange = (month) => {
  date.value = setMonth(date.value, months.indexOf(month));
};

const handleYearChange = (year) => {
  date.value = setYear(date.value, parseInt(year));
};

const handleSelect = (selectedDate) => {
  if (selectedDate) {
    date.value = selectedDate;
  }
};

const handleMonthUpdate = (newDate) => {
  date.value = newDate;
};
</script>
