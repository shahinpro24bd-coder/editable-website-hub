import { Link } from "@tanstack/react-router";
import { T } from "@/lib/editable";
import { PremiumCta, ServicesGrid } from "@/components/site/SharedSections";

export function ServicesPage() {
  return (
    <>
      <div className="container-fluid page-header page-header--services py-5 mb-2">
        <div className="container text-center py-5">
          <h1 className="display-1"><T k="services.page.title" d="Our Services" line /></h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link className="text-primary" to="/">Home</Link></li>
              <li aria-current="page" className="breadcrumb-item active">Services</li>
            </ol>
          </nav>
        </div>
      </div>
      <ServicesGrid />
      <PremiumCta />
    </>
  );
}