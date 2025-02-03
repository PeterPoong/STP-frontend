import React, { useEffect } from "react";
import axios from "axios";

const SitemapGenerator = () => {
  useEffect(() => {
    const fetchStatesAndGenerateSitemap = async () => {
      try {
        const countryId = 1; // Change based on your country ID
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/getState`,
          { id: countryId }
        );

        if (response.data.success) {
          generateSitemap(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    const generateSitemap = (states) => {
      const baseURL = "https://studypal.my"; // Change this to your domain

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      // Study in locations
      xml += `<url><loc>${baseURL}/study-in-malaysia</loc><priority>1.0</priority></url>\n`;
      states.forEach((state) => {
        xml += `<url><loc>${baseURL}/study-in-${state.state_name
          .toLowerCase()
          .replace(/\s+/g, "-")}</loc><priority>0.9</priority></url>\n`;
      });

      // University in locations
      xml += `<url><loc>${baseURL}/university-in-malaysia</loc><priority>1.0</priority></url>\n`;
      states.forEach((state) => {
        xml += `<url><loc>${baseURL}/university-in-${state.state_name
          .toLowerCase()
          .replace(/\s+/g, "-")}</loc><priority>0.9</priority></url>\n`;
      });

      xml += `</urlset>`;

      // Save the sitemap.xml file in the public directory
      saveSitemapToPublic(xml);
    };

    const saveSitemapToPublic = (xmlContent) => {
      const blob = new Blob([xmlContent], { type: "application/xml" });
      const fileURL = URL.createObjectURL(blob);

      // Download the file (for testing)
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = "sitemap.xml";
      a.click();

      // Store in localStorage (Temporary solution for PWA-like apps)
      localStorage.setItem("sitemap", xmlContent);
    };

    fetchStatesAndGenerateSitemap();
  }, []);

  return (
    <div>
      <h2>Sitemap Generator</h2>
      <p>Googlebot will fetch sitemap from <strong>/sitemap.xml</strong></p>
    </div>
  );
};

export default SitemapGenerator;
