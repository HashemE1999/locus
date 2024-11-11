import traveler from "../assets/undraw_exploring_re_grb8.svg";
// SOURCE USED: https://tailwindflex.com/@limaa-m/basic-hero-secction
export const Landing = () => {
  return (
    <section className="pt-20">
      <div className="container mx-auto px-8 lg:flex">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">
            Let us plan your next big trip
          </h1>
          <p className="text-xl lg:text-2xl mt-6 font-light">
            A quick, easy, and intuitive travel planning application
          </p>
          <p className="mt-8 md:mt-12">
            <button
              type="button"
              className="py-4 px-12 bg-darkestGreen hover:bg-lighterGreen rounded text-white"
            >
              Get Started
            </button>
          </p>
        </div>
        <div className="lg:w-1/2">
          <img src={traveler} alt="Person traveling" />
        </div>
      </div>
    </section>
  );
};

export default Landing;
