import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import type { Job } from "@/api/types";
import { createJob } from "@/utils/createJob";

import SingleJobListing from "@/components/job-results/SingleJobListing.vue";

describe("SingleJobListing", () => {
  // const createJobProps = (jobProps = {}) => ({
  //   title: "Vue Developer",
  //   organization: "AirBnB",
  //   locations: ["New York"],
  //   minimumQualifications: ["Code"],
  //   ...jobProps,
  // });

  const renderJobListing = (job: Job) => {
    render(SingleJobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...job,
        },
      },
    });
  };

  it("renders job title", () => {
    const jobProps = createJob({ title: "Vue Programmer" });
    renderJobListing(jobProps);
    expect(screen.getByText("Vue Programmer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const jobProps = createJob({ organization: "Samsung" });
    renderJobListing(jobProps);
    expect(screen.getByText("Samsung")).toBeInTheDocument();
  });

  it("render job locations", () => {
    const jobProps = createJob({ locations: ["Orlando", "Jackson"] });
    renderJobListing(jobProps);
    expect(screen.getByText("Orlando")).toBeInTheDocument();
    expect(screen.getByText("Jackson")).toBeInTheDocument();
  });

  it("renders job qualification", () => {
    const jobProps = createJob({
      minimumQualifications: ["Code", "Develop"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Develop")).toBeInTheDocument();
  });
});