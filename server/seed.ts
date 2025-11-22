import { db } from "./db";
import { users, projects, wruas, blogPosts, fundingOpportunities, siteSettings } from "@shared/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Starting database seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await db.insert(users).values({
    username: "admin",
    password: hashedPassword,
  }).onConflictDoNothing();
  console.log("✓ Admin user created");

  // Sample projects
  const sampleProjects = [
    {
      title: "Mara River Riparian Restoration",
      slug: "mara-river-riparian-restoration",
      description: "Comprehensive restoration of riparian zones along the Mara River, including native tree planting, erosion control, and community engagement in 25 villages.",
      location: "Mara Region",
      category: "Riparian Restoration",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      impactMetrics: { trees_planted: "15,000", hectares_restored: "3,500", communities_served: "25" },
      sdgs: [6, 13, 15],
      timeline: "2022 - 2025",
      status: "active",
    },
    {
      title: "Community Water Harvesting Systems",
      slug: "community-water-harvesting-systems",
      description: "Installation of rainwater harvesting systems in rural communities to improve water access and reduce dependency on seasonal rivers.",
      location: "Sondu Region",
      category: "Water Conservation",
      imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800",
      impactMetrics: { systems_installed: "45", people_served: "8,000", water_saved_liters: "500,000" },
      sdgs: [6, 11],
      fundingNeeded: "$75,000",
      timeline: "2023 - 2024",
      status: "active",
    },
    {
      title: "Youth Water Stewardship Training",
      slug: "youth-water-stewardship-training",
      description: "Training program for youth leaders in sustainable water management practices, conservation techniques, and community mobilization.",
      location: "Nyando Region",
      category: "Community Training",
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
      impactMetrics: { youth_trained: "500", schools_reached: "30", trainers_certified: "15" },
      sdgs: [4, 6],
      timeline: "Ongoing",
      status: "active",
    },
    {
      title: "Wetland Conservation Initiative",
      slug: "wetland-conservation-initiative",
      description: "Protection and restoration of critical wetland ecosystems that serve as natural water filtration and flood control systems.",
      location: "Awach Region",
      category: "Water Conservation",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      impactMetrics: { wetland_area_hectares: "2,200", species_protected: "45", water_quality_improvement: "35%" },
      sdgs: [14, 15],
      timeline: "2021 - 2024",
      status: "active",
    },
    {
      title: "Integrated Water Resource Monitoring",
      slug: "integrated-water-resource-monitoring",
      description: "Development of a comprehensive water quality and quantity monitoring network across the basin using modern sensors and community-based data collection.",
      location: "Lake Victoria Basin",
      category: "Infrastructure",
      imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800",
      impactMetrics: { monitoring_stations: "20", data_points_collected: "50,000", wruas_involved: "30" },
      sdgs: [6, 9],
      fundingNeeded: "$120,000",
      timeline: "2023 - 2026",
      status: "active",
    },
    {
      title: "Climate-Resilient Agriculture for Watershed Health",
      slug: "climate-resilient-agriculture",
      description: "Supporting farmers in adopting climate-smart agricultural practices that reduce soil erosion and improve water retention in the watershed.",
      location: "Mara Region",
      category: "Community Training",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      impactMetrics: { farmers_trained: "1,200", hectares_converted: "4,500", erosion_reduced: "40%" },
      sdgs: [2, 13, 15],
      timeline: "2022 - 2025",
      status: "active",
    },
  ];

  for (const project of sampleProjects) {
    await db.insert(projects).values(project).onConflictDoNothing();
  }
  console.log(`✓ ${sampleProjects.length} projects created`);

  // Sample WRUAs
  const sampleWruas = [
    {
      name: "Mara-Serengeti WRUA",
      location: "Mara Region",
      lat: "-1.45",
      lng: "35.05",
      focusAreas: ["Riparian Restoration", "Wildlife Conservation"],
      contactPerson: "John Kamau",
      email: "mara.serengeti@wrua.org",
      phone: "+254 720 123 456",
      description: "Leading water conservation efforts in the Mara-Serengeti ecosystem.",
      memberSince: "2015",
      status: "active",
    },
    {
      name: "Sondu River WRUA",
      location: "Sondu Region",
      lat: "-0.35",
      lng: "34.75",
      focusAreas: ["Water Harvesting", "Community Engagement"],
      contactPerson: "Mary Wanjiru",
      email: "sondu.river@wrua.org",
      phone: "+254 721 234 567",
      description: "Focused on sustainable water management along the Sondu River basin.",
      memberSince: "2016",
      status: "active",
    },
    {
      name: "Nyando Basin WRUA",
      location: "Nyando Region",
      lat: "-0.25",
      lng: "34.90",
      focusAreas: ["Youth Training", "Wetland Protection"],
      contactPerson: "Peter Ochieng",
      email: "nyando.basin@wrua.org",
      phone: "+254 722 345 678",
      description: "Empowering communities through water stewardship education.",
      memberSince: "2017",
      status: "active",
    },
    {
      name: "Awach River WRUA",
      location: "Awach Region",
      lat: "-0.15",
      lng: "34.60",
      focusAreas: ["Wetland Conservation", "Flood Management"],
      contactPerson: "Grace Adhiambo",
      email: "awach.river@wrua.org",
      phone: "+254 723 456 789",
      description: "Protecting critical wetland ecosystems in the Awach watershed.",
      memberSince: "2016",
      status: "active",
    },
    {
      name: "Kuja River WRUA",
      location: "Kuja Region",
      lat: "-1.10",
      lng: "34.50",
      focusAreas: ["Water Quality", "Agricultural Practices"],
      contactPerson: "David Otieno",
      email: "kuja.river@wrua.org",
      phone: "+254 724 567 890",
      description: "Improving water quality through sustainable farming practices.",
      memberSince: "2018",
      status: "active",
    },
    {
      name: "Migori River WRUA",
      location: "Migori Region",
      lat: "-1.05",
      lng: "34.45",
      focusAreas: ["Infrastructure Development", "Community Water Access"],
      contactPerson: "Sarah Akinyi",
      email: "migori.river@wrua.org",
      phone: "+254 725 678 901",
      description: "Expanding water access infrastructure for rural communities.",
      memberSince: "2017",
      status: "active",
    },
    {
      name: "Gucha-Migori WRUA",
      location: "Gucha-Migori Region",
      lat: "-0.85",
      lng: "34.70",
      focusAreas: ["Riparian Protection", "Erosion Control"],
      contactPerson: "James Nyabuto",
      email: "gucha.migori@wrua.org",
      phone: "+254 726 789 012",
      description: "Combating soil erosion through riparian zone protection.",
      memberSince: "2019",
      status: "active",
    },
    {
      name: "Lake Victoria South WRUA",
      location: "South Lake Victoria",
      lat: "-0.55",
      lng: "34.25",
      focusAreas: ["Lake Protection", "Fisheries Management"],
      contactPerson: "Rose Atieno",
      email: "lv.south@wrua.org",
      phone: "+254 727 890 123",
      description: "Protecting Lake Victoria shoreline and supporting sustainable fisheries.",
      memberSince: "2015",
      status: "active",
    },
  ];

  for (const wrua of sampleWruas) {
    await db.insert(wruas).values(wrua).onConflictDoNothing();
  }
  console.log(`✓ ${sampleWruas.length} WRUAs created`);

  // Sample blog posts
  const sampleBlogPosts = [
    {
      title: "MaraSondu Forum Celebrates Successful River Cleanup Campaign",
      slug: "marasondu-forum-celebrates-successful-river-cleanup",
      content: `<p>In a remarkable display of community solidarity, over 500 volunteers joined the MaraSondu WRUAS Forum's annual river cleanup campaign last weekend. The event, which spanned across 15 kilometers of the Mara River, successfully removed over 3 tons of waste and debris.</p>
      
      <p>"This campaign demonstrates the power of community action in protecting our precious water resources," said John Kamau, coordinator of the Mara-Serengeti WRUA. "When communities come together, we can achieve remarkable results in conservation."</p>
      
      <p>The cleanup effort was complemented by tree planting activities, with 2,000 native tree seedlings planted along the riverbanks. These trees will help stabilize the riverbanks, reduce erosion, and provide habitat for local wildlife.</p>
      
      <p>Local schools were actively involved in the campaign, with students learning about water conservation and sustainable practices. The forum also distributed educational materials to participating communities about proper waste management and the importance of protecting water sources.</p>`,
      excerpt: "Over 500 volunteers joined the annual Mara River cleanup campaign, removing 3 tons of waste and planting 2,000 trees along the riverbanks.",
      author: "Communications Team",
      category: "Conservation",
      tags: ["River Cleanup", "Community Action", "Tree Planting"],
      featuredImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      status: "published",
    },
    {
      title: "Youth Training Program Graduates 150 New Water Stewards",
      slug: "youth-training-program-graduates-150-water-stewards",
      content: `<p>The MaraSondu WRUAS Forum proudly announces the graduation of 150 young people from its intensive Water Stewardship Training Program. The six-month program equipped participants with skills in water resource management, conservation techniques, and community mobilization.</p>
      
      <p>"These young leaders represent the future of water conservation in the Lake Victoria Basin," noted Mary Wanjiru, training coordinator. "They will return to their communities as agents of change, spreading knowledge and inspiring action."</p>
      
      <p>The curriculum covered diverse topics including:</p>
      <ul>
        <li>Water quality testing and monitoring</li>
        <li>Riparian zone management</li>
        <li>Climate-smart agricultural practices</li>
        <li>Community engagement and advocacy</li>
        <li>Sustainable water use practices</li>
      </ul>
      
      <p>Graduates have committed to establishing water conservation clubs in their respective communities, with plans to reach over 5,000 additional young people in the coming year.</p>`,
      excerpt: "150 young people graduate from intensive Water Stewardship Training Program, ready to lead conservation efforts in their communities.",
      author: "Training Department",
      category: "Training",
      tags: ["Youth Programs", "Capacity Building", "Water Education"],
      featuredImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
      status: "published",
    },
    {
      title: "New Partnership with Water Resources Authority Strengthens Conservation Efforts",
      slug: "new-partnership-wra-strengthens-conservation",
      content: `<p>The MaraSondu WRUAS Forum has formalized a strategic partnership with the Water Resources Authority (WRA) to enhance water conservation efforts across the Lake Victoria Basin. This collaboration will bring additional technical expertise and resources to support the forum's 30 member WRUAs.</p>
      
      <p>Under the new agreement, WRA will provide:</p>
      <ul>
        <li>Technical support for water quality monitoring</li>
        <li>Training for WRUA members on regulatory compliance</li>
        <li>Access to hydrological data and research</li>
        <li>Joint planning for watershed management initiatives</li>
        <li>Support for community-based water projects</li>
      </ul>
      
      <p>"This partnership represents a model for collaborative water resource management," stated the WRA Regional Manager. "By working together with organized community groups like the MaraSondu Forum, we can achieve more sustainable and equitable water management outcomes."</p>
      
      <p>The forum will also benefit from WRA's expertise in resolving water use conflicts and ensuring sustainable water allocation across the basin. Joint monitoring stations will be established at key points along major rivers to provide real-time water quality and flow data.</p>`,
      excerpt: "Strategic partnership with Water Resources Authority brings technical expertise and resources to support 30 member WRUAs in conservation efforts.",
      author: "Executive Team",
      category: "Partnerships",
      tags: ["WRA Partnership", "Collaboration", "Water Management"],
      featuredImage: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800",
      status: "published",
    },
  ];

  for (const post of sampleBlogPosts) {
    await db.insert(blogPosts).values(post).onConflictDoNothing();
  }
  console.log(`✓ ${sampleBlogPosts.length} blog posts created`);

  // Sample funding opportunities
  const sampleFunding = [
    {
      name: "Global Water Partnership Small Grants",
      source: "Global Water Partnership",
      amount: "$25,000 - $50,000",
      deadline: "March 31, 2025",
      focusAreas: ["Water Conservation", "Community Engagement"],
      alignmentScore: "High",
      status: "open",
      notes: "Perfect for community-based water projects with clear sustainability plans.",
    },
    {
      name: "Climate Adaptation Fund",
      source: "African Development Bank",
      amount: "$100,000 - $500,000",
      deadline: "June 15, 2025",
      focusAreas: ["Climate Adaptation", "Infrastructure"],
      alignmentScore: "Medium",
      status: "open",
      notes: "Requires co-financing and government endorsement.",
    },
    {
      name: "Ecosystem Restoration Grant",
      source: "UN Environment Programme",
      amount: "$75,000",
      deadline: "April 30, 2025",
      focusAreas: ["Wetland Conservation", "Riparian Restoration"],
      alignmentScore: "High",
      status: "closing soon",
      notes: "Focus on restoring degraded ecosystems in the Lake Victoria Basin.",
    },
  ];

  for (const funding of sampleFunding) {
    await db.insert(fundingOpportunities).values(funding).onConflictDoNothing();
  }
  console.log(`✓ ${sampleFunding.length} funding opportunities created`);

  // Site settings
  await db.insert(siteSettings).values({
    key: "stats",
    value: {
      wruas: 30,
      projects: 45,
      hectares: "12,500",
      communities: "150",
    },
  }).onConflictDoUpdate({
    target: siteSettings.key,
    set: {
      value: {
        wruas: 30,
        projects: 45,
        hectares: "12,500",
        communities: "150",
      },
    },
  });
  console.log("✓ Site settings created");

  console.log("\n✅ Database seeded successfully!");
  console.log("\nAdmin credentials:");
  console.log("  Username: admin");
  console.log("  Password: admin123");
  console.log("\n⚠️  Please change the admin password after first login!");
  
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
