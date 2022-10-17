import { markdownify } from '@lib/utils/textConverter';

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  return (
    <section className="section">
      <div className="container max-w-[700px]">
        {markdownify(title, 'h1', 'h2 mb-8 text-center')}
        <form
          className="contact-form"
          action="https://formspree.io/f/xlevevwl"
          method="POST"
          name="message"
        >
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="name">
              Imię / Nick
            </label>
            <input className="form-input w-full" name="name" type="text" />
          </div>
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="email">
              Mejl
            </label>
            <input
              className="form-input w-full"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="subject">
              Tytuł
            </label>
            <input
              className="form-input w-full"
              name="subject"
              type="text"
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="message">
              Treść
            </label>
            <textarea
              name="content"
              type="text"
              className="form-textarea w-full"
              rows="7"
              required
            />
          </div>
          <button className="btn btn-outline-primary">Wyślij</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
