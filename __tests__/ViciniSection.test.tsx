import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ViciniSection from "@/components/ViciniSection";

describe("ViciniSection", () => {
  it("shows the real product promise and links to VICINI", () => {
    render(<ViciniSection locale="de" />);

    expect(screen.getByRole("heading", { name: "VICINI macht Nähe begehbar." })).toBeInTheDocument();
    expect(screen.getByText(/Blumenbeet, Obstgarten oder Gemüsebeet/)).toBeInTheDocument();
    expect(screen.getByText(/Sichtbar nur zwischen Menschen/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "VICINI öffnen" })).toHaveAttribute("href", "https://vicini.saimor.world");
    expect(screen.getByRole("img", { name: /VICINI-Nachbarschaft/ })).toBeInTheDocument();
  });

  it("has complete English copy", () => {
    render(<ViciniSection locale="en" />);

    expect(screen.getByRole("heading", { name: "VICINI makes closeness tangible." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open VICINI" })).toHaveAttribute("href", "https://vicini.saimor.world");
  });
});
