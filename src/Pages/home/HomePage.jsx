import Slider from "../../Component/slider/Slider"
import Services from "../../Component/services/Services";
import BookSlider from "../../Component/bookSlider/BookSlider";
import books from "../../data/books";
import HeadingTitle from "../../Component/bookSlider/HeadingTitle";
const HomePage = () => {
  return (
    <>
      <Slider />
      <Services />
      <HeadingTitle title="Most gifted" />
      <BookSlider data={books} />
      <HeadingTitle title="Best seller" />
      <BookSlider data={books} />
      <HeadingTitle title="Most wished for" />
      <BookSlider data={books} />
    </>
  );
};

export default HomePage;
