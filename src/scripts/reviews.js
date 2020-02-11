import Vue from "vue";
import Flickity from "vue-flickity";

new Vue({
  el: "#reviews-component",
  template: "#reviews-container",
  components: { Flickity },
  data() {
    return {
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        groupCells: true,
        adaptiveHeight: true,
        freeScroll: false,
        contain: true
      },
      reviews: []
    };
  },

  methods: {
    next() {
      this.$refs.flickity.next();
      this.checkBtns();
    },

    previous() {
      this.$refs.flickity.previous();
      this.checkBtns();
    },
    checkBtns() {
      const prevBtn = this.$el.querySelector(".listing-btn--prev");
      const nextBtn = this.$el.querySelector(".listing-btn--next");
      let index = this.$refs.flickity.selectedIndex();

      if (index == 0) {
        prevBtn.disabled = true;
      } else if (index == this.$refs.flickity.slides().length - 1) {
        nextBtn.disabled = true;
      }
      if (index > 0) {
        prevBtn.disabled = false;
      } else if (index < this.$refs.flickity.slides().length - 1) {
        nextBtn.disabled = false;
      }
    },
    makeArrayWithRequiredPics(data) {
      return data.map(item => {
        const requiredPic = require(`../images/content/${item.photo}`);
        item.photo = requiredPic;

        return item;
      });
    }
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.makeArrayWithRequiredPics(data);
  }
});
