import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { videos, type VideoItem } from "@/lib/site";
import { T } from "@/lib/editable";
import { YouTubeLite } from "@/components/site/SharedSections";

const CHANNELS: { key: "all" | VideoItem["channel"]; label: string }[] = [
  { key: "all", label: "All" },
  { key: "dbc", label: "DBC NEWS" },
  { key: "ntv", label: "NTV" },
  { key: "rtv", label: "Rtv" },
  { key: "boishakhi", label: "Boishakhi TV" },
  { key: "nexus", label: "Nexus TV" },
  { key: "own", label: "Own channel" },
];

export function VideosPage() {
  const [channel, setChannel] = useState<"all" | VideoItem["channel"]>("all");

  const featured = videos.find((v) => v.featured) ?? videos[0];
  const libraryList =
    channel === "all"
      ? videos.filter((v) => v.id !== featured?.id)
      : videos.filter((v) => v.channel === channel);

  const tvCount = videos.filter((v) => v.channel !== "own").length;

  return (
    <>
      <div className="container-fluid page-header page-header--video py-5 mb-2">
        <div className="container text-center py-5">
          <h1 className="display-1"><T k="videos.page.title" d="Videos" line /></h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link className="text-primary" to="/"><T k="crumb.home" d="Home" line /></Link></li>
              <li aria-current="page" className="breadcrumb-item active"><T k="crumb.videos" d="Videos" line /></li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="vm" aria-labelledby="vm-title">
        <div className="vm-hero">
          <div className="vm-hero__glow" aria-hidden="true" />
          <div className="vm-wrap">
            <div className="vm-hero__head">
              <span className="vm-kicker">
                <span className="vm-live" aria-hidden="true" />
                <T k="videos.hero.kicker" d="On national television" line />
              </span>
              <h2 className="vm-h2" id="vm-title">
                <T k="videos.hero.title" d="Dr. Afzal on TV & news channels" />
              </h2>
              <p className="vm-lead">
                <T
                  k="videos.hero.lead"
                  d="Health talk shows where Dr. Md. Afzal Mahfuzullah explains retina disease, diabetic eye problems and cataract surgery for patients and families."
                />
              </p>
            </div>

            <ul className="vm-stats">
              <li><strong>{tvCount}</strong><span><T k="vid.stat.0" d="TV appearances" line /></span></li>
              <li><strong><T k="vid.stat.1.n" d="5" line /></strong><span><T k="vid.stat.1" d="News channels" line /></span></li>
              <li><strong><T k="vid.stat.2.n" d="5h+" line /></strong><span><T k="vid.stat.2" d="of eye-care advice" line /></span></li>
              <li><strong><T k="vid.stat.3.n" d="2017" line /></strong><span><T k="vid.stat.3" d="On air since" line /></span></li>
            </ul>

            <div className="vm-onair" aria-label="Channels">
              <span><T k="vid.seen" d="As seen on" line /></span>
              <b className="ch-dbc"><T k="vid.ch.dbc" d="DBC NEWS" line /></b>
              <b className="ch-ntv"><T k="vid.ch.ntv" d="NTV" line /></b>
              <b className="ch-rtv"><T k="vid.ch.rtv" d="Rtv" line /></b>
              <b className="ch-boishakhi"><T k="vid.ch.boishakhi" d="Boishakhi TV" line /></b>
              <b className="ch-nexus"><T k="vid.ch.nexus" d="Nexus TV" line /></b>
            </div>

            {featured && (
              <article className="vm-feature">
                <div className="vm-feature__media">
                  <YouTubeLite
                    ytId={featured.ytId}
                    thumb={featured.thumb}
                    title={featured.title}
                    duration={featured.duration}
                    className="vm-frame ytframe ytlite"
                  />
                </div>
                <div className="vm-feature__body">
                  <span className="vm-tag"><T k="vid.latest" d="Latest appearance" line /></span>
                  <span className={`vm-chan ch-${featured.channel}`}>{featured.channelLabel}</span>
                  <h3 className="vm-feature__title">{featured.title}</h3>
                  <p className="vm-feature__show">{featured.show}</p>
                  <ul className="vm-feature__meta">
                    <li><i className="far fa-calendar" />{featured.date}</li>
                    <li><i className="far fa-clock" />{featured.duration}</li>
                    <li><i className="fas fa-eye" />{featured.topic}</li>
                  </ul>
                  <a className="vm-btn" href={`https://www.youtube.com/watch?v=${featured.ytId}`} target="_blank" rel="noopener noreferrer">
                    Watch on YouTube <i className="fas fa-arrow-right" />
                  </a>
                </div>
              </article>
            )}
          </div>
        </div>

        <div className="vm-wrap vm-library">
          <div className="vm-library__head">
            <div>
              <h2 className="vm-h3"><T k="vid.lib.h" d="Video library" line /></h2>
              <p className="vm-count" aria-live="polite">
                <span>{channel === "all" ? videos.length : libraryList.length}</span> videos
              </p>
            </div>
            <div className="vm-filters" role="toolbar" aria-label="Filter by channel">
              {CHANNELS.map((ch) => {
                const count = ch.key === "all" ? videos.length : videos.filter((v) => v.channel === ch.key).length;
                return (
                  <button
                    key={ch.key}
                    type="button"
                    className={`vm-chip ${channel === ch.key ? "is-active" : ""}`}
                    aria-pressed={channel === ch.key}
                    onClick={() => setChannel(ch.key)}
                  >
                    <T k={`vid.ch.${ch.key}`} d={ch.label} line />
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="vm-grid">
            {libraryList.map((v) => (
              <article className="vm-card" key={v.id}>
                <YouTubeLite
                  ytId={v.ytId}
                  thumb={v.thumb}
                  title={v.title}
                  duration={v.duration}
                  className="vm-frame ytframe ytlite"
                />
                <div className="vm-card__body">
                  <div className="vm-card__top">
                    <span className={`vm-chan ch-${v.channel}`}>{v.channelLabel}</span>
                    <span className="vm-topic">{v.topic}</span>
                  </div>
                  <h3 className="vm-card__title">{v.title}</h3>
                  <div className="vm-card__foot">
                    <span>{v.show}</span>
                    <time>{v.date}</time>
                  </div>
                  <a
                    className="vm-card__yt"
                    href={`https://www.youtube.com/watch?v=${v.ytId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open on YouTube: ${v.title}`}
                  >
                    <i className="fab fa-youtube" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          {libraryList.length === 0 && <p className="vm-empty"><T k="vid.empty" d="No videos for this channel yet." line /></p>}
        </div>
      </section>
    </>
  );
}