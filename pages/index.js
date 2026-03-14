import Base from "@layouts/Baseof";

const Home = () => {
  return (
    <Base 
      title="Strona Maszynopisani.pl została przeniesiona"
      description="Wszystkie artykuły i treści o maszynach do pisania znajdziesz teraz na palantiri.pl"
    >
      <section className="section flex min-h-[100vh] items-center justify-center bg-light">
        <div className="container text-center">
          <div className="mx-auto max-w-[800px] rounded-2xl bg-white p-12 shadow-xl border border-border/50">
            <div className="mb-8 flex justify-center">
               <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
               </div>
            </div>
            <h1 className="mb-6 text-4xl lg:text-6xl font-bold text-dark tracking-tight leading-tight">
              Strona została przeniesiona
            </h1>
            <p className="mb-10 text-xl text-text leading-relaxed">
              Dziękujemy za dotychczasowe zainteresowanie serwisem <span className="font-semibold text-dark italic">maszynopisani.pl</span>. <br />
              Wszystkie nasze treści, artykuły i poradniki znajdziesz teraz na:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://palantiri.pl/blog"
                className="inline-block px-10 py-5 bg-primary text-white text-xl font-bold rounded-xl transition-all hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/20"
              >
                Przejdź do palantiri.pl/blog
              </a>
            </div>
            <p className="mt-12 text-sm text-text-light font-medium uppercase tracking-widest">
              Nowy dom dla pasjonatów pisania
            </p>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;
