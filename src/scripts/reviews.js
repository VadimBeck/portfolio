import Vue from "vue";
import Flickity from "vue-flickity";
import axios from "axios";

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
        adaptiveHeight: false,
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
    takeImgAbsolutePath(data) {
      return data.map(item => {

        item.photo = `https://webdev-api.loftschool.com/${item.photo}`;

        return item;
      });
    },
    fetchReviews() {
      axios
        .get("https://webdev-api.loftschool.com/reviews/253")
        .then(response => {
          let data = response.data;
          this.reviews = this.takeImgAbsolutePath(data);
          this.$nextTick(function () { this.$refs.flickity.rerender() });   
        });
    },
  },
  created() {
    this.fetchReviews();
  }
});
