import Vue from "vue";

const thumbs = {
  template: "#slider-thumbs",
  props: ["displayedWorks", "currentWork"]
};

const buttons = {
  template: "#slider-buttons",
  props: ["works", "currentIndex"]
};

const display = {
  template: "#slider-display",
  components: {
    thumbs, buttons
  },
  props: ["works", "displayedWorks","currentWork", "currentIndex"],
  computed: {}
};


const tags = {
  template: "#slider-tags",
  props: ["tags"]
};

const info = {
  template: "#slider-info",
  components: {
    tags
  },
  props: ["currentWork"],
  computed: {
    tagsArray() {
      return this.currentWork.skills.split(', ');
    }
  }
};

new Vue({
  el: "#slider-component",
  template: "#slider-container",
  components: {
    display, info
  },
  data() {
    return {
      works: [],
      currentIndex: 0,
      startIndex: 0,
      displayedCount: 4,
      windowWidth: 0
    }
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    },
    displayedWorks() {
      return [...this.works].splice(this.startIndex, this.displayedCount)
    }
  },
  methods: {
    makeArrayWithRequiredPics(data) {
      return data.map(item => {
        const requiredPic = require(`../images/content/${item.photo}`);
        item.photo = requiredPic;

        return item;
      })
    },

    handleSlide(direction) {
      if(direction=="next" && this.currentIndex < this.works.length - 1) {
        this.currentIndex++;
        this.moveDisplayedWorks();
      }
      else if (direction=="prev" && this.currentIndex > 0) {
        this.currentIndex--; 
        this.moveDisplayedWorks();
      }      
    },

    moveDisplayedWorks() {
      if (this.currentIndex > (this.displayedWorks.length-1) + this.startIndex) {
        this.startIndex++;
      } else if (this.currentIndex < this.startIndex) {
        this.startIndex--;
      }
    },

    changeDisplayedCount() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 1200) {
        this.displayedCount = 3;
      } else {
        this.displayedCount = 4;
      }
    },

    checkActiveWork(index) {
      this.currentIndex = index + this.startIndex;      
    }
  },
  watch: {
  },
  created() {
    const data = require("../data/works.json");
    this.works = this.makeArrayWithRequiredPics(data);
  },
  mounted() {
    window.addEventListener('resize', this.changeDisplayedCount);
    this.changeDisplayedCount();
  }
});