import Vue from "vue";

const thumbs = {
  template: "#slider-thumbs",
  props: ["works", "currentWork"]
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
  props: ["works", "currentWork", "currentIndex"],
  computed: {
    reversedWorks() {
      return [...this.works].reverse();
    }
  }
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
      cuttedWorks: []
    }
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
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
      if(direction=="next" && this.currentIndex < this.works.length - 1) this.currentIndex++;
      else if (direction=="prev" && this.currentIndex > 0) this.currentIndex--;         
    },

    makeArrayRightLength() {
      let width = document.body.clientWidth;

      if (width < 1200) {
        return [...this.works].splice(0,3);
      } else {
        return [...this.works].splice(0,4);
      }
    }
  },
  watch: {
  },
  created() {
    const data = require("../data/works.json");
    this.works = this.makeArrayWithRequiredPics(data);

    this.cuttedWorks = this.makeArrayRightLength();
  }
});