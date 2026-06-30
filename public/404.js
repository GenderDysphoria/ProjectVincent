export const meta = {
  title: 'Page Not Found',
  url: '/404.html',
};

export default function NotFound () {
  return (
    <>
      <article>
        <div>
          <h1 class="post-title">File Not Found</h1>
          <div class="post-content">
            <p>The page you've requested could not be located.</p>
            <p><a href="/">Return to Introduction</a></p>
          </div>
        </div>
      </article>
    </>
  );
}
