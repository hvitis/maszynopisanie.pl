import config from "@config/config.json";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  // destructuring items from config object
  const { base_url, logo, logo_width, logo_height, logo_text, title } =
    config.site;

  return (
    <Link href={base_url} passHref>
      <a
        className="navbar-brand block"
        style={{
          height: logo_height.replace("px", "") + "px",
          width: logo_width.replace("px", "") + "px",
        }}
      >
        {logo ? (
          <Image
            width={logo_width.replace("px", "") * 2}
            height={logo_height.replace("px", "") * 2}
            src={logo}
            alt={title}
            priority
          />
        ) : logo_text ? (
          logo_text
        ) : (
          title
        )}
      </a>
    </Link>
  );
};

export default Logo;
