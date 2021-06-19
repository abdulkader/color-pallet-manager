const Footer = () => {
  return (
    <div className="bg-white p-3 flex justify-between border-t border-gray-100">
      <a
        className="text-xs text-gray-700 mx-2 inline-flex align-middle items-center"
        href="https://github.com/abdulkader/color-pallet-manager"
        target="_blank"
      >
        <img
          src="/GitHub-Mark-64px.png"
          alt="Github"
          className="w-4 inline-block mx-2"
        />
        View Project
      </a>
      <p className="inline-flex align-middle items-center text-xs text-gray-700">
        Created with{' '}
        <span className="inline-block mx-1 text-theme-secondary-500">
          &#9829;
        </span>{' '}
        by
        <a
          className="mx-1"
          href="https://github.com/abdulkader"
          target="_blank"
        >
          abdulkader
        </a>
      </p>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
