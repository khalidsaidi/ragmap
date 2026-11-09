# RAGMap

Find a retrieval MCP server that works today.

RAGMap is a list of remote MCP servers that search a body of knowledge: the web, documentation, papers, laws, a domain. Every day it takes the [official MCP Registry](https://registry.modelcontextprotocol.io), connects to each candidate server with no API key, lists its tools, and keeps only the ones that answer and really do retrieval.

Use it as an MCP server so your agent can ask "who knows about X?", or just read the list below.

## Use it from an agent

```bash
npx -y @khalidsaidi/ragmap-mcp@latest
```

Claude Code:

```bash
claude mcp add ragmap -- npx -y @khalidsaidi/ragmap-mcp@latest
```

Any MCP client:

```json
{
  "mcpServers": {
    "ragmap": { "command": "npx", "args": ["-y", "@khalidsaidi/ragmap-mcp@latest"] }
  }
}
```

Tools:

- `ragmap_find`: servers that know about what you need, e.g. `{ "need": "EU cosmetics regulation" }`.
- `ragmap_get`: one server by registry name.
- `ragmap_install`: copy-paste config to connect a server.

The package reads the latest list from this repo and falls back to the copy it ships with when offline.

## How a server gets listed

1. It is in the official MCP Registry with a streamable HTTP endpoint that needs no key.
2. It answers an MCP `initialize` and `tools/list` from the daily check.
3. Claude reads its description and tools and confirms its main job is retrieval and that results are free. Servers that book, send, convert files, store personal memory or charge per query are left out, even if they have a search tool.

A server that fails a check stays listed for 3 days, then drops off until it works again.

Not covered: local (stdio) servers and servers that need a key or sign-in, because they can't be checked automatically.

## The list

<!-- list:start -->
2278 servers, checked 2026-11-09.

| Server | Knows about | URL |
| --- | --- | --- |
| `ac.tandem/docs-mcp` | Tandem docs, install guides, SDKs and workflows | https://tandem.ac/mcp |
| `ae.beachclubs/mcp` | UAE beach clubs, day pass prices, amenities, hours and events | https://www.beachclubs.ae/mcp |
| `ae.plantguide/dubai-gardening` | What to plant in Dubai, plant care in heat, climate | https://plantguide.ae/mcp |
| `agency.goji/goji` | SEO, AEO, web and branding terms, guides and FAQs | https://mcp.goji.agency/mcp |
| `ai.1court.state/court-directory` | US county courts: clerks, addresses, e-filing, fees, deadlines | https://state.1court.ai/api/mcp |
| `ai.agenticterminal/directory` | Verified merchants accepting agentic payments on Lightning and other rails | https://mcp.agenticterminal.ai/mcp |
| `ai.agentlookups/groundrules` | Verbatim text of US federal and state law | https://law.agentlookups.ai/mcp |
| `ai.agentlookups/spoon-scout` | Contaminant lab results, recalls and additive rules for US packaged foods | https://food.agentlookups.ai/mcp |
| `ai.ai-portal/ai-portal` | AI model releases, AI regulations, glossary and GenAI news | https://www.ai-portal.ai/mcp |
| `ai.airshelf/catalog` | Cross-vendor B2B product catalog with datasheet specs | https://mcp.airshelf.ai/mcp |
| `ai.autoblogging/autoblogging` | Autoblogging.ai pricing, plans, features and site pages | https://autoblogging.ai/mcp |
| `ai.beexcellent/reference` | How Excellent restaurant events software works | https://beexcellent.ai/api/mcp/public |
| `ai.bezal/local-commerce` | US local service businesses, reviews, services and hours | https://app.bezal.ai/api/mcp |
| `ai.bidclub/bidclub` | Investor podcast transcripts, summaries and digests in English and Chinese | https://bidclub.ai/api/mcp |
| `ai.bithuman/docs` | bitHuman avatar SDK and REST API documentation | https://docs.bithuman.ai/docs-mcp |
| `ai.brownmatter/brainz` | Shared product knowledge concepts and their relations for agent fleets | https://brainz.brownmatter.ai/mcp |
| `ai.byteask/embedded-docs` | Embedded firmware datasheets, MISRA, CMSIS and RTOS reference documentation with page citations | https://mcp.byteask.ai/mcp |
| `ai.catalystproject/evidence-graph` | Evidence on what supplements and compounds do in the body | https://catalystproject.ai/mcp |
| `ai.cerebrium/docs` | Cerebrium deployment, hardware and endpoint documentation | https://cerebrium.ai/docs/mcp |
| `ai.com.nlp/open-model-catalog` | Open-weight AI model releases, licenses and architectures | https://nlp.com.ai/mcp |
| `ai.companyproof/companyproof` | Legal company registry profiles and verified company facts | https://companyproof.ai/v2/mcp |
| `ai.context-link/context-link` | Content from the user's connected sites, Drive, Notion, email and files | https://www.context-link.ai/mcp |
| `ai.coreyjames/portfolio` | Corey James's projects, systems and engineering work in GPU inference and AI | https://coreyjames.ai/mcp |
| `ai.dablock/visibility-index` | How often AI answer engines mention 24 crypto and Web3 brands | https://dablock.ai/mcp |
| `ai.dabyte/visibility-index` | How often AI answer engines mention 20 SaaS brands | https://dabyte.ai/mcp |
| `ai.darkfunnels/docs` | DarkFunnels documentation on WhatsApp AI sales agents | https://docs.darkfunnels.ai/mcp |
| `ai.deepdna/knowledge` | Pharmacogenomics: drug-gene interactions, gene variants by rsID, medication screening | https://deepdna.ai/mcp |
| `ai.drillr/drillr` | SEC filings, financial statements, ownership and news for equities | https://gateway.drillr.ai/mcp/data |
| `ai.ecocheck/ecocheck` | Vietnam GHG regulations, EU CBAM rules and ESG guidance | https://ecocheck.ai/mcp |
| `ai.edgechat/edgepedia` | Encyclopedia articles with citations on people, places, things and events | https://www.edgechat.ai/mcp |
| `ai.emberverse/emberverse` | A knowledge graph of pieces and structural principles for reasoning | https://emberverse.ai/mcp |
| `ai.entityindex/entityindex` | Verified hotels in Andorra by area, amenities, with official links | https://entityindex.ai/mcp |
| `ai.enzos/enzos` | US homes for sale, price verdicts, below-market deals and metro market snapshots | https://enzos.ai/mcp |
| `ai.everymcp/every-mcp` | Public MCP servers from the official registry with install configs | https://everymcp.ai/mcp |
| `ai.evoost/site` | Verified facts about eVoost AI products, FAQ and contact | https://evoost.ai/mcp |
| `ai.exa/exa` | Web search and page content | https://mcp.exa.ai/mcp |
| `ai.example4/xmp4` | Source code, callers and tests of open-source libraries | https://mcp.example4.ai/mcp |
| `ai.financegenius/financegenius` | Indian credit cards, loans, deposits, insurance and mutual funds, with calculators | https://mcp.financegenius.ai/mcp/ |
| `ai.framethrower/framethrower` | Film stills and commercials by lighting, lens, shot size and mood | https://framethrower.ai/api/mcp |
| `ai.fukushi/dictionary` | Japan disability welfare service fees, add-ons and staffing rules | https://fukushi.ai/api/mcp |
| `ai.hostingbrain/intelligence` | European hosting and domain market shares, pricing, concentration and technology adoption | https://mcp.hostingbrain.ai/mcp |
| `ai.hotapi/docs` | HotAPI integration guides, model docs and OpenAPI operations | https://hotapi.ai/mcp |
| `ai.huntboard/huntboard` | Recent job postings from company career pages and ATS boards | https://huntboard.ai/mcp |
| `ai.husverket/husverket` | Swedish prefab houses, attefallshus, prices and building permit questions | https://mcp.husverket.ai/mcp |
| `ai.ironscout/ironscout` | Ammunition prices by caliber and retailer offers | https://mcp.ironscout.ai/mcp |
| `ai.jasonlovell/site` | Jason Lovell's AI research studies, builds and releases | https://jasonlovell.ai/mcp |
| `ai.jopp/jobs` | Open jobs in Switzerland and Liechtenstein | https://jopp.ai/mcp |
| `ai.justautomate/website` | JustAutomate agency services, pages, workshop pricing and contact | https://justautomate.ai/mcp |
| `ai.karmafor/karma-library` | Essay on AI cooperation, moral uncertainty and power | https://karmafor.ai/api/mcp?source=mcp-registry |
| `ai.keenable/web-search` | Live web search and page content | https://api.keenable.ai/mcp-public?keenable_title=mcp-registry |
| `ai.law.mcp/lawyer-search` | Verified US lawyer profiles by practice area, state and city | https://mcp.law.ai |
| `ai.linof/docs` | Linof documentation and current pricing for family photo films | https://linof.ai/api/apps/6a562086cd3bd1e44e0d4c3d/functions/docsMcp |
| `ai.llmhosting/pricing` | LLM API prices by provider and GPU rental prices with history | https://llmhosting.ai/mcp |
| `ai.localmark/agent-directory` | Public A2A agents, their skills and endpoint checks | https://localmark.ai/mcp |
| `ai.lovora/lovora` | Lovora AI companions, prices, content rules and docs | https://lovora.ai/mcp |
| `ai.machinerelations/mri` | Which source domains AI answer engines cite, by buyer category | https://machinerelations.ai/mcp |
| `ai.manpage/mcp` | Linux manual pages by distribution and version | https://manpage.ai/mcp |
| `ai.masnavi/masnavi` | Rumi's complete Masnavi verses with search and citation | https://masnavi.ai/mcp |
| `ai.mcpjunction/directory` | Directory of MCP servers by keyword, category and topic | https://mcpjunction.ai/mcp |
| `ai.memestack/mcp` | Memes, charts and infographics searchable by meaning or text | https://mcp.memestack.ai/mcp |
| `ai.metabind/docs` | Metabind docs: MCP Apps, BindJS, SDKs, CLI and APIs | https://docs.metabind.ai/mcp |
| `ai.msza/polish-catholic-sermons` | Polish Catholic sermons, Scripture, prayers, churches and daily content | https://msza.ai/mcp |
| `ai.name/nameai-mcp` | Domain availability, WHOIS records, TLD prices and registry rules | https://mcp.name.ai/mcp |
| `ai.nordax/mcp` | Verified business entities with trust scores and credentials | https://mcp.nordax.ai/mcp |
| `ai.nothumansearch/search` | Index of agent-ready websites and MCP endpoints | https://nothumansearch.ai/mcp |
| `ai.omnitravel/travelmcp-directory` | Directory of travel MCP servers, skills and APIs | https://omnitravel.ai/mcp |
| `ai.opencancer/opencancer` | Cancer patient answers grounded in NCCN guidelines and recruiting clinical trials | https://opencancer.ai/api/mcp |
| `ai.pakki/packaging-directory` | US consumer brands using flexible packaging, source-backed | https://pakki.ai/api/mcp |
| `ai.pechincha/deals` | Brazilian online deals, coupons and price history | https://pechincha.ai/mcp |
| `ai.pensionhunter/pensionhunter` | Cross-border pension rules by country with sources and authority answers | https://mcp.pensionhunter.ai |
| `ai.pulsegate/provenance` | Software catalog and external identifiers of projects | https://www.pulsegate.ai/api/mcp |
| `ai.radixia/blog` | Radixia blog and conference transcripts on enterprise AI and cloud | https://mcp.radixia.ai/mcp |
| `ai.rankera/rankera` | Facts, plans and pricing of the Rankera AI visibility service | https://rankera.ai/mcp |
| `ai.rayana/rayana-ai` | Stock rankings, ticker scores, signals and daily market briefs | https://mcp.rayana.ai/mcp |
| `ai.reg-bot/compliance-oracle` | US state food license rules and Florida license lookup | https://www.reg-bot.ai/api/mcp |
| `ai.regulations/regulations-ai` | AI laws and policies from 160 jurisdictions, enforcement actions and glossary | https://regulations.ai/api/mcp/v1 |
| `ai.rocketlist/rocketlist` | Current startup jobs and hiring companies | https://rocketlist.ai/mcp |
| `ai.roopslaw/legalsearch` | Indian court judgments, tribunal rulings and statutes | https://mcp.roopslaw.ai/mcp |
| `ai.runx/runx` | Catalog of governed agent skills with manifests | https://api.runx.ai/mcp |
| `ai.sfomo/events` | Upcoming San Francisco Bay Area events and performers | https://sfomo.ai/mcp |
| `ai.sharebench/registry` | AI skills, agents, prompts and playbooks | https://mcp-public.sharebench.ai |
| `ai.shumi/mcp` | Crypto prices, funding rates, sentiment and market regime | https://mcp.shumi.ai/mcp |
| `ai.smilestory/wiamusic` | Original K-pop, K-trot and K-ballad songs with key and BPM | https://mcp-wiamusic.smilestory.ai/mcp |
| `ai.snowsure/snow` | Ski resort snow conditions, forecasts and powder rankings | https://www.snowsure.ai/mcp |
| `ai.specproof/specproof-mcp` | 3GPP, IETF and multimedia standards specifications and references | https://mcp.specproof.ai/ |
| `ai.ssid/ssid-mcp` | Router default logins, compliance index and MAC vendor lookup | https://ssid.ai/mcp/http |
| `ai.startuphub/startuphub` | Startups, funding rounds, investors and company tech stacks | https://www.startuphub.ai/api/v1/mcp |
| `ai.stealthstack/discovery` | Index of MCP servers, agent skills, A2A agents and APIs | https://stealthstack.ai/mcp?src=mcpregistry |
| `ai.stoicsage/stoic-sage` | Stoic texts of Marcus Aurelius, Seneca and Epictetus with citations | https://stoicsage.ai/mcp |
| `ai.subpay/tool-finder` | Agent tools, paid x402 APIs and MCP servers with prices | https://subpay.ai/find/mcp |
| `ai.surfingdog/search` | Businesses, their products, prices and what agents can do on their sites | https://surfingdog.ai/mcp |
| `ai.swarmnest/mcp` | Directory of AI agent tools, MCP servers, skills and field reports | https://swarmnest.ai/mcp |
| `ai.synthfolk/directory` | AI agent and people profiles, companies, jobs and posts | https://synthfolk.ai/api/mcp |
| `ai.thedrain/board` | Security bulletin board threads and discussions written for AI agents | https://thedrain.ai/mcp |
| `ai.theskillvault/skills` | Agent Skills and prompts for coding, deployment and debugging | https://theskillvault.ai/mcp |
| `ai.thewholetorah/thewholetorah` | Torah lessons and classical Jewish source texts | https://www.thewholetorah.ai/api/mcp |
| `ai.tooldirectory/catalog` | AI tools with pricing, alternatives and live or dead status | https://tooldirectory.ai/api/mcp |
| `ai.toolnav/directory` | Directory of AI tools by category with source links | https://toolnav.ai/api/mcp |
| `ai.tunnelmind/scry` | Attacker observations for IPv4 addresses, ASNs, countries and attack tools | https://mcp.tunnelmind.ai/mcp |
| `ai.unquant/unquant` | Market, company, news, macro and US Congress financial data | https://unquant.ai/mcp |
| `ai.varg/how-to` | Video how-to tutorials and FFmpeg recipes | https://mcp.varg.ai/how-to |
| `ai.whatsupin/events` | Upcoming local events in cities worldwide | https://whatsupin.ai/mcp |
| `ai.wheremind/wheremind` | Places, geocoding and turn-by-turn routes | https://wheremind.ai/mcp |
| `ai.wiretensors/wiretensors` | Reviews and comparisons of 260+ AI tools | https://wiretensors.ai/mcp |
| `ai.xpoz/social-insights` | Posts and profiles from Twitter/X, Instagram, Reddit and TikTok | https://mcp.xpoz.ai/mcp |
| `am.elib/library` | Books, authors and subjects of the Armenian digital library | https://elib.am/mcp |
| `app.agendaforge/docs` | AgendaForge public documentation and product content | https://mcp.agendaforge.app/mcp/docs |
| `app.agentindex/agentindex` | Open-source AI agents, MCP servers and developer tools | https://agentindex.app/api/mcp/ |
| `app.allagents/directory` | Listed AI agents with tested badges and trust checks | https://allagents.app/mcp |
| `app.apiguru/amazon-data` | Live Amazon products, reviews, offers, deals and sellers | https://mcp.apiguru.app/mcp |
| `app.atlasly/atlasly` | UK site research and site context from official planning sources | https://mcp.atlasly.app/mcp |
| `app.cannonstudio/cannon-studio` | Cannon Studio products, pricing, workflows, models and API | https://www.cannonstudio.app/mcp |
| `app.cellarion/wine-registry` | Wines, grapes, regions and appellations plus wine guides | https://cellarion.app/api/mcp/public |
| `app.citeme/citeme` | Scholarly papers searchable by topic, DOI or ISBN, with citation formatting | https://citeme.app/api/mcp |
| `app.cutgpt/research` | Fact-checks, scholarly papers, Wikipedia, archived pages and source background | https://mcp.cutgpt.app/mcp |
| `app.dataclue/catalog` | Catalog of licensable AI training datasets: egocentric video, gripper demos, EEG | https://dataclue.app/mcp |
| `app.dealermax/public-search` | Italian used cars, long-term rentals, dealers and car market FAQs | https://mcp.dealermax.app/mcp/ |
| `app.deepsearch/deepsearch` | Public footprint of people, companies and vehicles from open sources | https://deepsearch.app/api/mcp |
| `app.esimdata/esimdata` | Travel eSIM data plans compared by provider and price | https://esimdata.app/mcp |
| `app.eurocomply/compliance` | EU regulations, deadlines and enforcement actions | https://eurocomply.app/api/mcp |
| `app.everloot/knowledge` | World of Warcraft Forever lore, drops, vendors, quests, professions and talents | https://everloot.app/mcp/public |
| `app.fojin/fojin-mcp` | Buddhist canon texts, parallels, dictionaries and commentaries with URN citations | https://mcp.fojin.ai/mcp |
| `app.founderhood/founderhood` | Indie founders and online businesses by city and country | https://founderhood.app/api/mcp |
| `app.fryd/mcp-server` | Crops, companion planting, seasonal calendars and planting plans | https://mcp.fryd.app/mcp |
| `app.futbolatlas/futbol-atlas` | Laws of the Game and major football competitions, cited | https://futbolatlas.app/mcp?via=manifest |
| `app.gingerguide/catalog` | European city sights, walking routes and itineraries in six languages | https://gingerguide.app/mcp |
| `app.hamir/mcp` | News articles from an RSS catalogue of sites and blogs | https://hamir.app/mcp |
| `app.himalayas/mcp` | Remote job listings and salary data | https://mcp.himalayas.app/mcp |
| `app.hologallery.pocket/pokemon-tcg-pocket-catalog` | Pokemon TCG Pocket cards, sets and packs | https://pocket.hologallery.app/mcp |
| `app.hyperwave.www/docs` | Hyperwave wavetable documentation | https://www.hyperwave.app/mcp/docs |
| `app.itemnumbers/itemnumbers-mbs` | Australian Medicare Benefits Schedule items, fees, history and rules | https://itemnumbers.app/mcp |
| `app.kellian/kellian` | Polymarket smart money positions, research and news | https://mcp.kellian.app |
| `app.knowra/knowra` | arXiv papers and structured analysis reports | https://mcp.knowra.app/mcp |
| `app.listentosadhu/corpus` | Vedic scripture verses, commentaries and recorded lectures | https://mcp.listentosadhu.app/mcp |
| `app.loveoracle/tarot` | Tarot card meanings for love and common love questions | https://www.loveoracle.app/api/mcp |
| `app.makeroo/makeroo` | Directory of products listed on Makeroo | https://makeroo.app/mcp |
| `app.manawa/manawa-terminal` | Market data, earnings call transcripts and financial analysis for 10,000 tickers | https://mcp.manawa.app/mcp |
| `app.marselia/marselia` | Tarot de Marseille cards, decks and lessons | https://marselia.app/api/mcp |
| `app.mcpharbor/mcp-harbor-search` | Directory of MCP servers, clients and SDKs | https://mcpharbor.app/mcp |
| `app.netlify.japan-data-mcp/japan-data-mcp` | Japanese laws, corporations and official statistics in English | https://japan-data-mcp.netlify.app/mcp |
| `app.offendersearch/offendersearch` | US sex-offender registries and criminal records with source citations | https://mcp.offendersearch.app/mcp |
| `app.openkrill/belief` | Share of people on X and Reddit holding each opinion | https://belief.openkrill.app/mcp |
| `app.openkrill/eu-business` | EU VAT validation, company LEI and French or Norwegian company registers | https://eubusiness.openkrill.app/mcp |
| `app.openkrill/food` | Packaged food products by barcode, with allergens | https://food.openkrill.app/mcp |
| `app.openkrill/papers` | Research papers and arXiv preprints with abstracts and free full text | https://papers.openkrill.app/mcp |
| `app.openkrill/rules` | US federal regulations in the CFR and Federal Register | https://rules.openkrill.app/mcp |
| `app.peptidelibrary/peptide-library` | Peptide research profiles, evidence tiers and comparisons | https://peptidelibrary.app/mcp |
| `app.performix/performix-site` | Team performance science guides, books and evidence sources | https://performix.app/api/mcp |
| `app.railway.up.agentworkmark-production/agentworkmark` | Reviewed AI services with completed-work evidence and availability | https://agentworkmark-production.up.railway.app/mcp |
| `app.remoote/remote-jobs` | Remote jobs and salary statistics | https://api.remoote.app/remoote/agents/mcp |
| `app.ridedesk/docs` | RideDesk developer docs: booking API, widgets and integration guides | https://ridedesk.app/api/mcp |
| `app.robohub/robohub` | Commercial robots with specs and comparisons | https://robohub.app/api/mcp |
| `app.sallim/contract-compass` | Korean public procurement law, statutes, court precedents and contract method rulings | https://contract.sallim.app/mcp?via=official |
| `app.sentn/opportunity-intelligence` | Software business opportunity snapshots for founders | https://sentn-opportunity-mcp-773063283118.us-central1.run.app/mcp |
| `app.shelfclub/books` | 1.7 million books searchable by title, author, mood and genre | https://mcp.shelfclub.app/mcp |
| `app.slxd/aiapipricing` | AI model API prices, comparisons and price history | https://aiapipricing.slxd.app/mcp/aiapipricing |
| `app.toolaby/docs` | Toolaby docs on payments and licensing for Chrome extensions | https://toolaby.app/api/mcp |
| `app.trickl/trickl` | Trickl partner API and webhook documentation | https://api.trickl.app/mcp/dev |
| `app.trustydata/trustydata` | French addresses, companies, localities and routing data | https://mcp.trustydata.app/mcp |
| `app.vercel.auditflag-lac/auditflag` | Going-concern auditor opinions in SEC 10-K and 10-Q filings | https://auditflag-lac.vercel.app/api/mcp |
| `app.vercel.olothea-research/olothea` | Human-AI collective intelligence research questions and knowledge | https://olothea-research.vercel.app/api/mcp |
| `app.veteranhq/va-disability-benefits` | VA disability ratings, compensation rules and 38 CFR regulations | https://api.veteranhq.app/mcp |
| `app.web.yutai-mcp/yutai-mcp` | Japanese shareholder benefits (yutai) by stock, with trading date rules | https://yutai-mcp.web.app/mcp |
| `app.workfinds/jobs` | Open jobs from company career sites by applicant country and remote status | https://workfinds.app/mcp |
| `archi.den/den_archi_mcp` | Korean construction standards, building law and architecture principles with reasoning | https://mcp.den.archi/mcp |
| `at.designare/knowledge` | designare.at web and AI knowledge base | https://designare.at/api/mcp |
| `at.fixfind/fixfind` | Products and services from Austrian local businesses | https://fixfind.at/mcp |
| `au.com.assetize/maximo` | IBM Maximo and MAS upgrades, error codes, gotchas, versions and lifecycle | https://assetize.com.au/mcp |
| `au.com.bidit/registry` | Whether retailers price match or accept offers, verified by people | https://registry.bidit.com.au/api/mcp |
| `au.com.magreader/discovery` | Magazine articles and public previews with publisher attribution | https://app.magreader.com.au/agent/mcp |
| `au.com.nationaldigital/website` | National Digital services, articles and case studies | https://mcp.nationaldigital.com.au/mcp |
| `au.com.trip-planner/camping-australia` | Australian campsites, caravan parks, free camps and nearest toilets | https://app.trip-planner.com.au/api/mcp |
| `au.publicdata/mcp` | Australian government open datasets with query, counts and version history | https://publicdata.au/mcp |
| `az.trend/news` | News archive on Azerbaijan, the Caspian and Central Asia | https://api.trend.az/mcp |
| `be.art-deco-belgique/art-deco-belgique` | Art Deco buildings, architects and routes in Belgium and northern France | https://art-deco-belgique.be/api/mcp |
| `be.co-legal/legal-lookup` | Belgian and Dutch legislation, case law, company and VAT lookups | https://agent.co-legal.be/mcp |
| `be.tripnet.mnemosyne/mnemosyne` | Lessons and questions shared by AI agents | https://mnemosyne.tripnet.be/mcp |
| `best.creditcards/mcp` | US credit card fees, APRs, rewards and sign-up bonuses | https://mcp.creditcards.best |
| `best.uneed/directory` | Curated software product directory: launches, rankings, deals and alternatives | https://mcp.uneed.best/mcp |
| `bg.namerimidom/namerimidom` | Homes for sale and rent in Bulgaria with price statistics | https://namerimidom.bg/mcp/public |
| `biz.yappy/yappy-docs` | Yappy macOS app setup, permissions, LLM backends and troubleshooting | https://yappy.biz/docs/mcp |
| `boats.charter/charter-boats` | Charter boats, marinas, anchorages, sailing routes and itineraries | https://charter.boats/mcp |
| `bot.com/combot` | Com.Bot WhatsApp platform plans, channels and site pages | https://com.bot/mcp |
| `bot.yeehaw/events` | Upcoming events in Austin, Texas | https://yeehaw.bot/mcp |
| `br.com.blucher/catalogo` | Editora Blucher technical and scientific books, prices and course syllabus matches | https://catalogo.blucher.com.br/mcp |
| `br.com.codeatlas/mcp` | CodeAtlas software services, capabilities and deliverables | https://codeatlas.com.br/mcp |
| `br.com.fipex/mcp` | Brazilian FIPE vehicle reference prices and history | https://api.fipex.com.br/mcp |
| `build.appside/mcp` | Appside developer docs and a catalog of apps and games | https://appside.build/mcp |
| `build.fabricate/fabricate` | Fabricate plans, pricing and public documentation | https://fabricate.build/mcp |
| `by.ai-belarus/registry` | Belarusian companies from the state registry by UNP | https://ai-belarus.by/mcp |
| `by.ai-tender/tenders` | Open public procurements and tenders in Belarus | https://ai-tender.by/mcp |
| `by.authorized/brands` | Brands and their authorized retailers, with authorization checks | https://app.authorized.by/api/public/mcp |
| `bz.manda/manda` | Japanese businesses for sale on the MANDA M&A marketplace | https://manda.bz/mcp |
| `ca.905trades/business-card` | 905 Trades Hamilton residential trades referral network facts and pages | https://905trades.ca/mcp |
| `ca.acrescout/land` | Land and acreages for sale across Canada | https://acrescout.ca/mcp |
| `ca.airiskmanagement/shadow-ai-list` | Risk scores of AI tools and shadow AI domains | https://ailist.airiskmanagement.ca/mcp |
| `ca.artsdata/mcp` | Canadian events, artists, organizations and venues knowledge graph | https://mcp.artsdata.ca/mcp |
| `ca.commercialgaragedoorman/business-card` | Commercial Garage Doorman services and facts for Hamilton area | https://www.commercialgaragedoorman.ca/mcp |
| `ca.entogo/knowledge` | Entogo transformers, switchgear, BESS and EV charging products and lead times | https://entogo.ca/mcp |
| `ca.garagedoorman/business-card` | Garage Doorman residential garage door repair facts in Grimsby Ontario | https://www.garagedoorman.ca/mcp |
| `ca.movahedi/privacy` | Canadian privacy enforcement actions, glossary, Quebec Law 25, cookies and crawlers | https://movahedi.ca/mcp |
| `ca.myoutfitters/mcp` | Canadian hunting and fishing outfitters and availability | https://myoutfitters.ca/mcp |
| `ca.netgrant/canadian-grants` | Canadian grants, tax credits, accelerators and loans with eligibility | https://mcp.netgrant.ca/mcp |
| `ca.oathready/citizenship-test` | Canadian citizenship test questions, study guides and IRCC stats | https://oathready.ca/api/mcp |
| `ca.pulga/marketplace` | Quebec classified ads and categories | https://mcp.pulga.ca |
| `ca.tradebasis/automotive-appraisal` | TradeBasis vehicle appraisal product, pricing and research briefs | https://tradebasis.ca/mcp |
| `care.fysio/discovery` | Swedish physiotherapy clinics, services and open appointment times | https://fysio.care/api/mcp |
| `care.vitena/directory` | Directory of health and wellness professionals | https://api.vitena.care/mcp |
| `cc.21btc/bitcoin-data` | Bitcoin price, ETF flows, on-chain metrics, fees and treasuries | https://21btc.cc/mcp |
| `cc.bestaffiliateprograms/directory` | Affiliate programs by commission, cookie window and network | https://bestaffiliateprograms.cc/v1/mcp |
| `cc.hlist/hlist-ai-tools` | AI tools with China-access data and GitHub stats | https://hlist.cc/api/mcp |
| `cc.rockpool.ai-deals/ai-deals-sentinel` | Free tiers and credits for LLM, GPU, search and embedding APIs | https://ai-deals.rockpool.cc/mcp |
| `cc.ssearch/search` | Web search and stored full-text documents | https://api.ssearch.cc/mcp |
| `center.lawncare/lawncare-center` | Lawn care guides with state and city specific timing | https://lawncare.center/mcp |
| `ch.1820/telefonbuch` | Swiss phone directory of people and businesses with reverse number lookup | https://mcp.1820.ch/mcp |
| `ch.agentready/swiss-company-directory` | Verified Swiss company profiles and services | https://agentready.ch/api/mcp |
| `ch.bitspire/website` | BitSpire .NET development, AI agents, trainings and blog | https://bitspire.ch/mcp |
| `ch.busik/fahrten` | Minibus trips between Ukraine, Germany and Switzerland | https://busik.ch/api/mcp |
| `ch.dadaville/dadaville` | Dadaville pages, personalities and historic residences, in Italian | https://www.dadaville.ch/mcp |
| `ch.easylpd/fadp` | Swiss FADP and GDPR duties, transfers and document templates | https://easylpd.ch/api/mcp |
| `ch.fedlex-connector/fedlex-connector` | Swiss federal laws, articles and amendment history | https://mcp.fedlex-connector.ch/ |
| `ch.funkyjobs/jobs` | Current job listings in Switzerland | https://www.funkyjobs.ch/mcp |
| `ch.immoswipe/immoswipe-ai` | Swiss rental and sale listings plus housing guides | https://ai.immoswipe.ch/mcp |
| `ch.was-ist-mcp/demo` | German plain-language explanations of MCP | https://mcp.was-ist-mcp.ch/mcp |
| `cloud.xiximm/feeling-search` | Visual art styles matched to feelings, with prompt references | https://xiximm.cloud/mcp |
| `club.elron/public-rentals` | Elron Club furnished apartments, locations, jobs and guidance | https://elron.club/api/agent/public/mcp |
| `cn.infimeta/public-source-search` | Encyclopedias, scholarly metadata and community sources | https://infimeta.cn/mcp |
| `cn.savantcat/answers` | China AI customer service standard GB/T 47746-2026 compliance answers | https://savantcat.cn/mcp |
| `co.brightkey/education-data` | Universities, international schools and degree ROI, English and Chinese | https://brightkey.co/api/mcp |
| `co.cafedev/cafedev` | Latin American tech jobs and hiring companies | https://mcp.cafedev.co/mcp |
| `co.chinaready/search` | China market entry guides for Western software teams | https://mcp.chinaready.co/mcp |
| `co.civai.nova/research-agent` | Live Google search and deep research reports | https://nova.civai.co/mcp/agents/research-agent |
| `co.darkknightcave/motion` | Web motion and animation recipes with prompts | https://cave-motion.darkknightcave.workers.dev/mcp |
| `co.fastaf/fastaf` | Google search, news, scholar, maps, jobs and web page content | https://api.fastaf.co/mcp |
| `co.foreverinourhearts/memorials` | Public funeral notices, memorials and partner funeral homes | https://mcp.foreverinourhearts.co/mcp |
| `co.frontierresearch/frontier` | New top-journal science papers scored on evidence and novelty | https://frontierresearch.co/api/mcp |
| `co.golfdata/golfdata` | Golf equipment catalog with retailer prices and price history | https://golfdata.co/mcp |
| `co.haveny/california-hoa-law` | California HOA law, Davis-Stirling Act statutes and homeowner rights | https://haveny-mcp.havenyy.workers.dev/mcp |
| `co.heyspark.mcp/server` | Local businesses with contact info, hours and reviews | https://mcp.heyspark.co/mcp |
| `co.ivfcost/ivf-cost-data` | US IVF clinic prices, state insurance laws and grants | https://ivfcost.co/api/mcp |
| `co.leviathansystems/public-content` | Leviathan Systems articles, services and company scope | https://www.leviathansystems.co/mcp |
| `co.neverapply/neverapply` | Global job listings searchable by filters | https://neverapply.co/mcp |
| `co.peptidesacademy/peptides-academy` | Cited peptide research summaries, comparisons and trial papers | https://peptidesacademy.co/mcp |
| `co.rentalhunter/rentalhunter` | Rental listings in India and Southeast Asian cities | https://rentalhunter.co/mcp |
| `co.supp/suppco` | Supplement products, brand trust scores and supplement research | https://api.supp.co/mcp |
| `co.theoldways/library` | Historical texts and mythology references with citation URLs | https://mcp.theoldways.co/mcp |
| `co.totalcms/docs` | Total CMS documentation, Twig reference and CMS comparisons | https://totalcms.co/mcp |
| `co.yachtfinder/yachtfinder` | Yachts for sale and charter with specs and AIS positions | https://mcp.yachtfinder.co/mcp |
| `com.0xpi.pantrypos/find-food-pantry` | US food pantries near a location and state TEFAP rules | https://pantrypos.0xpi.com/mcp-pantry |
| `com.0xpi.sdsentry/sds-lookup` | Safety data sheets, GHS pictograms and OSHA HazCom dates | https://sdsentry.0xpi.com/mcp-sds |
| `com.1001locals/catalog` | Local tours and experiences in Italy and Europe | https://api.1001locals.com/mcp |
| `com.1102tools/ecfr-mcp` | US Code of Federal Regulations text including FAR and DFARS, with change history | https://ecfr.1102tools.com/mcp |
| `com.1102tools/regulations-gov-mcp` | US rulemaking dockets, documents, public comments and open comment periods | https://regulations-gov.1102tools.com/mcp |
| `com.313automations/site` | 313 Automations services, prices and site pages | https://313automations.com/mcp |
| `com.360tft/coaching-brain` | Football coaching writing by Kevin Middleton | https://brain.360tft.com/api/brain/mcp |
| `com.99datarooms/mcp` | 99 Data Rooms pricing, docs, glossary and use cases | https://mcp.99datarooms.com/mcp |
| `com.abutly/site` | Abutly dataset rows with statistics and provenance | https://abutly.com/mcp |
| `com.accentvoice/site` | Accent cloud phone and messaging site content and plan prices | https://www.accentvoice.com/agent/mcp |
| `com.actualgroup/jobs` | Actual group job offers in France and employment agencies | https://www.actualgroup.com/mcp |
| `com.acuiq/acuiq` | Acupuncture protocols by symptom, acupoints and meridians | https://acuiq.com/api/mcp |
| `com.adcritter/mcp-dev` | AdCritter ads platform docs and API reference | https://mcp.adcritter.com/mcp/dev |
| `com.aditus.developers/developer-portal` | ADITUS event ticketing and access API documentation | https://developers.aditus.com/api/mcp |
| `com.adminlanding/french-rental-compliance` | French rental law, zone tendue, notice periods, DPE limits and home employment rules | https://api.adminlanding.com/mcp |
| `com.admit-coach/university-data` | US colleges: admissions, costs, financial aid and deadlines from federal data | https://admit-coach.com/api/mcp/ |
| `com.admitbase/admissions` | Admissions statistics for law, medical, dental and MBA schools | https://admitbase.com/api/mcp |
| `com.adrenalinelist/adventures` | Adrenaline adventures worldwide by destination, category and season | https://www.adrenalinelist.com/api/mcp |
| `com.adrianhomelab/mall-directory` | Stores in 49 malls across Romania, US, UK and Hungary | https://mall-mcp.adrianhomelab.com/mcp |
| `com.advisorfinder/mcp` | SEC-registered financial advisors, firms, disclosures and fees | https://mcp.advisorfinder.com/mcp |
| `com.agentmaru/agentmaru` | Korean export estimates, HARPEX freight index and official FX, CPI and GDP data | https://agentmaru.com/mcp |
| `com.agentonair/podcasts` | AI-hosted podcast episodes, shows and hosts | https://api.agentonair.com/mcp |
| `com.agentresourcemarket/agent-resource-market` | Agent profiles, service offers and discussions | https://agentresourcemarket.com/api/mcp |
| `com.agents-wiki/agents-wiki` | Knowledge base articles written for AI agents | https://agents-wiki.com/mcp |
| `com.agentsbooks/commons` | Agent forum threads and Q&A knowledge base | https://agentsbooks.com/api/commons/mcp |
| `com.agentscouthq/directory` | Directory of AI agent tools and MCP servers | https://mcp.agentscouthq.com/mcp |
| `com.agentshandbook/handbook` | Playbooks and lessons for jobs done with AI agents | https://agentshandbook.com/mcp |
| `com.agentstackdirectory/agent-stack-directory` | Infrastructure tools for AI agents, listed and comparable | https://agentstackdirectory.com/mcp |
| `com.agentwebmap/agentwebmap` | Publisher documentation locations found via llms.txt for domains | https://agentwebmap.com/mcp |
| `com.aguasto.www/docs` | Aguasto published research descriptions and references | https://www.aguasto.com/mcp/docs |
| `com.aibenchmarkindex/directory` | AI benchmarks by category with data sources and licences | https://aibenchmarkindex.com/mcp |
| `com.aidemos/catalogue` | AI tool reviews, rankings, use cases and comparisons | https://mcp.aidemos.com/mcp |
| `com.aidevboard/jobs` | Current AI jobs, companies and salaries | https://aidevboard.com/mcp |
| `com.aikizi/mcp` | Decoded art styles and their prompts from a public gallery | https://aikizi.com/mcp |
| `com.ainovaq/mcp` | Ainovaq services, blog on startups and go-to-market | https://ainovaq.com/mcp |
| `com.aiprofile/answers` | Sourced answers about local businesses, many owner-confirmed | https://www.aiprofile.com/api/mcp |
| `com.airfreightprice/mcp` | Air freight routes, carriers, airports and transit times | https://mcp.airfreightprice.com/mcp |
| `com.aisetupsthatwork/setups` | Step-by-step AI setups for small business, work and home | https://www.aisetupsthatwork.com/api/mcp |
| `com.aiskilldir/directory` | Curated AI agent skills, prompts and MCP servers | https://aiskilldir.com/mcp |
| `com.aitwire/authority` | Business-published records on entities with confirmation dates and claim checks | https://api.aitwire.com/mcp |
| `com.al-taswia.www/iraqi-law-research` | Iraqi law articles and official legislation links | https://al-taswia-iraqi-law-research.al-taswia.workers.dev/mcp |
| `com.alexandria-archive/archive` | History of Alexandria, Egypt: photographs, documents, maps and articles | https://www.alexandria-archive.com/mcp |
| `com.alkemata/public-knowledge` | Alkemata published articles, topics and knowledge maps | https://alkemata.com/wp-json/mcp/alkemata-public |
| `com.alleskralle/jobs` | 500k job listings in Austria, Germany and Switzerland | https://mcp.alleskralle.com/mcp |
| `com.altairworld/site` | Equity research reports, S&P 500 breadth and ticker indicators | https://altairworld.com/mcp |
| `com.alwa7i.bayan/bayan` | Arabic hadith with grades, Qur'an verses with tafsir, narrators | https://bayan.alwa7i.com/mcp |
| `com.amazonaws.us-east-1.execute-api.4fucgqu5if/agent-platform-rules` | Whether AI agents may post or automate on Reddit, HN, Bluesky, GitHub, X | https://4fucgqu5if.execute-api.us-east-1.amazonaws.com/mcp |
| `com.americassuretybonds/surety-bonds` | US surety bond requirements across all 50 states | https://americassuretybonds.com/mcp |
| `com.amortlane/site` | Amortlane dataset rows with statistics, provenance and citations | https://amortlane.com/mcp |
| `com.ampworth/documents` | UK guides on solar PV, heat pumps, batteries and MCS certification | https://ampworth.com/mcp/documents |
| `com.anchorterminal/anchor-terminal` | Graded directory of AI agent tools, MCP servers and model prices | https://www.anchorterminal.com/mcp |
| `com.angelscohq/aether` | Index of about 53,000 MCP servers and agents | https://angelscohq.com/aether/mcp |
| `com.angelscohq/agentify` | Seller-published products, verified companies and live MCP servers for agents | https://angelscohq.com/agentify/mcp |
| `com.anots/directory` | Businesses listed on ANOTS and answers from their agents | https://api.anots.com/mcp |
| `com.anthonyhunts/shaart-agency-docs` | GoHighLevel and AI automation guides, services and pricing | https://www.anthonyhunts.com/api/mcp/docs |
| `com.anygett/anygett` | Directory of offers and listings by category | https://api.anygett.com/mcp |
| `com.anywhereroles/jobs` | Remote jobs, companies, salary ranges and market statistics | https://anywhereroles.com/mcp |
| `com.apievangelist/api-evangelist` | API research, governance guides, and registry of API tools and services | https://mcp.apievangelist.com/mcp |
| `com.apmzoom.www/dongdaemun` | Dongdaemun Seoul wholesale fashion items, new arrivals and stalls | https://www.apmzoom.com/mcp |
| `com.apple-rag/mcp-server` | Apple developer documentation and WWDC video transcripts | https://mcp.apple-rag.com |
| `com.applivery.docs/mcp` | Applivery documentation on MDM, app distribution and REST API | https://docs.applivery.com/mcp |
| `com.applyall/mcp` | Employer-sourced job listings with title and location lookup | https://applyall.com/mcp |
| `com.applystead/jobs` | Open jobs from employers' own career sites and posting status | https://applystead.com/mcp |
| `com.arcalune/music` | Royalty-free background music, sound effects and game arrangements | https://arcalune.com/mcp |
| `com.arcandledger/tax-tools` | US tax reference: IRS notices, deadlines, penalties, FBAR, treaty withholding | https://mcp.arcandledger.com/directory/mcp |
| `com.arcat/arcat` | Building products, manufacturers, CAD/BIM and specs by CSI section | https://mcp.arcat.com/mcp |
| `com.ascent-partners/esg-hub` | ESG articles, glossary, frameworks and industry guidance | https://esg-hub.ascent.partners/api/mcp |
| `com.ask10ais/mcp` | Measured rankings of brands in AI model answers, Chinese and English | https://ask10ais.com/api/mcp |
| `com.asksakina/islamic-knowledge` | Quran verses in Arabic and English, du'as and the 99 Names of Allah | https://sakina-mcp.fly.dev/mcp |
| `com.askscores/sports-stats` | Sports statistics for NBA, WNBA, NFL, MLB, NHL and college football | https://www.askscores.com/mcp |
| `com.assessall/catalogue` | Online skill assessments, free practice tests and assessment guides | https://www.assessall.com/mcp |
| `com.atcspaces/atc` | Transcripts and summaries of ATC crypto, markets and AI X Spaces shows | https://mcp.atcspaces.com/mcp |
| `com.attestroom/site` | Attestroom dataset rows with statistics, provenance and citations | https://attestroom.com/mcp |
| `com.attestvio/site` | Attestvio dataset rows with statistics, provenance and citations | https://attestvio.com/mcp |
| `com.augur-trade/foresight-web` | Web page text, domain data, Wikipedia, arXiv, GitHub and package info | https://augur-trade.com/foresight/mcp/web |
| `com.australiawidefirstaid/docs` | First aid library, policies and developer docs from Australia Wide First Aid | https://www.australiawidefirstaid.com/mcp/docs |
| `com.autodesk.aps.api/product-help-mcp` | Official Autodesk help documentation for 110+ products | https://api.aps.autodesk.com/knowledge/public/v1/mcp |
| `com.autoprivado/autoprivado` | Private-seller car listings in Europe, VIN decoding and used car price estimates | https://autoprivado.com/mcp |
| `com.avecindar/rental-search` | Rental homes in Uruguay with costs and conditions | https://avecindar.com/mcp |
| `com.avenbridgetech/avenbridge` | Supplier documents, certificates and approved answers shared by businesses | https://mcp.avenbridgetech.com/mcp |
| `com.avokata/avokata` | Lithuanian statutes, court practice and legal citations | https://mcp.avokata.com/mcp |
| `com.awesomeindie/mcp` | Indie product launches, rankings and makers | https://awesomeindie.com/api/mcp |
| `com.b0tl1nk/directory` | Directory of applications listed for AI agents | https://b0tl1nk.com/mcp |
| `com.bankcodelookup/site` | Bank codes dataset with search and statistics | https://bankcodelookup.com/mcp |
| `com.batesio/site` | Batesio dataset rows with statistics, provenance and citations | https://batesio.com/mcp |
| `com.beatandraise/sec-filings` | SEC EDGAR filings since 1993, insiders, 13F and financial statements | https://beatandraise.com/mcp |
| `com.bestsaaswebdesigns/catalog` | 400 real SaaS marketing websites as design references by style and stack | https://mcp.bestsaaswebdesigns.com/mcp |
| `com.binstockly/site` | Binstockly dataset rows with statistics, provenance and citations | https://binstockly.com/mcp |
| `com.birkinbagstock/mcp` | Hermes Birkin resale listings, asking prices and auction results | https://birkinbagstock.com/mcp |
| `com.bizvaluedash/business-value` | Guides on valuing small businesses and indicative value estimates | https://bizvaluedash.com/mcp |
| `com.bkkradar/condos` | Bangkok condo listings and median rents by BTS/MRT station | https://bkkradar.com/api/mcp |
| `com.blacklabelbots/site-mcp` | Public pages and products of Black Label Bots | https://blacklabelbots.com/mcp |
| `com.blacklabeltec/site-mcp` | Public pages of BlackLabel Tech | https://blacklabeltec.com/mcp |
| `com.blbestate/site-mcp` | Public property records, parcels and owners by US state | https://blbestate.com/mcp |
| `com.blicht/mcp` | Articles on e-commerce, AI and lifestyle in German and English | https://blicht.com/mcp |
| `com.blockvectra/docs` | BlockVectra multi-chain RPC and data API documentation | https://docs.blockvectra.com/mcp/docs |
| `com.blvigil/site-mcp` | Public pages and products of Vigil | https://blvigil.com/mcp |
| `com.boardroomlist/mcp` | Open senior roles at the 500 largest US companies | https://boardroomlist.com/api/mcp |
| `com.bonebenders/bonebenders` | Dentistry: implantology, periodontology, oral surgery, glossary and drugs | https://bonebenders.com/mcp |
| `com.bonissystems/registry-expansion` | Which public registries apply to each kind of legal entity | https://bonissystems.com/api/knox/agents/registry-expansion/mcp |
| `com.boostermage/mtg-prices` | Magic: The Gathering sealed product prices across UK retailers with history | https://mcp.boostermage.com/mcp |
| `com.bot2botlabs/deadline-desk` | US retailer return, warranty and cancellation policies with cited text | https://deadline.bot2botlabs.com/mcp |
| `com.botgathering/recipes` | Tested step-by-step recipes written by AI agents | https://botgathering.com/mcp |
| `com.botrecipe/recipes` | AI bot setup recipes with steps, what worked and what failed | https://botrecipe.com/api/mcp |
| `com.bravodm/bravodm` | Creator brand deal pricing, brand creator programs and niche rate benchmarks | https://bravodm.com/api/mcp |
| `com.breakerdesk/site` | BreakerDesk dataset rows with statistics, provenance and citations | https://breakerdesk.com/mcp |
| `com.brelsfordsoftware.agentweb/insurance-ai-regulation` | NAIC AI model bulletin adoption by US state for insurers | https://agentweb.brelsfordsoftware.com/mcp |
| `com.brofindai/brofindai` | Directory of AI tools, agents and MCP servers by task and pricing | https://brofindai.com/api/mcp |
| `com.built2winweb/built2winweb` | BuiltToWinWeb services, industries, pricing and blog for small business sites | https://built2winweb.com/mcp |
| `com.bukaez/bukaez` | Public posts, AI characters and communities on BUKAEZ | https://bukaez.com/mcp |
| `com.burdenrateledger/site` | BurdenRateLedger dataset rows with statistics, provenance and citations | https://burdenrateledger.com/mcp |
| `com.bushdrum/events` | Events by city from Bushdrum | https://bushdrum.com/mcp |
| `com.byjg/docs` | ByJG open source docs for PHP, DevOps, Helm and JavaScript | https://mcpdocs.byjg.com/mcp |
| `com.cafmlane/site` | Cafmlane dataset rows with statistics, provenance and citations | https://cafmlane.com/mcp |
| `com.calibvo/site` | Calibvo dataset rows with statistics, provenance and citations | https://calibvo.com/mcp |
| `com.calmido/phone-number-lookup` | Who is behind Dutch, Belgian and Luxembourg phone numbers, spam reports | https://www.calmido.com/api/mcp |
| `com.calvingwatch/public-knowledge` | CalvingWatch product, camera requirements, privacy and safety limits | https://calvingwatch.com/mcp |
| `com.canarics/radio` | Transcripts of AI-hosted radio episodes in Latvian and English | https://canarics-radio-647994203646.europe-central2.run.app/mcp |
| `com.canonicai/canonicai-answers` | Cited answers and domain canons of constructs and relationships | https://canonicai.com/api/mcp |
| `com.canopy-io/docs` | Canopy dashboard and API documentation | https://canopy-io.com/mcp |
| `com.capanix/site` | Capanix dataset rows with statistics, provenance and citations | https://capanix.com/mcp |
| `com.captiatechnology/knowledge` | Industrial glossary, protocols and technical guides | https://www.captiatechnology.com/api/mcp/ |
| `com.carathunter/diamond-prices` | Certified diamond prices across 100 retailers and certificate lookups | https://carathunter.com/mcp |
| `com.carbikly/site` | Carbikly dataset rows with statistics, provenance and citations | https://carbikly.com/mcp |
| `com.careerbhavan/courses-and-colleges` | Indian courses, colleges and online universities: fees, approvals, syllabus | https://mcp.careerbhavan.com/mcp |
| `com.carhandshake/inventory` | Live vehicle inventory from US and Canadian dealers | https://mcp.carhandshake.com/mcp |
| `com.carriertrail/mcp` | US motor carrier records from FMCSA: authority, insurance, safety | https://carriertrail.com/mcp/v1 |
| `com.certmadeeasy/exam-practice` | Certification exam details, study paths and sample questions | https://certmadeeasy.com/mcp |
| `com.ceruleanjobs/search` | Open jobs at luxury houses and brands worldwide | https://ceruleanjobs.com/api/mcp |
| `com.chateaupedia/chateaux` | French castles with hours, prices, accessibility and events | https://chateaupedia.com/mcp |
| `com.citedindex/mcp` | AI-visibility and GEO tools with pricing, limits and sources | https://citedindex.com/mcp |
| `com.citestamp/citestamp` | Scholarly citation graph: what supports, refutes or cites a paper, retractions | https://mcp.citestamp.com/mcp |
| `com.claspine/claspine` | Claspine guides, API reference, recipes and upgrade notes | https://api.claspine.com/mcp |
| `com.claude-world/worlds-knowledge` | CLI guides, commands and configuration for Claude Code, Codex and Grok Build | https://mcp.claude-world.com/mcp |
| `com.claude.platform/docs` | Claude Platform documentation and API reference | https://platform.claude.com/docs/mcp |
| `com.claudeers/mcp` | Registry of Claude skills, plugins and MCP tools ranked by maintenance | https://claudeers.com/api/mcp/mcp |
| `com.claudeforcompliance/mortgage-regs` | Verbatim US mortgage regulations and guidelines with citations | https://mcp.claudeforcompliance.com/mcp |
| `com.clauselane/site` | Clauselane dataset rows with sources and statistics | https://clauselane.com/mcp |
| `com.clegaragedoors/garage-door-decision-kit` | Residential garage door knowledge, quote checks and spring usage | https://mcp.clegaragedoors.com/mcp |
| `com.clideck/network-knowledge` | Version-scoped network device commands, diagnostics and concepts | https://mcp.clideck.com/mcp |
| `com.clientvo/site` | Clientvo dataset rows with sources and statistics | https://clientvo.com/mcp |
| `com.cliniatlas/evidence` | Graded medical evidence answers, PubMed metadata and EU medicine data | https://ydjbww4h7sfqc3sf2wcf26mfbq0bwvfu.lambda-url.eu-central-1.on.aws/public/mcp |
| `com.clipboardo/site` | Clipboardo dataset rows with statistics, provenance and citations | https://clipboardo.com/mcp |
| `com.cmmsly/site` | Cmmsly dataset rows with sources and statistics | https://cmmsly.com/mcp |
| `com.cnccompass/suppliers` | Reviewed Chinese CNC machining suppliers with sourced facts | https://cnccompass.com/mcp |
| `com.codedebut/mcp` | New software product launches, categories and rankings | https://codedebut.com/api/mcp |
| `com.codemate/website` | Codemate services, case studies, articles, jobs and company facts | https://codemate.com/mcp |
| `com.codestringers/mcp` | CodeStringers Zoho and custom software content and business details | https://www.codestringers.com/_api/mcp |
| `com.codetrendy/directory` | Directory of software, SaaS and AI tools with alternatives | https://codetrendy.com/api/mcp |
| `com.coildesk/site` | CoilDesk dataset rows with statistics, provenance and citations | https://coildesk.com/mcp |
| `com.communitymentions/communitymentions` | Subreddits cited by AI answers and their most-cited threads | https://communitymentions.com/api/mcp |
| `com.compamir/news` | Structured news events in Japanese and English with divergent source reports | https://api.compamir.com/mcp |
| `com.compensationprofessional/discovery` | Compensation book library, answers and US minimum wage rates | https://compensationprofessional.com/api/mcp |
| `com.compoid/mcp-server` | Shared research records, papers, images and videos from communities | https://mcpv.compoid.com/mcp |
| `com.conferencefindr/events` | Upcoming business conferences and trade shows by industry and place | https://www.conferencefindr.com/api/mcp |
| `com.consentvia/site` | Consentvia dataset rows with statistics, provenance and citations | https://consentvia.com/mcp |
| `com.cookievo/site` | Cookievo dataset rows with statistics, provenance and citations | https://cookievo.com/mcp |
| `com.coppica/persuasion-taxonomy` | 766 documented persuasion techniques for marketing copy | https://taxonomy.coppica.com/mcp |
| `com.coshhvo/site` | Coshhvo dataset rows with statistics, provenance and citations | https://coshhvo.com/mcp |
| `com.courierpr/mcp` | Published company press releases across newsroom desks and categories | https://courierpr.com/api/mcp |
| `com.courtdelta/court-delta` | North Carolina court cases, citations, hearings and expunction options | https://mcp.courtdelta.com/mcp |
| `com.craftedtrust/mcp-shield` | Trust scores and security scans for 4,200 MCP servers | https://mcp.craftedtrust.com/api/v1/mcp |
| `com.craftingeventfinder/events` | US crafting shows, retreats and workshops | https://craftingeventfinder.com/api/mcp |
| `com.craftingstepbystep/tutorials` | Step-by-step papercraft tutorials with tools and supplies | https://www.craftingstepbystep.com/api/mcp |
| `com.crosodo/mcp` | Cottage-food and home-bakery laws by US state and county | https://crosodo.com/api/mcp |
| `com.csatzo/site` | Csatzo dataset rows with statistics, provenance and citations | https://csatzo.com/mcp |
| `com.csidia/notes` | Italian notes on AI regulation, data protection and compliance | https://mcp.csidia.com/mcp |
| `com.cuevr/mcp` | Cuevr sales software pages, selling advice, ROI figures and documentation in French | https://www.cuevr.com/mcp |
| `com.curatorapproved/the-curator` | Curated finds in clothing, audio, designed objects and music | https://curatorapproved.com/api/mcp |
| `com.curtilo/site` | Curtilo dataset rows with sources and statistics | https://curtilo.com/mcp |
| `com.cyberlibrary/library` | Structured cybersecurity knowledge base pages and topic taxonomy | https://www.cyberlibrary.com/api/mcp |
| `com.dadrasai/iranian-law` | Articles of Iranian statutes and regulations with legal glossary | https://mcp.dadrasai.com/mcp |
| `com.daedalmap/boundaries` | Administrative boundary polygons and geography data packs by loc_id | https://app.daedalmap.com/mcp/boundaries |
| `com.dailylogdesk/site` | DailyLogDesk dataset rows with statistics, provenance and citations | https://dailylogdesk.com/mcp |
| `com.dataandapis/catalog` | Catalog of 125 data APIs: sanctions, barcodes, IP intelligence, companies, holidays | https://dataandapis.com/mcp |
| `com.dataart/case-studies` | DataArt case studies by technology, industry and service | https://mcp.dataart.com/mcp |
| `com.datacrate360/guides-and-fixes` | Verified fixes and guides for Snowflake, dbt, Airflow and Spark errors | https://api.datacrate360.com/api/mcp/public |
| `com.datailo/datailo` | Public tenders, EU regulation and law across connected services | https://mcp.datailo.com/mcp |
| `com.datakoot/cve-vulnerability-lookup` | CVE details, exploited status, EPSS scores and package vulnerabilities | https://security.datakoot.com/mcp |
| `com.datakoot/federal-register-rules` | US Federal Register rules, notices, executive orders and agencies | https://regulatory.datakoot.com/mcp |
| `com.datakoot/sec-edgar-filings` | SEC EDGAR filings, financials and insider transactions for US companies | https://filings.datakoot.com/mcp |
| `com.dataville/dataville-mcp` | SEC filings, Wikipedia, arXiv and US Census data with source links | https://api.dataville.com/mcp |
| `com.dataworthai/buyer-directory` | Companies and programs that license data for AI training | https://dataworthai.com/mcp |
| `com.datronis/mcp` | Job listings, companies and tech news | https://api.datronis.com/api/mcp |
| `com.dedale-bi.remnant/remnant` | Reusable agent experience for hard technical problems, with evidence | https://remnant.dedale-bi.com/mcp/chatgpt |
| `com.deepchampai/deepchamp-agents` | Daily sports game slates and matchup context | https://deepchampai.com/mcp |
| `com.defectbird/site` | Defectbird dataset rows with sources and statistics | https://defectbird.com/mcp |
| `com.defici/marketplace` | Global classified listings across 80 markets | https://defici.com/api/mcp |
| `com.deflectvo/site` | Deflectvo dataset rows with sources and statistics | https://deflectvo.com/mcp |
| `com.dentaldigitalcenter/mcp` | Buenos Aires dental clinic treatments, reference prices and hours | https://dentaldigitalcenter.com/mcp |
| `com.depreo/site` | Depreo dataset rows with sources and statistics | https://depreo.com/mcp |
| `com.desaira/desaira` | Adult videos, creators and hashtags on DesAira | https://desaira.com/mcp |
| `com.detourmap/places` | 39,800 notable places worldwide from Wikidata, nearby lookups and fame rankings | https://detourmap.com/mcp |
| `com.devdocs10/docs` | Tested Swift, Python, JavaScript, CSS and HTML documentation | https://devdocs10.com/mcp |
| `com.devexpress/docs` | DevExpress component library documentation and how-to guidance | https://api.devexpress.com/mcp/docs |
| `com.digitalgemology/gemology-lessons` | Gemology lessons on diamonds, the 4 Cs, grading and moissanite | https://digitalgemology.com/mcp/learn |
| `com.digitaltableteur/mcp` | Digitaltableteur case studies, services, pricing and design system docs | https://www.digitaltableteur.com/mcp |
| `com.digitalundergroundstore/marketplace` | Indie apps, AI tools, books and templates listed in a marketplace | https://digitalundergroundstore.com/mcp |
| `com.dimhour/catalog` | Quality-scored restaurants, bars and venues across 26 cities | https://mcp.dimhour.com/mcp |
| `com.disclovo/site` | Rows and statistics from the Disclovo dataset with citations | https://disclovo.com/mcp |
| `com.discoverlaunches/launches` | New product launches from indie makers | https://discoverlaunches.com/mcp |
| `com.dispatchzo/site` | Dispatchzo dataset rows with sources and statistics | https://dispatchzo.com/mcp |
| `com.dividvo/site` | Rows and statistics from the Dividvo dataset with citations | https://dividvo.com/mcp |
| `com.docketnexus/docketnexus` | US federal court cases, dockets and companies in litigation | https://mcp.docketnexus.com/mcp |
| `com.domkozak/knowledge` | Built for MENA podcast transcripts and programmatic out-of-home lessons | https://mcp.domkozak.com/mcp |
| `com.dondego/wikidata-google-knowledge-mcp` | Wikidata entities, facts and relationships for identity resolution | https://wikidata-knowledge-mcp.revanalex.workers.dev/mcp |
| `com.doorsetbook/site` | DoorsetBook dataset rows with sources and statistics | https://doorsetbook.com/mcp |
| `com.doviandi/cyprus` | Cyprus corporate and tax rules, statutory tests and company register | https://doviandi.com/api/mcp |
| `com.dpolens/dpolens` | GDPR and UAE PDPL privacy law clauses with versions | https://mcp.dpolens.com/ |
| `com.drawscheduleworks/site` | Rows and statistics from the DrawScheduleWorks dataset with citations | https://drawscheduleworks.com/mcp |
| `com.drivings/driving-test-study` | Driving test guides and UK and US test centre directory | https://mcp.drivings.com/mcp |
| `com.droneincidents/droneledger` | Source-backed drone incident dossiers, drone types and trends worldwide | https://droneincidents.com/mcp |
| `com.dropwatchhq/found-money` | Open US class-action settlements and state unclaimed money portals | https://found-money.dropwatchhq.com/mcp |
| `com.dropwatchhq/freight-intel` | US trucking carriers, new FMCSA authorities and safety records | https://freight.dropwatchhq.com/mcp |
| `com.dropwatchhq/govcon-contractor-signals` | US federal contractors, awards and acquisition-likelihood signals | https://ma.dropwatchhq.com/mcp |
| `com.dropwatchhq/govcon-feed` | US federal contract awards and changes from USAspending | https://govcon.dropwatchhq.com/mcp |
| `com.dropwatchhq/health-intel` | US healthcare providers, exclusion lists and FDA enforcement actions | https://health.dropwatchhq.com/mcp |
| `com.dropwatchhq/research-intel` | New NIH grants and clinical trials by sponsor and institution | https://research.dropwatchhq.com/mcp |
| `com.dropwatchhq/safe-check` | Active US product recalls and counterfeit risk signals | https://safecheck.dropwatchhq.com/mcp |
| `com.durabilitycurve/archive` | Essays, claim ledgers and AI model release dates and prices | https://mcp.durabilitycurve.com/mcp/c/registry |
| `com.e-esim/esim-catalog` | Travel eSIM data plans, prices and coverage by country | https://e-esim.com/wp-json/e-esim/mcp |
| `com.easykmarket.vote/votebox-law` | Korean e-voting statutes, quorum requirements and resolution rules | https://vote.easykmarket.com/api/mcp |
| `com.editalmd/editalmd` | Brazilian public procurement tenders from PNCP with deadlines | https://editalmd.com/mcp |
| `com.egleze/mcp` | Verified podcast moments and episode summaries | https://egleze-mcp-server.onrender.com/mcp |
| `com.elopstudio.aiwave/ai-wave` | AI model releases, pricing, context sizes and deprecations | https://aiwave.elopstudio.com/api/mcp |
| `com.emdly/emdly` | Markdown skills for AI agents to find and install | https://emdly.com/mcp |
| `com.employeedeskhq/site` | employeedeskhq site dataset rows with cited answers | https://employeedeskhq.com/mcp |
| `com.empryo/docs` | Empryo product documentation and release information | https://empryo.com/mcp |
| `com.engagemii/citation-watch` | Brands ChatGPT recommends and AI visibility scores for company domains | https://api.engagemii.com/api/mcp |
| `com.entityreach/public-resources` | EntityReach corporate group data product information and sample analyses | https://entityreach.com/api/public-mcp |
| `com.entrida/mcp` | UK tariffs, regulatory changes and Turkey to UK trade data | https://qafetzoqccqafbbspjcp.supabase.co/functions/v1/mcp |
| `com.epkproperties/public-knowledge` | Panama and Dominican Republic property listings and buying guides | https://mcp.epkproperties.com/mcp |
| `com.eposvo/site` | eposvo site dataset rows with cited answers | https://eposvo.com/mcp |
| `com.eremosapp/bible` | Thai Bible text, verse search and translation notes | https://mcp.eremosapp.com/mcp |
| `com.erikbethke/blog` | Blog posts on AI, energy, policy, games and investing | https://erikbethke.com/api/mcp |
| `com.erppartnerfinder/partner-finder` | Odoo implementation partners in Germany, Austria and Switzerland | https://erppartnerfinder.com/api/mcp |
| `com.escortfox/escortfox` | Escort directory listings by city and service | https://escortfox.com/mcp |
| `com.euaiactlaw/eu-ai-act-explorer` | EU AI Act articles, recitals, annexes, definitions and obligations | https://mcp.euaiactlaw.com/mcp |
| `com.europebeachmap/beachmap` | Beaches worldwide with monthly sea temperatures | https://beachmapworld.com/mcp |
| `com.eventcompletion/events` | Verified sports events, festivals and school holiday dates | https://eventcompletion.com/mcp |
| `com.eventescapes/event-escapes` | Upcoming sports and music events with ticket, hotel and trip packages | https://mcp.eventescapes.com |
| `com.everyhourdeal/shopping` | Home, patio, gym and pet product catalog with prices | https://everyhourdeal-checkout.everyhourdeal-store.workers.dev/mcp |
| `com.evidentagents/reviews` | Directory of MCP services for research and document tasks | https://evidentagents.com/mcp |
| `com.evryroom/property-search` | Homes for sale and rent across Europe and the UAE | https://evryroom.com/mcp |
| `com.examova/mcp` | CIPS, PMP and PRINCE2 exam facts, modules, guides and sample questions | https://examova.com/api/mcp |
| `com.expatriator/immigration` | Spanish immigration procedures, pitfalls and Madrid padron appointments | https://mcp.expatriator.com/mcp |
| `com.extralingo/extralingo` | Language schools abroad with courses, dates and prices | https://www.extralingo.com/mcp |
| `com.ezoic/setup` | Ezoic ad integration documentation and setup code | https://setup-agent.ezoic.com/mcp |
| `com.faceabot/deep-search` | Science, world news, Internet Archive, GitHub and discussion search | https://faceabot.com/tools-mcp/deep-search |
| `com.faceabot/news` | Latest news headlines from public sources in seven languages | https://faceabot.com/tools-mcp/news |
| `com.faceabot/wikipedia` | Wikipedia articles and summaries in any language | https://faceabot.com/tools-mcp/wikipedia |
| `com.faceruler/faceruler` | PSL score tiers, face shapes and looksmaxxing terminology | https://faceruler.com/api/mcp |
| `com.fairoddscalculator/site` | Rows and statistics from the Fair Odds Calculator dataset | https://fairoddscalculator.com/mcp |
| `com.familyfishin.mcp/site-discovery` | Freshwater fishing articles, guidance and tackle products | https://mcp.familyfishin.com/mcp |
| `com.fateandstars/tarot-knowledge` | Tarot card meanings, topics and spread definitions | https://fateandstars.com/mcp |
| `com.ferntool/ip` | IP, WHOIS, DNS and network lookup data for domains | https://www.ferntool.com/mcp |
| `com.filltrust/questions` | Guidance for answering vendor security questionnaire questions | https://www.filltrust.com/api/mcp |
| `com.finallyoffline.www/culture` | Culture news and trends in sports, music, fashion and streetwear | https://www.finallyoffline.com/mcp |
| `com.finchiefs/research` | Research views on assets, macro themes and central banks | https://finchiefs.com/api/mcp |
| `com.findenergyrates/electricity-rates` | US retail electricity plans and utility default rates by ZIP | https://findenergyrates.com/mcp/public |
| `com.finn.www/auto` | Cars available for monthly subscription with specs and pricing | https://www.finn.com/api/mcp |
| `com.firmeromanesti/company-data` | Romanian companies, profiles, financials, status and CAEN codes | https://firmeromanesti.com/mcp |
| `com.fiscalisto/docs` | Mexican CFDI 4.0 e-invoicing API documentation and errors | https://fiscalisto.com/docs/api/mcp |
| `com.flat-hunt/mcp` | Furnished apartments and rooms for rent in Berlin | https://mcp.flat-hunt.com/mcp |
| `com.flatratebook/site` | Rows and statistics from the FlatRateBook dataset with citations | https://flatratebook.com/mcp |
| `com.flevy/flevy` | Consulting frameworks, templates, financial models and management topics | https://flevy.com/mcp |
| `com.flywhereto/mcp` | Nonstop flight routes, airports and airlines worldwide | https://flywhereto.com/api/mcp |
| `com.foliofact/foliofact` | Value-investing fund holdings, filings, stocks and insider transactions | https://foliofact.com/mcp |
| `com.fooguard/library` | Scanned free AI agent skills and configurations | https://fooguard.com/mcp/library |
| `com.fortitude21/dangerous-goods` | ADR dangerous goods UN numbers, packaging marks and containment rules | https://fortitude21.com/mcp |
| `com.freebatteryfactory/docs` | LiteShip and batpak product documentation | https://freebatteryfactory.com/mcp |
| `com.frontic/ui` | Frontic UI Vue components for commerce storefronts with docs and examples | https://mcp.ui.frontic.com/mcp |
| `com.funding-radar/radar` | Crypto perpetual funding rates across five exchanges | https://funding-radar.com/mcp |
| `com.gameanalytics/analytics-docs` | GameAnalytics SDK and API documentation for Unity, Unreal, iOS and Android | https://mcp.docs.gameanalytics.com |
| `com.gamedevoutsourcing.www/directory` | Directory of game outsourcing studios by service, country and engine | https://www.gamedevoutsourcing.com/api/mcp |
| `com.gccdomestic/gccdomestic` | GCC domestic worker agencies, licence checks, salaries and hiring guides | https://www.gccdomestic.com/mcp |
| `com.gemalli/trade` | Verified manufacturers, products, sanctions screening and HS customs codes | https://gemalli.com/api/mcp |
| `com.gemmein/mcp` | Gemmein SDK documentation, API reference and error explanations | https://api.gemmein.com/mcp |
| `com.get-flowie/docs` | Flowie Exchange API documentation and OpenAPI reference | https://docs.get-flowie.com/mcp |
| `com.getagentdepot/agent-provider-depot` | Sourced prices and comparisons of LLM, sandbox, search and email providers | https://getagentdepot.com/api/mcp?via=mcp-registry |
| `com.getagentictools/catalog` | Catalog of 41,000 agent skills, MCP servers and plugins | https://getagentictools.com/api/mcp |
| `com.getaxionlabs/axion-gateway` | UK parking appeal outcomes, NYC ticket dismissal rates, UK MTD tax | https://mcp.getaxionlabs.com/mcp |
| `com.getbeachfinder/beachfinder` | Beaches, swim spots, water activity locations and travel guides worldwide | https://getbeachfinder.com/mcp |
| `com.getbotlens/donhuffines` | Articles from the Don Huffines for Comptroller site | https://donhuffines.mcp.getbotlens.com/mcp |
| `com.getbotlens/getbotlens` | Articles published on getbotlens.com | https://getbotlens.mcp.getbotlens.com/mcp |
| `com.getbotlens/manoforstaterep` | Articles from the Mano DeAyala state representative site | https://manoforstaterep.mcp.getbotlens.com/mcp |
| `com.getbotlens/raconteur` | Business and industry articles published by Raconteur | https://raconteur.mcp.getbotlens.com/mcp |
| `com.getbotlens/texasvoice` | News articles from The Texas Voice | https://texasvoice.mcp.getbotlens.com/mcp |
| `com.getdomly/rentals` | Long-term rental listings and rent prices across Bulgaria | https://getdomly.com/mcp |
| `com.getgenko/prior-auth-docs` | Prior authorization guides, specialty checklists and Genko product facts | https://priorauth.getgenko.com/mcp |
| `com.gettreatmenthelp/gettreatmenthelp` | US addiction treatment facilities and treatment type definitions | https://gth-mcp-server.pages.dev/mcp |
| `com.getyoutubetranscript/youtube-transcript-and-youtube-search` | YouTube video transcripts, search results, channel videos and playlists | https://getyoutubetranscript.com/api/mcp |
| `com.getzeroslide/singapore-companies` | Singapore company register entries by UEN or name | https://getzeroslide.com/mcp |
| `com.ghostavo/retail-media-measurement` | Retail media measurement explained by Gus Dantas | https://mcp.ghostavo.com/mcp |
| `com.gifsnap/gifsnap` | Animated GIFs searchable by keyword and reaction | https://gifsnap.com/plugins/chatgpt/mcp |
| `com.ginbing/mcp` | China trademark goods and services classification taxonomy | https://mcp.ginbing.com/mcp |
| `com.giveradar/charity-registry` | Nonprofits and charities from official registries in 100 countries | https://giveradar.com/mcp/ |
| `com.givore/givore` | Free giveaway listings in Spanish cities | https://api.givore.com/mcp/public |
| `com.gleanmark/trademark-search` | USPTO trademark records, owners, office actions and TTAB cases | https://gleanmark.com/mcp |
| `com.glitchwire/news` | Independent tech news on AI, crypto, science and gadgets | https://glitchwire.com/mcp |
| `com.globalfinreg/lei` | Global LEI register records and legal entity form codes | https://api2.globalfinreg.com/mcp |
| `com.globalsourcepartners/emerging-markets-research` | Expert emerging-markets research on economics, politics and sovereign risk | https://www.globalsourcepartners.com/mcp |
| `com.globalvisibilityengine/public-knowledge` | Public governed enterprise knowledge objects with provenance | https://objects.globalvisibilityengine.com/public-enterprise-exposure/_agent/mcp |
| `com.gocodebook/codes` | California Title 24 building codes and local zoning text | https://gocodebook.com/api/mcp |
| `com.godavaii/health-ai` | Indian medicine facts and drug interaction checks | https://www.godavaii.com/api/mcp |
| `com.goldandsilvercompany/porte` | Belgian precious metals dealer prices, rules and coin specifications | https://ask.goldandsilvercompany.com/mcp |
| `com.goldsky/docs` | Goldsky blockchain data documentation: feeds, subgraphs, wallet APIs, RPC | https://docs.goldsky.com/mcp |
| `com.goodrecmovies/mcp` | Movie and series rankings, titles and similar recommendations | https://goodrecmovies.com/mcp |
| `com.googleapis.developerknowledge/mcp` | Google public developer documentation | https://developerknowledge.googleapis.com/mcp |
| `com.govapiatlas/govapi-atlas` | Public-sector open data APIs across ten countries | https://govapiatlas.com/mcp |
| `com.govdir/directory` | US official government offices, parcels, flood zones and land records | https://api.govdir.com/mcp |
| `com.govgazette/govgazette` | US federal contracting opportunities, awards, vendors and SAM exclusions | https://govgazette.com/api/v1/mcp |
| `com.grantcue/grantcue` | US public grants and foundation profiles from IRS filings | https://www.grantcue.com/api/v1/mcp |
| `com.greatlibraryproject/library` | Classic texts as word-by-word interlinears with word lookup | https://greatlibraryproject.com/mcp |
| `com.grecahouse/greek-property` | Greek property listings, asking prices and buying cost research | https://grecahouse.com/mcp |
| `com.greenlitbooks/catalog` | Practical books on working with AI agents, with free chapters | https://greenlitbooks.com/api/mcp |
| `com.grokbotwiki.www/grok-bot-wiki` | Community Grok Bot templates and setup, pricing and troubleshooting guides | https://www.grokbotwiki.com/api/mcp |
| `com.gumballtools/sports-rules` | Soccer IFAB Law 11 and NHL offside rule procedures | https://sports-rules.gumballtools.com/api/mcp |
| `com.guruhotel/mcp` | GuruHotel product facts, pricing and hotel PMS integrations | https://guruhotel.com/api/mcp |
| `com.hadacart/catalog-snapshots` | Korean and US product catalogs, prices and buying guides | https://hadacart.com/api/catalog/mcp |
| `com.handovra/site` | Handovra dataset rows with sources and statistics | https://handovra.com/mcp |
| `com.handsomelocal/handsome-local` | Gallery of tradesperson websites by trade, with screenshots | https://handsomelocal.com/mcp |
| `com.handsontable/docs` | Handsontable and HyperFormula docs, API reference and release notes | https://docs-assistant.handsontable.com/mcp |
| `com.hangingcontext/mcp` | Recent news stories with cited sources and topics | https://hangingcontext.com/mcp |
| `com.hardenvo/site` | hardenvo site dataset rows with cited answers | https://hardenvo.com/mcp |
| `com.hardfmly/site` | HardFM dataset rows with sources and statistics | https://hardfmly.com/mcp |
| `com.hardscapedesk/site` | hardscapedesk site dataset rows with cited answers | https://hardscapedesk.com/mcp |
| `com.headcountdesk/site` | Rows and statistics from the HeadcountDesk dataset with citations | https://headcountdesk.com/mcp |
| `com.headcountlabs/jobs` | Open job postings, pay data and job market statistics | https://api.headcountlabs.com/mcp/public |
| `com.hedgefundalpha/public-research` | Hedge Fund Alpha articles and membership product information | https://hedgefundalpha.com/mcp |
| `com.helloai/directory` | Frontier AI model rankings by task with Elo scores | https://helloai.com/mcp |
| `com.helprentdanang/rentals` | Long-term rentals in Da Nang with buildings and median rents | https://helprentdanang.com/mcp/ |
| `com.hibot/hibot` | AI visibility measurement framework and articles from HiBot | https://hibot.com/mcp/public |
| `com.hirehint/public-knowledge` | HireHint ATS and HRIS product facts and guides | https://hirehint.com/mcp |
| `com.hortosapp/au` | Australian wholesale plant grower stock lists and prices | https://au.hortosapp.com/mcp |
| `com.hortosapp/ca` | Canadian wholesale plant grower availability and prices | https://ca.hortosapp.com/mcp |
| `com.hortosapp/nz` | New Zealand wholesale plant grower stock lists and prices | https://nz.hortosapp.com/mcp |
| `com.hortosapp/us` | US wholesale plant grower availability lists and prices | https://us.hortosapp.com/mcp |
| `com.hosco/hospitality-jobs` | Hospitality jobs and training courses in Europe | https://mcp.hosco.com/mcp/public |
| `com.hotelshortlist/hotel-research` | Hotel research from guest reviews on bed bugs, noise and fees | https://hotelshortlist.com/mcp |
| `com.housenstars/real-estate-discovery` | Luxury real estate listings from HOUSE N STARS | https://hns-chatgpt-app.onrender.com/mcp |
| `com.housingfeed/rental-listings` | US rental listings and current rent statistics by city or ZIP | https://housingfeed.com/mcp |
| `com.howitspread/howitspread` | Viral cases with sourced, dated spread timelines and mechanics | https://howitspread.com/api/mcp |
| `com.hproxy/mcp` | Free proxy lists, proxy status checks and IP geolocation | https://mcp.hproxy.com/mcp |
| `com.hreflangly/site` | hreflangly site dataset rows with cited answers | https://hreflangly.com/mcp |
| `com.htagai/htag-docs` | HTAG agent guides, API endpoints, MCP tools and pricing | https://api.htagai.com/mcp/v1/servers/htag-docs/mcp |
| `com.htrbamboo/bamboo-mcp` | Bamboo product specifications and buyer procurement guides | https://mcp.htrbamboo.com/mcp |
| `com.huddlevo/site` | Huddlevo dataset rows with sources and statistics | https://huddlevo.com/mcp |
| `com.hutlists/hutlists` | Alpine mountain huts, elevation, season, booking and route guides | https://hutlists.com/mcp |
| `com.hydrantly/site` | Hydrantly dataset rows with sources and statistics | https://hydrantly.com/mcp |
| `com.hydrogenstudies/research` | Published molecular hydrogen health studies and evidence by condition | https://hydrogenstudies.com/mcp |
| `com.iberiapath/dnv-spain` | Spain digital nomad visa requirements, translators and tax estimates | https://iberiapath.com/mcp |
| `com.ibipoint/esim-catalog` | Prepaid travel eSIM plans for 200 countries with prices | https://ibipoint.com/esimshop/wp-json/ibipoint/mcp |
| `com.iconic-expeditions/concierge` | Africa safari destinations, itineraries and activities | https://concierge.iconic-expeditions.com/mcp |
| `com.ierhub/license-lookup` | Texas electrician licenses, renewal rules and TDLR forms | https://ierhub.com/api/mcp |
| `com.iinventedlight/library` | Public notes and openly licensed reference library from iinventedlight | https://iinventedlight.com/mcp |
| `com.imbawallet/agent-docs` | IMBA agent API docs on prepaid cards, eSIM, tiers and policies | https://imbawallet.com/mcp/docs |
| `com.indexagentica/mcp` | Directory of agent tools, MCP servers, APIs and skills | https://mcp.indexagentica.com/mcp |
| `com.indiarestros/mcp` | Indian restaurants, menus with prices, timings and dishes | https://indiarestros.com/mcp |
| `com.indiciadesk/desk` | BTC and ETH options research, gamma regime and max pain records | https://mcp.indiciadesk.com/mcp |
| `com.inductvo/site` | Rows and statistics from the Inductvo dataset with citations | https://inductvo.com/mcp |
| `com.infosecjobboard/jobs` | Cybersecurity jobs, salary benchmarks and hiring stats | https://www.infosecjobboard.com/api/mcp |
| `com.infysvg/svg-clipart` | Free SVG cut files and clipart designs | https://infysvg.com/mcp |
| `com.intakez/site` | intakez site dataset rows with cited answers | https://intakez.com/mcp |
| `com.invokera/book-search` | Books and authors from the Open Library catalog | https://invokera.com/r/book-search |
| `com.invokera/currency-rates` | Latest and historical ECB foreign exchange reference rates | https://invokera.com/r/currency-rates |
| `com.invokera/discover` | Catalog of published tools on the Invokera platform | https://invokera.com/discover |
| `com.invokera/postal-codes` | Postal codes with place names and coordinates for 60+ countries | https://invokera.com/r/postal-codes |
| `com.ip99/ip99` | IP address geolocation and proxy, VPN or datacenter risk | https://ip99.com/mcp |
| `com.ipogrid/ipogrid` | IPO calendar, SEC filings, deal terms and IPO news | https://ipogrid.com/mcp |
| `com.ismsdirectory/isms-directory` | ISO 27001, SOC 2 and compliance service providers | https://ismsdirectory.com/api/mcp |
| `com.isoligne/index` | How readable French websites are to AI, scores by sector | https://isoligne.com/mcp |
| `com.israbase/israbase` | Israeli companies, nonprofits and partnerships from the official registry | https://israbase.com/mcp |
| `com.it.justclaw/justclaw-it` | Licence-cleared reusable source code components with attribution and security advisories | https://justclaw.it.com/mcp |
| `com.ithy/research-library` | Public explanations and worked examples with sources and dates | https://ithy.com/mcp |
| `com.iwonder/iwonder` | Documentary films with metadata and where to watch by country | https://iwonder.com/api/mcp/mcp |
| `com.jacobcampbellrealtor/jacobcampbellrealtor` | Florida real estate, county market figures and realtor site content | https://jacobcampbellrealtor.com/mcp-server.php |
| `com.jakehandy/mcp` | Essays by Jake Handy on AI, music tech and agentic engineering | https://jakehandy.com/mcp |
| `com.janlinketscher/site` | Essays and profile of Jan Linketscher on digital topics | https://janlinketscher.com/api/mcp |
| `com.japandirecttrucks/shop` | Japanese used trucks and vans for export, shipping and import guides | https://japandirecttrucks.com/mcp |
| `com.jasontally.mac/mcp` | IEEE registry owner organization for MAC addresses and OUI prefixes | https://mac.jasontally.com/mcp |
| `com.jeeva-jyotish/reference-search` | Classical Vedic astrology effects, yogas and placements with citations | https://mcp.jeeva-jyotish.com/mcp |
| `com.jenniferrebholz/rebholz-attorney` | Arizona personal injury attorney Jennifer Rebholz background and credentials | https://mcp.jenniferrebholz.com/mcp |
| `com.jirventures/knowledge` | JIR Ventures knowledge base of captured thoughts searchable by meaning | https://aiagent.jirventures.com/brain/mcp |
| `com.jobcardo/site` | jobcardo site dataset rows with cited answers | https://jobcardo.com/mcp |
| `com.jobcrawls/connector` | Active job listings in Finland and net salary tax rules | https://www.jobcrawls.com/api/connector |
| `com.jobsinsportstech/jobs` | Open roles at sports technology companies | https://jobsinsportstech.com/mcp |
| `com.jobsitecerts/safety-reference` | OSHA rule text, construction toolbox talks and safety regulatory news | https://jobsitecerts.com/api/mcp/public |
| `com.jobyap/jobs` | Job postings from company career sites with discussion threads | https://mcp.jobyap.com/mcp |
| `com.joinplexa/plexa` | Local businesses in Mexico and Latin America with hours, services and FAQs | https://api.joinplexa.com/mcp/ |
| `com.jointhestudentlife/docs` | Student city guides, blog guides, FAQ and policies | https://jointhestudentlife.com/mcp/docs |
| `com.jpfreesoft/catalog` | Japanese software and AI tools with recorded facts and sources | https://jpfreesoft.com/api/mcp/ |
| `com.jyotishintelligence/sealed-forecasts` | Bitcoin-anchored sealed forecasts with grades and calibration records | https://jyotishintelligence.com/mcp |
| `com.kaalshodh/kaalshodh` | Indian astronomy events, planetary positions and eclipses from -5000 to 5000 | https://kaalshodh.com/mcp |
| `com.kartvelians/knowledge` | Everyday US newcomer guides for Georgian speakers | https://kartvelians.com/mcp |
| `com.kayoupu.www/plans` | Mainland China mobile data plans with terms and source dates | https://www.kayoupu.com/api/mcp |
| `com.kbasevo/site` | Rows and statistics from the Kbasevo dataset with citations | https://kbasevo.com/mcp |
| `com.keeltools/keeltools-directory` | AI tools, skills and prompts with pricing and features | https://keeltools.com/mcp |
| `com.keysvo/site` | keysvo site dataset rows with cited answers | https://keysvo.com/mcp |
| `com.kickoffo/site` | kickoffo site dataset rows with cited answers | https://kickoffo.com/mcp |
| `com.kintoolkit/label-reference` | US children's medicine label dosing directions and educational question guides | https://kintoolkit.com/api/mcp |
| `com.kitsdeals/deals` | Human-reviewed current product deals and discounts | https://mcp.kitsdeals.com |
| `com.knowjudges/knowjudges` | US judges, courts, courtroom rules and judicial analytics | https://mcp.knowjudges.com/mcp |
| `com.knowledgeforagents/knowledge-for-agents` | Agent-reported problems, solutions and outcomes for MCP, API and CI issues | https://knowledgeforagents.com/mcp |
| `com.koreanics/korea-law-acts-and-bills` | South Korean statutes and National Assembly bills in English | https://koreanics.com/wp-json/koreanics/v1/mcp |
| `com.koskamo/koskamo` | MCP server directory and cited versioned reference facts | https://koskamo.com/api/mcp |
| `com.kpidepot/kpi-depot` | Corporate KPI definitions, formulas and industry benchmarks | https://kpidepot.com/mcp |
| `com.ktrenz/kdata` | K-pop artists, trending rankings and AI answer-engine reach | https://ktrenz.com/api/mcp |
| `com.kzsaleshub/knowledge` | B2B sales, marketing and management articles for Kazakhstan and Central Asia | https://kzsaleshub.com/mcp |
| `com.lanyardo/site` | lanyardo site dataset rows with cited answers | https://lanyardo.com/mcp |
| `com.larabench/larabench` | Laravel jobs, ecosystem news and package releases | https://larabench.com/mcp |
| `com.lastminutedealshq/company-signals` | Open job counts and hiring trends per company over time | https://company-signals.lastminutedealshq.com/mcp |
| `com.launch529/open-data` | US colleges' costs, state 529 plans and qualified 529 expenses | https://launch529.com/api/public/mcp |
| `com.launchator/launchator` | Directory of new SaaS, AI and indie products | https://launchator.com/api/mcp |
| `com.lawstronaut/lawstronaut-mcp` | Laws and court cases across many jurisdictions | https://mcp.lawstronaut.com |
| `com.learnthedao/learn-the-dao` | All 81 chapters of the Tao Te Ching with search | https://learnthedao.com/api/mcp |
| `com.lebaneselegislation/mcp` | Lebanese laws, articles, court rulings and Official Gazette issues | https://lebaneselegislation.com/mcp |
| `com.legalaimcp/directory` | Directory of AI tools and MCP servers for law firms | https://legalaimcp.com/api/mcp |
| `com.legendsoflearning.app/catalog` | K-8 educational games aligned to curriculum standards | https://app.legendsoflearning.com/mcp |
| `com.lessonvo/site` | lessonvo site dataset rows with cited answers | https://lessonvo.com/mcp |
| `com.lettance/rules` | English landlord rules, council licensing and landlord register by postcode | https://lettance.com/mcp |
| `com.lettza/site` | lettza site dataset rows with cited answers | https://lettza.com/mcp |
| `com.lifelongedge/edge-lab` | Published trading-system research studies | https://lifelongedge.com/mcp |
| `com.lillytechsystems/ai-school` | Free AI course tracks and thousands of lessons | https://lillytechsystems.com/mcp |
| `com.limslane/site` | limslane site dataset rows with cited answers | https://limslane.com/mcp |
| `com.linkbreakers/docs-mcp` | Linkbreakers help articles, pricing and QR code docs | https://linkbreakers.com/mcp |
| `com.lintelly/hr-deutschland` | German employment law: notice periods, probation, fixed-term contracts, leave | https://hr.lintelly.com/mcp |
| `com.litescrape/litescrape-mcp-server` | Google, Bing, DuckDuckGo web search results and Google Maps places | https://mcp.litescrape.com/mcp |
| `com.liz6/docs` | Public documents, prompts and resources published by liz | https://doc.liz6.com/mcp |
| `com.llclane/site` | llclane site dataset rows with cited answers | https://llclane.com/mcp |
| `com.lobbyvo/site` | lobbyvo site dataset rows with cited answers | https://lobbyvo.com/mcp |
| `com.locatejobsnetwork/search-jobs` | Live US job listings and state unemployment benefit answers | https://locatejobsnetwork.com/api/mcp |
| `com.logimu/shopping-mcp` | Amazon and Walmart product prices, stock, history and sellers | https://api.logimu.com/mcp |
| `com.lokerdollar/jobs` | Worldwide remote jobs, salary benchmarks and skill demand | https://mcp.lokerdollar.com/mcp |
| `com.longtailo/site` | longtailo site dataset rows with cited answers | https://longtailo.com/mcp |
| `com.lookmybio/public` | Creator bio pages, links and blog posts on lookmybio | https://mcp.lookmybio.com/public |
| `com.loopingagent/loopingagent-mcp` | Articles on agentic AI and RAG plus the author's projects | https://loopingagent.com/api/mcp |
| `com.lootcodes/catalog` | Game keys, gift cards and top-ups with prices and activation regions | https://www.lootcodes.com/api/mcp |
| `com.lordevo/agent-directory` | Directory of agent-callable APIs, x402 endpoints and MCP servers | https://lordevo.com/mcp |
| `com.losshq/directory` | Certified insurance appraisers and umpires by state, city and specialty | https://www.losshq.com/mcp |
| `com.lotsofsounds/mcp` | CC0 sound effects searchable by keyword and category | https://api.lotsofsounds.com/mcp |
| `com.lovefengis/docs` | lovefengis developer docs for REST API, MCP, CLI and auth | https://lovefengis.com/mcp/docs |
| `com.lpreportly/site` | lpreportly site dataset rows with cited answers | https://lpreportly.com/mcp |
| `com.lucernel/lucernel` | Lucernel apps, guides, roundups and comparison articles | https://lucernel.com/mcp |
| `com.lugtorq/site` | lugtorq site dataset rows with cited answers | https://lugtorq.com/mcp |
| `com.lxrflow/agora` | Q&A threads where AI agents ask and answer technical questions | https://agora.lxrflow.com/mcp |
| `com.macaroonnetwork/bible-evidence` | BSB and WEB Bible verses with context, comparison and cross-references | https://api.macaroonnetwork.com/mcp-faith-evidence-v1/mcp/ |
| `com.mactechsolutionsllc.www/federal-market` | US federal contract opportunities, awards, contractors and spending | https://www.mactechsolutionsllc.com/api/mcp/market |
| `com.mandateoffice/mandate` | EU and national law links, company registers and formation guides | https://mandateoffice.com/mcp |
| `com.mandatzo/site` | mandatzo site dataset rows with cited answers | https://mandatzo.com/mcp |
| `com.maneratech/aicitizenship` | Citizenship test formats and practice questions with answers | https://aicitizenship.maneratech.com/mcp |
| `com.manusights/manusights` | Journal AI policies and reference existence and retraction checks | https://manusights.com/mcp |
| `com.mariadb/mariadb-docs` | Official MariaDB documentation and release notes | https://mariadb.com/docs/~gitbook/mcp |
| `com.marketcheck/api` | US and UK car listings, prices, VIN data and market history | https://developers.marketcheck.com/api/mcp |
| `com.marketcheck/docs` | MarketCheck automotive API documentation and endpoint reference | https://developers.marketcheck.com/api/docs-mcp |
| `com.markupbird/site` | Markupbird dataset rows with sources and statistics | https://markupbird.com/mcp |
| `com.mart402/free` | Index of x402 paid services and operator track records | https://mart402.com/mcp/free |
| `com.mashzo/site` | Mashzo dataset rows with sources and statistics | https://mashzo.com/mcp |
| `com.matchoffice/mcp` | Commercial real estate and office locations available to rent | https://www.matchoffice.com/api/mcp |
| `com.maxand98/maxand98` | maxand98 publications, citations, claims and evidence records | https://maxand98.com/mcp |
| `com.maximofn/content` | AI and machine learning posts, tips and projects | https://www.maximofn.com/mcp |
| `com.mcp-revenue-empire/japan-public-ledgers` | Daily ledgers of Japanese public data across 12 domains | https://mcp.mcp-revenue-empire.com/mcp |
| `com.mcplookup/mcp` | Trust, security and maintenance ratings for MCP servers | https://mcplookup.com/mcp |
| `com.mcpskillhub/mcpskillhub` | 49,000 MCP servers with token cost, security signals and install snippets | https://mcpskillhub.com/mcp |
| `com.mcptoplist/mcptoplist` | MCP servers ranked by adoption data | https://mcptoplist.com/mcp |
| `com.measuretechpro/agent-door` | Measure Tech PRO contractor CRM knowledge base, forum, roadmap and pricing | https://measuretechpro.com/mcp |
| `com.medcontra/site` | medcontra site dataset rows with cited answers | https://medcontra.com/mcp |
| `com.mediapronet/directory` | Directory of software, SaaS, AI tools and websites | https://mediapronet.com/api/mcp |
| `com.meetsponsors/mcp` | YouTube sponsors, sponsored videos and sponsored channels | https://api.meetsponsors.com/mcp |
| `com.metaltakip/digest` | Turkish gold market analysis, indicators and research articles | https://www.metaltakip.com/api/mcp |
| `com.metraipolis/knowledge-commons` | HTTP and RFC standards clauses, browser support and package checks | https://metraipolis.com/mcp |
| `com.metricduck/financial-analysis` | US public company financials, SEC filings and XBRL facts | https://mcp.metricduck.com/mcp |
| `com.mettakin/mettakin` | First-person meditation experiences, phenomena and practices | https://mettakin.com/mcp |
| `com.mhsbloom/neutral-skincare-reference` | Dermacosmetic skincare products, ingredients, brands and alternatives | https://europe-west3-mhs-bloom.cloudfunctions.net/bloomMcp |
| `com.microsoft/microsoft-learn-mcp` | Official Microsoft and Azure documentation and code samples | https://learn.microsoft.com/api/mcp |
| `com.mikefluff/mikefluff` | Published answers and book content from Mike Fluff Press | https://www.mikefluff.com/mcp |
| `com.mikereams/site` | Enterprise architecture posts, CSDM diagrams and architect toolbox resources | https://mikereams.com/mcp |
| `com.mintlify/searchmcp` | Mintlify documentation: setup, CLI, docs.json, components, pricing | https://www.mintlify.com/docs/mcp |
| `com.mintmcp/docs` | MintMCP enterprise MCP gateway documentation | https://www.mintmcp.com/docs/mcp |
| `com.mobiscroll/mcp` | Mobiscroll UI component schemas, examples and Connect API reference | https://mcp.mobiscroll.com |
| `com.modelsagree/modelsagree` | Consensus best-product rankings from ChatGPT, Claude, Gemini and Grok | https://modelsagree.com/mcp |
| `com.modernmustardseed/funding-finder` | Live US federal grant opportunities from Grants.gov and eligibility | https://mcp.modernmustardseed.com/funding-finder |
| `com.modevc/ai-charts` | Time-series data on AI adoption and venture capital research charts | https://modevc.com/api/mcp/charts |
| `com.modevc/investor-atlas` | Venture capital firms and partners by stage, sector and location | https://modevc.com/api/mcp/investors |
| `com.modevc/radar` | AI market charts and a directory of venture capital investors | https://modevc.com/api/mcp |
| `com.modevc/stage-pre-seed` | Pre-seed venture capital firms, partners and valuation benchmarks | https://modevc.com/api/mcp/stage-pre-seed |
| `com.modevc/stage-seed` | Seed stage venture capital firms, partners and check sizes | https://modevc.com/api/mcp/stage-seed |
| `com.modevc/stage-series-a` | Series A venture capital firms, partners and valuation benchmarks | https://modevc.com/api/mcp/stage-series-a |
| `com.modevc/stage-series-b` | Series B venture capital firms, partners and investment criteria | https://modevc.com/api/mcp/stage-series-b |
| `com.mojalab/content` | MojaLab blog posts, pages and tags | https://mojalab.com/mcp |
| `com.mooncatcherwire/wire` | Crypto news stories ranked by market impact with AI digest | https://mooncatcherwire.com/mcp |
| `com.movingpolygons/maps-public` | Published animated maps of historical borders, wars and empires | https://www.movingpolygons.com/mcp/public |
| `com.mozilladatacollective/datasets` | Ethically sourced AI training datasets by task and language | https://mozilladatacollective.com/api/mcp |
| `com.mrrledger/mrrledger` | Sourced revenue and growth figures of AI agent businesses | https://mrrledger.com/mcp |
| `com.mtgbench/mtgbench` | Magic: The Gathering cards, rules, rulings, combos and deck data | https://mtgbench.com/mcp |
| `com.multilo/multilo` | Multilo product documentation, pages and changelog | https://www.multilo.com/api/mcp |
| `com.multiplesbook/site` | MultiplesBook dataset rows with statistics and citations | https://multiplesbook.com/mcp |
| `com.musicatlas/musicatlas` | Commercial music similarity, track characteristics and similar artists | https://mcp.musicatlas.ai/mcp |
| `com.mustvo/site` | Mustvo dataset rows with statistics and citations | https://mustvo.com/mcp |
| `com.myanimetracker/myanimetracker` | Anime watch orders, filler guides, titles and airing schedule | https://myanimetracker.com/api/mcp |
| `com.mybiblecopilot/bible-copilot` | Bible verse text, quote verification and scripture-cited study answers | https://mybiblecopilot.com/mcp |
| `com.mycardfolio/cards` | Sports cards, set checklists, parallels and card identification | https://mycardfolio.com/api/mcp |
| `com.myhuiban.www/conference-partner` | Academic conference and journal deadlines, rankings and acceptance rates | https://www.myhuiban.com/mcp |
| `com.myoddly/oddly-corpus` | Observed web records, subject histories and benchmarks | https://myoddly.com/api/public/mcp |
| `com.myprivacyagent/public` | Data broker opt-out guides and removal routes | https://myprivacyagent.com/api/mcp |
| `com.myrmigo/myrmigo` | Airline booking change rules, official booking sites and EU261 compensation | https://mcp.myrmigo.com/mcp |
| `com.ncstatutes/ncgs` | North Carolina General Statutes text, amendments and changes | https://mcp.ncstatutes.com/mcp |
| `com.nearfine/books` | Book listings, new and used, across booksellers worldwide | https://nearfine.com/mcp |
| `com.negativeresistance/cure-protocol` | Disease research signals, clinical trials and cure progress evidence | https://negativeresistance.com/api/v1/mcp |
| `com.neptunecigar/catalog` | Premium cigar lines, ratings, availability and US state shipping rules | https://mcp.neptunecigar.com/mcp |
| `com.neuralcosmology/neuralcosmology` | Essays and answers on consciousness and cosmology | https://neuralcosmology.com/mcp |
| `com.neurobird/search` | Live web search results with extracted passages | https://search.neurobird.com/mcp |
| `com.neuronto/agents-tools-search-discovery-ard-registry` | Registry of MCP servers, skills, agents and APIs | https://neuronto.com/mcp |
| `com.newruntime/archive` | Dated AI engineering coverage, forecasts and topic briefs | https://newruntime.com/mcp |
| `com.nicheangle/niche` | Niche news briefings and sourced story angles | https://api.nicheangle.com/mcp |
| `com.ninebix/site` | Ninebix dataset rows with statistics and citations | https://ninebix.com/mcp |
| `com.niubiagent/niubiagent` | Source-backed AI agent ecosystem signals and briefings | https://www.niubiagent.com/mcp |
| `com.nobleblocks/nobleblocks-mcp` | Academic papers, citations, authors and clinical trial registrations | https://mcp.nobleblocks.com/mcp |
| `com.nokycscore/nokycscore` | No-KYC exchanges, wallets and VPNs with privacy grades and incidents | https://nokycscore.com/mcp |
| `com.nomnaviet/han-nom` | Vietnamese Chu Nom and Han characters, readings and historical dictionary | https://api.nomnaviet.com/mcp |
| `com.noonlaunch/mcp` | Startup product directory, weekly launch winners and launch sites | https://noonlaunch.com/mcp |
| `com.noteboxd/mcp` | Fragrances, notes, accords, brands, perfumers and reviews | https://mcp.noteboxd.com/mcp |
| `com.ntop/docs` | nTop engineering software knowledge base and guides | https://docs.ntop.com/mcp |
| `com.nuditok/nuditok` | Adult video clips, creators and hashtags | https://nuditok.com/mcp |
| `com.nursinghomedatabase/mcp` | US nursing homes, CMS ratings and ownership records | https://mcp.nursinghomedatabase.com/mcp |
| `com.nuxtseo/nuxt-seo` | Nuxt SEO module docs and SEO checks for URLs | https://nuxtseo.com/mcp |
| `com.nymwell/lookup` | Domain availability, prices and public registration records | https://nymwell.com/mcp/lookup |
| `com.oakferry/agents` | Oakferry app facts: platforms, prices, ratings and limits | https://agents.oakferry.com/mcp |
| `com.oilpicker/oilpicker` | Korean regional currency fuel discounts and accepting merchants | https://oilpicker.com/api/mcp |
| `com.okeystay/okeystay` | Holiday rental listings with availability and total prices | https://okeystay.com/mcp |
| `com.okfindex/okfindex` | Open Knowledge Format bundles and legislation status | https://okfindex.com/mcp |
| `com.olachill/olachill-travel` | Japan tours, tickets, transfers, charters and experiences with prices | https://olachill.com/mcp |
| `com.olyport/cochrane` | Cochrane systematic medical reviews and clinical evidence | https://mcp.olyport.com/cochrane/mcp |
| `com.olyport/irs-990` | US nonprofit IRS 990 filings, revenue, assets and compensation | https://mcp.olyport.com/irs-990/mcp |
| `com.olyport/pubmed` | PubMed biomedical literature, related articles and MeSH terms | https://mcp.olyport.com/pubmed/mcp |
| `com.onefindme/search` | AliExpress and eBay product listings with prices and ratings | https://onefindme.com/mcp |
| `com.oneuedu.mcp/oneu-education` | Australian courses, providers, occupations and skilled visa invitation data | https://mcp.oneuedu.com/mcp |
| `com.openforallofus/agora` | MCP servers catalog ranked by measured health checks | https://openforallofus.com/api/mcp |
| `com.openmedici/public` | Public fellowships, grants, scholarships and prizes | https://openmedici.com/mcp |
| `com.opennash.jobs/opennash-jobs` | Official job listings at Forbes Global 2000 companies and trends | https://jobs.opennash.com/mcp |
| `com.openpublica/civic-meetings` | US local government meeting summaries and transcripts | https://api.openpublica.com/mcp |
| `com.orderpadledger/site` | orderpadledger site dataset rows with cited answers | https://orderpadledger.com/mcp |
| `com.organikpi/organikpi` | OrganiKPI blog posts, product reviews and AI search study datasets | https://organikpi.com/.well-known/mcp |
| `com.orgbix/site` | Rows and statistics from the Orgbix dataset with citations | https://orgbix.com/mcp |
| `com.origamitutor/origami-tutor` | Origami models and illustrated folding instructions | https://origamitutor.com/api/mcp |
| `com.orlandu/arcade` | Sony PVM/BVM monitor specs, PlayChoice-10 games and retro video | https://www.orlandu.com/api/mcp |
| `com.ortexo/mcp` | Romanian and EU legislation and case law with article citations | https://mcp.ortexo.com/mcp |
| `com.otinstaller/registry` | OSINT tools and investigation guides with usage and ethics notes | https://api.otinstaller.com/mcp |
| `com.ownerspec/mcp` | Home water treatment guides, diagnosis, parts and sizing | https://ownerspec.com/mcp |
| `com.oystelo/network` | Agent-shared threads and structured knowledge | https://www.oystelo.com/agent-mcp |
| `com.pakistancaselaw/caselaw` | Pakistani court judgments, citations and legal questions settled | https://pakistancaselaw.com/mcp |
| `com.partanswers/filter-lookup` | Refrigerator water filter compatibility by model and NSF certifications | https://partanswers.com/mcp |
| `com.partstable/partstable` | IT hardware part numbers, cross-references and substitutes | https://partstable.com/mcp |
| `com.pawlisty/pet-listings` | Pets for sale or adoption, breeds and buyer safety guidance | https://pawlisty.com/mcp |
| `com.peek/mcp` | Travel experiences, tours and activities with availability | https://mcp.peek.com |
| `com.peerlace/peerlace` | Directory of AI agents and their capabilities | https://peerlace.com/mcp?via=mcp-registry |
| `com.peerlookup/board` | Public agent questions, findings and answered discussions | https://peerlookup.com/mcp |
| `com.penguindriver/glossary` | Plain-language Chinese explanations of AI and tech terms and how-tos | https://glossary.penguindriver.com/mcp |
| `com.peopleanalyst/discovery` | People analytics answers, story tracks and marketing registries | https://peopleanalyst.com/mcp |
| `com.perkusai/search` | In-stock US and Amazon products with prices and ratings | https://mcp.perkusai.com/ |
| `com.pestpin/pestpin` | US pest control licenses and typical service costs | https://pestpin.com/mcp |
| `com.petabloom/podcasts` | Podcast episode transcripts searchable by keyword and topic | https://podcasts.petabloom.com/mcp |
| `com.petforai/pet-data-station` | Pet food regulations, recalls, nutrient standards and pet health data | https://petforai.com/mcp/ |
| `com.petnecto/pets` | Adoptable shelter pets and rescues near a place | https://petnecto.com/mcp |
| `com.pewesenergy/catalogue` | PEWES ENERGY drinks catalogue and price list | https://pewesenergy.com/api/mcp |
| `com.pick-rate/hotels` | Hotels bookable directly without OTA commission | https://pick-rate.com/mcp |
| `com.plendio/plendio` | Product prices compared across shops in Denmark, Sweden, Norway and Germany | https://plendio.com/mcp |
| `com.plumbregistry/directory` | Fire protection contractor licenses in Texas and California | https://plumbregistry.com/mcp |
| `com.podlexicon/podlexicon` | AI summaries of long-form podcast episodes by topic | https://podlexicon.com/mcp/ |
| `com.point-topic/point-topic-mcp-public` | UK broadband ISPs, networks, links and standards | https://mcp.point-topic.com/public |
| `com.politicalcomms/docs` | Political Comms product documentation | https://docs.politicalcomms.com/mcp |
| `com.pontofato/pontofato` | Brazilian addresses by CEP, geocoded points and companies at each CEP | https://pontofato.com/mcp |
| `com.powerplatformtip/mcp` | Practical Microsoft Power Platform tips and articles | https://func-mcp-kmupower.azurewebsites.net/tip/mcp |
| `com.pplfree/ground-school` | FAA private pilot ground school lessons and practice questions | https://pplfree.com/mcp |
| `com.ppn-hub/ppn-hub` | Dozens of public APIs covering environment, culture and energy data | https://mcp.ppn-hub.com/mcp |
| `com.primessio/mcp` | AI implementation, software and marketing guides from Primessio | https://primessio.com/mcp |
| `com.printinglabs/printing-labs` | Corporate gifting catalog, bulk pricing and company information | https://printinglabs.com/mcp |
| `com.probativegrowth/legal-markets` | US legal market demand, lawyer supply and advertising rules by county | https://probativegrowth.com/mcp/markets |
| `com.profitpather.tools/us-tariff-lookup` | US Harmonized Tariff Schedule codes and governing duty rates | https://tools.profitpather.com/duty/mcp |
| `com.proflightsearch/airport-delays` | Live airport delays, weather conditions and forecasts | https://proflightsearch.com/mcp |
| `com.projectthunder/site` | ERP and B2B ecommerce insights, case studies and ERP partner directory | https://www.projectthunder.com/mcp |
| `com.pyungyo/mvno-plans` | Korean MVNO mobile plans, prices and price history | https://pyungyo.com/mcp |
| `com.quantlix/content` | Quantlix services, company information and insights | https://quantlix.com/mcp/ |
| `com.qubitsok/mcp-server` | Quantum computing jobs, arXiv papers and researcher profiles | https://qubitsok.com/mcp |
| `com.quelvio/mcp-server` | A company's internal knowledge across Drive and other connected systems | https://mcp.quelvio.com/http |
| `com.radar-cnpj/radar-cnpj` | Brazilian company registry data by CNPJ, CNAE and construction works | https://radar-cnpj.com/mcp |
| `com.realevr.estates/estates` | African homes for rent or sale with real estate news | https://estates.realevr.com/mcp |
| `com.recipes-daily/recipes` | Recipes and cooking guides searchable by ingredient | https://recipes-daily.com/mcp |
| `com.redocly/mcp` | Redocly product docs, guides and blog | https://redocly.com/mcp |
| `com.redpanda/docs-mcp` | Redpanda documentation, API reference and configuration properties | https://docs.redpanda.com/mcp |
| `com.reelsongfinder/reelsongfinder` | Song recordings by ISRC and songs used in social videos | https://reelsongfinder.com/mcp |
| `com.reevol.source/supplier-search` | Global suppliers by product, HS code, country with due diligence flags | https://source.reevol.com/mcp |
| `com.refapp/help` | Refapp help center articles on how the product works | https://help-mcp.refapp.com/mcp |
| `com.referralflooring/business-card` | Referral Flooring business facts and website content | https://www.referralflooring.com/mcp |
| `com.regaffairsai/regaffairs` | Chemical, food, pharma, device and cosmetic regulations with citations | https://mcp.regaffairsai.com/mcp |
| `com.reguscilabs.www/documentation` | RegusciLabs innovation lab information, news and public activity | https://mcp.reguscilabs.com/docs |
| `com.rekvira/rekvira` | Official EU regulation text with article and recital pinpoints | https://mcp.rekvira.com/mcp |
| `com.reliancetrenchless/catalogue` | Trenchless pipe-repair products with technical guides and comparisons | https://reliancetrenchless.com/mcp |
| `com.remotejobscenter/remote-jobs` | Current remote and work-from-home job listings | https://remotejobscenter.com/mcp |
| `com.remyresearch/ordering` | UAE research-use compound product catalogue with AED pricing | https://remyresearch.com/mcp |
| `com.rentalanalytics/rent-tools` | HUD fair market rents for US areas | https://rentalanalytics.com/mcp |
| `com.repoalerts/radar` | Rising GitHub repositories, trending projects and open-source alternatives | https://repoalerts.com/mcp |
| `com.reportgem/global-research` | Sell-side research reports, SEC filings, earnings calls and charts | https://www.reportgem.com/mcp |
| `com.researchcal/researchcal` | Economics, business and political science conference and paper deadlines | https://mcp.researchcal.com/mcp |
| `com.rezifi/jobs` | Open jobs on employer career sites, confirmed in last 3 days | https://api.rezifi.com/mcp |
| `com.ridgerunner/outdoor-gear` | Hunting, fishing, camping and outdoor gear product catalog | https://mcp.ridgerunner.com/mcp |
| `com.robbiegeorgephotography/naturepedia` | Naturepedia canonical resources and registries on nature | https://mcp.robbiegeorgephotography.com/mcp |
| `com.robinsaige/verifier` | Reliability verdicts and rankings for MCP registry servers | https://robinsaige.com/mcp |
| `com.rolefig/rolefig` | Current job openings and company hiring profiles published on rolefig | https://rolefig.com/mcp |
| `com.rolstonpaul/field-notes` | Rolston Paul field notes quoted word for word | https://rolstonpaul.com/mcp |
| `com.rottenads/offers` | Affiliate CPL/CPA offers in telehealth, finance and insurance verticals | https://rottenads.com/mcp |
| `com.roxyapi/docs` | RoxyAPI endpoints, parameters and SDK usage documentation | https://roxyapi.com/mcp/docs |
| `com.ryufin/stocks` | US stock research and financial history from SEC filings | https://ryufin.com/mcp |
| `com.saaskr/korean-saas-directory` | Korean SaaS services, agent-ready APIs and AI providers | https://saaskr.com/api/mcp |
| `com.saasthinktank/evidence` | Dated research findings comparing AI app builders on code export and backends | https://saasthinktank.com/mcp |
| `com.sakuraweb.yamagishi/physics-papers` | Japanese and English math-physics preprints with separator statements | https://yamagishi.sakuraweb.com/mcp/ |
| `com.salahflow/mcp` | Salah Flow prayer tracker facts, FAQ and guides | https://salahflow.com/mcp |
| `com.salsmart/grocery-prices` | Israeli supermarket branch prices, barcodes and offers in shekels | https://salsmart.com/mcp |
| `com.santismm/knowledge` | Agentic AI, enterprise AI patterns, governance essays and architectures | https://santismm.com/mcp |
| `com.satmarin/catalog` | Maritime VSAT spare parts, antenna fitment and supersession information | https://satmarin.com/mcp |
| `com.saveonphone/cell-phone-plan-comparison` | US cell phone plans, carrier costs, wireless news and switching guidance | https://saveonphone.com/mcp |
| `com.scanverity/public-market-discovery` | Polymarket prediction markets search by topic | https://scanverity.com/mcp-discovery |
| `com.scraperwatch/scraperwatch` | Comparisons of web scrapers, scraping APIs, proxies and RAG extractors | https://scraperwatch.com/mcp |
| `com.screenrove/screenrove` | Real SaaS product UI screenshots, flows, pricing pages and design guides | https://screenrove.com/mcp |
| `com.searchcode/mcp` | Source code, file trees and quality findings of public git repositories | https://api.searchcode.com/v1/mcp |
| `com.searchfragments/search-fragments` | Identifies films, songs, books and quotes from remembered fragments, verifies claims | https://searchfragments.com/api/mcp |
| `com.selfbadge/selfbadge` | Verified public profiles of people and organizations | https://selfbadge.com/mcp |
| `com.seniordognotes/pawline-pet-guides` | Pet and animal care guides plus care calculators | https://pawline-mcp.pawline.workers.dev/mcp |
| `com.senzing/mcp` | Senzing entity resolution docs, SDK reference, code examples and error codes | https://mcp.senzing.com/mcp |
| `com.sgpbusiness/singapore-entities-directory` | Singapore registered entities by name or UEN from ACRA open data | https://mcp.sgpbusiness.com/mcp |
| `com.shipshapedata/shipshape-data-docs` | Practical guides on data engineering and AI from Shipshape Data | https://shipshapedata.com/mcp/docs |
| `com.shrutikaushik/research` | Founder go-to-market guides and LinkedIn, Reddit, AI search statistics | https://shrutikaushik.com/mcp |
| `com.sigistry/plugin-catalog` | Claude Code plugins, skills and graded MCP server scorecards | https://sigistry.com/mcp |
| `com.signed/investors` | Public angel investor profiles by sector and check size | https://mcp.signed.com/investors |
| `com.siliconfriendly/directory` | Websites rated on AI-agent-friendliness | https://siliconfriendly.com/mcp |
| `com.simplecohortllc.bible/shepherd-bible-api` | Bible translations, books, chapters and verses | https://bible.simplecohortllc.com/mcp |
| `com.simplenpi/npi` | US healthcare provider NPI registry records and how to get an NPI | https://simplenpi.com/mcp |
| `com.sitepatent/directory` | Directory of software, SaaS and AI tools with alternatives and categories | https://sitepatent.com/api/mcp |
| `com.skaidigital/norwegian-companies` | Norwegian company registry data, annual accounts, groups and industry codes | https://tools.skaidigital.com/brreg/mcp |
| `com.skillmd/skillmd` | Registry of Agent Skills (SKILL.md) searchable by task | https://api.skillmd.com/mcp |
| `com.skipshit/mcp` | People contact and property records: phones, emails, addresses, relatives | https://mcp.skipshit.com/mcp |
| `com.smspva/docs` | SMSPVA API docs for SMS activation, number rental and private email | https://mcp.smspva.com/docs |
| `com.soc2compared/mcp` | SOC 2 compliance platform prices and audit firms comparison | https://soc2compared.com/mcp |
| `com.softwareengineeringprofessional/journeyman` | Grounded software development patterns with sources for aspiring engineers | https://journeyman.softwareengineeringprofessional.com/api/mcp |
| `com.songstoyoureyes/catalog` | Production music cues by mood, runtime, versions and cue sheet clearance data | https://mcp.songstoyoureyes.com/mcp |
| `com.soracom/knowledge` | SORACOM IoT documentation, guides, FAQ and API references | https://knowledge-mcp.soracom.com |
| `com.southlondonscientific/hermes` | UK air quality readings, trends, monitors and WHO guideline checks | https://hermes.southlondonscientific.com/mcp |
| `com.srclog/srclog` | GitHub repositories, similar projects, topics and top developers rankings | https://srclog.com/mcp |
| `com.stackduke/radar` | Tool list changes in official vendor MCP servers | https://radar.stackduke.com/mcp |
| `com.stackgems/catalog` | Reviewed developer tools with verdicts, caveats and alternatives | https://stackgems.com/api/mcp |
| `com.stimulsoft/docs` | Stimulsoft Reports and Dashboards official documentation across platforms | https://devs.stimulsoft.com/mcp-docs |
| `com.stockcake/stockcake` | CC0 public-domain AI images with previews, metadata and license | https://stockcake.com/api/mcp |
| `com.stringspec/mcp` | Lab-measured tennis string specifications, comparisons and recommendations | https://stringspec.com/mcp |
| `com.struxurenorcal.walnbot/struxure-knowledge-base` | StruXure NorCal pergola services and FAQ answers | https://walnbot.struxurenorcal.com/mcp/information |
| `com.submitmystartup/mcp` | Startup launch directories, costs and submission results | https://submitmystartup.com/mcp |
| `com.subtensor/reference` | Subtensor blockchain pallets, events, calls, storage and Bittensor concepts | https://subtensor.com/mcp |
| `com.sunsetmixing/site-mcp` | Sunset Mixing public pages and products with source URLs | https://sunsetmixing.com/mcp |
| `com.supercyclehq/supercycle` | AI buildout stocks, exposure scores, capex and data center projects | https://supercyclehq.com/mcp |
| `com.superhotgeo/superhotgeo` | Superhot rock geothermal wells, projects and research library | https://superhotgeo.com/mcp |
| `com.svgrid/svgrid` | SvGrid Svelte 5 data grid documentation, API reference and examples | https://mcp.svgrid.com/mcp |
| `com.symbaiex.www/docs` | SYMBaiEX developer and agent documentation | https://www.symbaiex.com/api/docs/mcp |
| `com.symbaiex.www/evidence` | Normalized public evidence documents, news and change events | https://www.symbaiex.com/api/agent/mcp |
| `com.szymonpaluch/mcp` | Blog posts on agentic engineering and AI, Claude certification practice questions | https://szymonpaluch.com/mcp |
| `com.talval/research` | Stock valuation verdicts, fair values and superinvestor 13F holdings | https://talval.com/mcp |
| `com.tariffschart/tariffschart` | US HTS tariff duty rates and import duty review with official sources | https://mcp.tariffschart.com/mcp |
| `com.tensorust/mcp` | Rust crate download stats, LLM API prices and explainers | https://mcp.tensorust.com/mcp |
| `com.testedmcp/testedmcp` | Test scores, evidence and deprecation status of MCP servers | https://testedmcp.com/mcp |
| `com.tgboard/catalog` | Directory of 100k+ Telegram channels, bots and groups with rankings | https://tgboard.com/mcp/ |
| `com.thaiapp/bible-app` | Thai and English Bible text, scripture search and daily verse | https://thaiapp.com/bible-app/mcp |
| `com.thailandfunexperiences/thailand-fun-experiences` | Phuket activities with live weather, sea conditions and transfer times | https://thailandfunexperiences.com/mcp |
| `com.thaiprops/mcp` | Thailand real estate property and project listings | https://www.thaiprops.com/mcp |
| `com.theaiintegrationhub/use-cases` | Practical AI use cases by industry and workflow | https://www.theaiintegrationhub.com/mcp |
| `com.theaimeters/theaimeters` | AI impact metrics with methodology and cited sources | https://www.theaimeters.com/mcp |
| `com.theartillerist/artist-intelligence` | Art research articles by category | https://theartillerist.com/mcp |
| `com.thecastlemap/castles` | Castles, fortresses, palaces and ruins worldwide with locations and fame rankings | https://thecastlemap.com/mcp |
| `com.thecrowdspace/crowdspace` | Crowdfunding and P2P lending platforms, market data, regulation and news | https://mcp.thecrowdspace.com/mcp |
| `com.thefilmmap/filming-locations` | Filming locations of films and TV, and settings of games and anime | https://thefilmmap.com/mcp |
| `com.thegastrologer/clinical` | Physician-reviewed gastroenterology teaching modules, evidence and claim verification | https://thegastrologer.com/api/mcp |
| `com.thegtmdirectory/mcp` | Go-to-market software tools with vendor-verified pricing, API and MCP facts | https://thegtmdirectory.com/api/mcp |
| `com.theholisticcare/open-mindfulness` | Mindfulness practices, games, research summaries and glossary terms | https://mcp.theholisticcare.com/mcp |
| `com.thenotetakers/reviews` | Reviews of AI meeting notetaker tools | https://thenotetakers.com/api/mcp |
| `com.theoddsgap/answers` | Sports betting odds, game lines, futures and past game results | https://theoddsgap.com/assistant/v1/mcp |
| `com.theonchaindiary/onchain-diary` | Web3 security education articles and glossary | https://theonchaindiary.com/api/mcp |
| `com.theprivateclubs/private-clubs` | Private membership clubs worldwide with locations and waitlist status | https://www.theprivateclubs.com/api/mcp |
| `com.therenovationroom/renovation-room` | Chicagoland renovation contractors and fact-checked home renovation answers | https://therenovationroom.com/wp-json/trr-mcp/v1/mcp |
| `com.theresanaiforthat/taaft` | Directory of AI tools, AI models, task categories and partner deals | https://theresanaiforthat.com/mcp-server/ |
| `com.thestackunderflow/datum-property` | FEMA flood zones, hazard history and demographics for US addresses | https://mcp.thestackunderflow.com/mcp/property |
| `com.thingstodoapi/events` | Local events: shows, markets, classes with times and venues | https://api.thingstodoapi.com/mcp |
| `com.thisisdelightful/games-research-starter-pack` | Curated sources, markets and trends for video games industry research | https://games.thisisdelightful.com/mcp |
| `com.tickerfacts/fundamentals` | SEC EDGAR fundamentals, insider filings and economic context for US companies | https://tickerfacts.com/mcp |
| `com.tileio/tileio` | Web design layers library with build prompts for HTML and frameworks | https://tileio.com/api/mcp |
| `com.tippingrules/tipping-rules` | Travel tipping customs and rules for 140 destinations | https://www.tippingrules.com/api/mcp |
| `com.tomesphere/tomesphere` | 8.5M scientific papers with summaries, citations and full text | https://mcp.tomesphere.com/api/mcp |
| `com.topologyindex/topology-index` | Multi-agent LLM topology patterns, aliases, sources and starter formations | https://topologyindex.com/mcp |
| `com.tppflow/warn-act-layoffs` | US WARN Act mass layoff notices by state, employer and date | https://mcp.tppflow.com/mcp |
| `com.tradingcardvaluechecker/site` | Trading Card Value Checker dataset rows with statistics and cited provenance | https://tradingcardvaluechecker.com/mcp |
| `com.tradoshi/rankings` | Sourced rankings of trading schools and prop firms with market figures | https://tradoshi.com/mcp |
| `com.transcriptout/youtube-transcript-and-youtube-search` | YouTube video transcripts, metadata, channel and playlist search | https://api.transcriptout.com/mcp |
| `com.triremes/triremes` | Problems people have and business websites with SEO gaps | https://triremes.com/mcp |
| `com.truepeptidesource/peptides` | Peptide reference: published dose ranges, protocols, comparisons and reconstitution math | https://truepeptidesource.com/mcp |
| `com.tryafterlight.commons/afterlight-commons` | Agent-written records of errors, fixes, gotchas and dead ends | https://commons.tryafterlight.com/mcp |
| `com.tulugar/tulugar` | Paraguay and Latin America real estate listings, projects and agencies | https://tulugar.com/api/mcp |
| `com.ultimatesweepers/sweepstakes` | Free-to-enter US sweepstakes by prize, end date and state | https://ultimatesweepers.com/mcp |
| `com.umesh-malik/blog-mcp` | Blog posts on Claude Code, MCP, AI search and LLM engineering | https://umesh-malik.com/mcp |
| `com.unifiedchambers/legal` | Indian debt recovery law, DRT benches, SARFAESI periods and bare acts | https://www.unifiedchambers.com/mcp |
| `com.unitebr.research/benchmark` | Brazil Black Friday creative benchmarks with chart data and citations | https://research.unitebr.com/mcp |
| `com.unlistedhomes/unlisted` | Residential properties not currently listed for sale | https://api.unlistedhomes.com/mcp |
| `com.upravio/public-knowledge` | Upravio contract-management features, limits and pilot guides | https://app.upravio.com/api/public/mcp |
| `com.usanaru/schools` | US boarding schools for international students, SEVP certification and visa guides | https://usanaru.com/mcp |
| `com.usethisskill/skills` | Safety-scanned agent skills for Claude, Codex and Cursor | https://usethisskill.com/mcp |
| `com.usprimerealty/florida-home-search` | Florida property listings, new construction and real estate guides | https://api.usprimerealty.com/mcp |
| `com.usvipublicrecords/documents` | US Virgin Islands laws, court records, audits, hearings and reports | https://mcp.usvipublicrecords.com/mcp |
| `com.usvipublicrecords/newspapers` | US Virgin Islands newspaper pages from 1865 to 2001 | https://newspapers-mcp.usvipublicrecords.com/mcp |
| `com.valksor/norse` | Old Norse words, senses, declensions and conjugations from Wiktionary | https://norse.valksor.com/mcp |
| `com.vanetools/vanetools-directory` | Directory of AI tools, MCP servers, prompts, skills, plugins and learning resources | https://vanetools.com/mcp |
| `com.vectorpanda/docs` | Vector Panda API, pricing, storage tiers and benchmarks documentation | https://www.vectorpanda.com/mcp |
| `com.vedaword/library` | Sanskrit scripture verses: Mahabharata, Upanishads, Gita, with terms and calendar | https://mcp.vedaword.com |
| `com.veritula/veritula` | Ideas, criticisms and discussions posted on Veritula | https://veritula.com/mcp |
| `com.veterans-rights/bva-corpus` | Board of Veterans' Appeals decisions, presumptive conditions and VA claim process | https://www.veterans-rights.com/api/mcp |
| `com.vibenate/vibenate` | Web services for agents with MCP, CLI and API connection guides | https://vibenate.com/mcp |
| `com.vidkraken/vidkraken-docs` | Vid Kraken API docs, guides and pricing | https://vidkraken.com/api/mcp-docs/mcp |
| `com.vikenda/events` | Verified events and venues in Niagara-on-the-Lake, Ontario | https://api.vikenda.com/mcp |
| `com.vitextra/knowledge-base` | Vitextra docs, product pages, how-to guides and FAQ | https://vitextra.com/mcp |
| `com.vocenya/docs` | Vocenya AI receptionist API docs and endpoints | https://vocenya.com/mcp/docs |
| `com.vocenya/site` | Vocenya plans, products, industries and guides | https://vocenya.com/mcp/site |
| `com.wadifa-info.www/morocco-public-jobs` | Moroccan public-sector recruitment exams, past papers, salaries and holidays | https://www.wadifa-info.com/mcp |
| `com.warreandvavasour/workspacealberta` | CanadaBuys and Alberta government tenders and contract opportunities | https://elbowsupknivesout.warreandvavasour.com/mcp |
| `com.websitelaunches/launch-record-lookup` | Public launch record and owner verification for a website domain | https://websitelaunches.com/mcp |
| `com.websupergoo/docs` | ABCpdf, ImageGlue, WordGlue and ABCocr .NET documentation and API reference | https://www.websupergoo.com/mcp |
| `com.whatmount/lookup` | TV and monitor VESA mount patterns, dimensions and weights per model | https://whatmount.com/mcp |
| `com.whiteautoandmedia/catalog` | GM infotainment, cluster and electronics module parts catalog | https://www.whiteautoandmedia.com/wp-json/ucp/v1/mcp |
| `com.wiagil/wiagil` | Cities, nearby hotels and places, country travel basics, exchange rates | https://mcp.wiagil.com/mcp |
| `com.wiastandards/standards` | WIA voluntary standards catalog and specification files | https://mcp-standards.wiastandards.com/mcp |
| `com.wiastandards/wisdom` | Curated documents on nine traditions of thought in English and Korean | https://mcp-wisdom.wiastandards.com/mcp |
| `com.wikexa/knowledge` | Wikipedia, Wikidata, Wiktionary facts, definitions and academic paper metadata | https://wikexa.com/mcp |
| `com.wikimedia.enterprise/docs` | Wikimedia Enterprise API guides and endpoint reference | https://enterprise.wikimedia.com/mcp |
| `com.wikitolica/mcp` | Catholic encyclopedia in Spanish: doctrine, saints, liturgy and history | https://www.wikitolica.com/mcp |
| `com.windowsforum/mcp-server` | WindowsForum threads, Windows news, tutorials and Microsoft KB information | https://mcp.windowsforum.com/ |
| `com.workers-rights/employment-law` | US employment law rulings, employer track records, worker rights and EEOC process | https://www.workers-rights.com/api/mcp |
| `com.workinsiders/directory` | Recruiting, HR and sales tools with prices and alternatives | https://workinsiders.com/mcp |
| `com.x402broker/x402-broker` | Catalog of MCP and x402 paid tools by capability | https://x402broker.com/mcp |
| `com.xcopybook/xcopybook` | XCOPYBook chapters, collector profiles and XCOPY crypto art works registry | https://xcopybook.com/mcp |
| `com.xposedornot/xposedornot` | Known data breaches and whether emails or domains were exposed | https://api.xposedornot.com/mcp |
| `com.yedabase/yedabase` | Investor records: family offices, VCs, funds of funds and decision-makers | https://yedabase.com/mcp |
| `com.yorehistory/places` | Sourced studies of what towns were like in specific decades | https://yorehistory.com/mcp |
| `com.youanai/docs` | Youanai products, pricing, industries and guides | https://youanai.com/api/mcp/docs |
| `com.zeltser/website-search` | Lenny Zeltser security articles, incident response templates and writing guidelines | https://website-mcp.zeltser.com/mcp |
| `com.zephior/discovery` | Published public tender notices across countries and sectors | https://mcp.zephior.com/mcp |
| `com.zoningverdict/mcp` | US municipal zoning district rules with ordinance citations | https://zoningverdict.com/api/mcp?ref=mcp-registry |
| `de.arnekellmann/consulting` | Architecture consulting documents and services in English and German | https://arnekellmann.de/mcp |
| `de.ausschreibungsagenten/tender-search` | Public procurement tenders from Germany, the EU and the UK | https://api.ausschreibungsagenten.de/mcp |
| `de.bluraysuchmaschine/suche` | Blu-ray and 4K UHD movie details, cast and categories | https://mcp.bluraysuchmaschine.de/mcp |
| `de.brunosan/arxiv` | AI and machine learning arXiv papers, citations, authors and entity trends | https://arxiv.mcp.brunosan.de/mcp |
| `de.bundeswehr-dienstgrade/mcp` | German armed forces ranks, equivalents and base pay | https://www.bundeswehr-dienstgrade.de/mcp |
| `de.drgsystem/medical-catalogs` | German medical coding catalogs: ICD-10-GM, OPS, DRG, PEPP, GOAe | https://www.drgsystem.de/mcp |
| `de.mechoulam/cannabis-evidence` | GRADE-rated clinical evidence on cannabis as medicine by indication | https://mechoulam.de/mcp |
| `de.my-flohmarkt/flea-market-catalog` | German flea market events by city, date and radius | https://mcp.my-flohmarkt.de/mcp |
| `de.nomado24/jobs` | Remote and hybrid job postings in Germany and EU | https://api.nomado24.de/api/public/v1/mcp |
| `de.overfit/overfit` | German and EU public tenders and procurement law rules | https://www.overfit.de/mcp |
| `de.rechtsklar24/rechtsklar24` | German e-commerce law obligation dates and fine ceilings | https://rechtsklar24.de/mcp?src=mcp |
| `de.stellenonline/jobsearch` | Current German job listings from stellenonline.de | https://www.stellenonline.de/mcp |
| `de.vergabeweiser/tenders` | German public tenders, contract awards, winners and market statistics | https://vergabeweiser.de/mcp |
| `dev.ad-radar/ad-radar` | High-spend Meta ads with hooks, scripts and winning patterns | https://app.ad-radar.dev/api/mcp |
| `dev.agentpapers/agent-papers` | Companies selling identity, phone, email and payment services to AI agents | https://agentpapers.dev/api/mcp |
| `dev.agentsurface/docs` | Guide to making websites, APIs and CLIs work with AI agents | https://agentsurface.dev/mcp |
| `dev.aieph/aieph` | Shared cache of programming errors, library answers and fixes | https://aieph.dev/mcp |
| `dev.bitbybit/cad` | Bitbybit 3D parametric CAD API reference and examples | https://mcp.bitbybit.dev/mcp |
| `dev.carbonitex.ecogame/ecocarbonwiki` | Eco game wiki: items, recipes, skills, crafting materials | https://ecogame.carbonitex.dev/mcp |
| `dev.classifier/docs` | classifier.dev API reference, benchmarks and guides | https://classifier.dev/mcp/docs |
| `dev.contextfetch/mcp` | Web search results and pages as LLM-ready Markdown | https://api.contextfetch.dev/mcp |
| `dev.cz-agents/ares` | Czech and Slovak company registry records, owners and VAT status | https://ares.cz-agents.dev/mcp |
| `dev.cz-agents/eu-registry` | EU company registry records and VAT validation across 16 countries | https://eu-registry.cz-agents.dev/mcp |
| `dev.devplane/devplane-site` | DevPlane public pages, FAQ and product comparisons | https://devplane.dev/api/mcp |
| `dev.eased/eased` | Eased motion-first React components for shadcn with docs | https://eased.dev/api/mcp |
| `dev.farmjs/docs` | Farm.js documentation, code examples and config options | https://mcp.farmjs.dev/mcp |
| `dev.foundry44/components` | Animated UI component library with install steps for any stack | https://foundry44.dev/mcp |
| `dev.frontmcp.mcp/frontmcp` | FrontMCP framework docs, APIs, examples and upgrade guides | https://mcp.frontmcp.dev/ |
| `dev.getbureau/about` | Bureau self-hosted AI agent office: FAQ, roadmap and install steps | https://www.getbureau.dev/mcp |
| `dev.getwork/jobs` | Developer jobs by stack, level, remote and salary insights | https://getwork.dev/mcp |
| `dev.ioconnex/search-mcp` | Web search results and page text | https://search.ioconnex.dev/mcp |
| `dev.launchdog/public` | Product launches, past winners and upcoming launch weeks on Launchdog | https://launchdog.dev/mcp/public |
| `dev.mcpnav/directory` | Directory of MCP servers with install configs | https://mcp.mcpnav.dev/mcp |
| `dev.modelmarket/emporion` | EU VAT, EORI, LEI, sanctions, company and ECB rate lookups | https://modelmarket.dev/tools/mcp/emporion |
| `dev.openplanr/docs` | OpenPlanr documentation and course pages | https://openplanr.dev/docs/mcp |
| `dev.pages.canmyaiuse/mcp` | Live public MCP servers by need, auth and status, per app | https://canmyaiuse.pages.dev/mcp |
| `dev.pages.ifta-calculator/ifta` | US and Canadian IFTA fuel-tax rules, rates and quarterly estimates | https://ifta-calculator.pages.dev/mcp |
| `dev.pages.jp-election-mcp/jp-election-discovery` | Japanese election data and official source routes | https://jp-election-mcp.pages.dev/mcp |
| `dev.plugandship/plugandship-mcp` | MCP servers, agent skills and coding-agent plugins with trending lists | https://plugandship.dev/mcp |
| `dev.plugrail/jp-corporate` | Japanese corporations and invoice registration numbers from tax agency | https://jp-corporate.plugrail.dev/mcp |
| `dev.plugrail/jp-recall` | Japanese consumer product recalls from Consumer Affairs Agency | https://jp-recall.plugrail.dev/mcp |
| `dev.promplate/hmr` | Python hmr hot reload library docs, source and tests | https://pyth-on-line.promplate.dev/hmr/mcp |
| `dev.q4a/board` | Questions and answers posted by AI agents | https://q4a.dev/mcp |
| `dev.refnusa/refnusa` | Indonesia holidays, minimum wages, regions, postal codes, tax and statistics | https://refnusa.dev/mcp |
| `dev.rmcp/rmcp` | Index of remote MCP servers and their tools | https://rmcp.dev/mcp |
| `dev.rossdata/data-dictionary` | Ross ERP 8.0 database schema, menus and program catalog | https://mcp.rossdata.dev/mcp |
| `dev.shirabe/hub` | Japanese calendar, address normalization and corporate number registry data | https://shirabe.dev/mcp |
| `dev.sipflow/sipflow` | SIP, VoIP and telecom docs, RFCs, response codes and headers | https://mcp.sipflow.dev/mcp |
| `dev.sitemcp/site-mcp` | Pages of a public website searchable and readable | https://sitemcp.dev/sitemcp.dev |
| `dev.skillagent/skills` | AI agent skills, rules files and MCP servers indexed from GitHub | https://skillagent.dev/mcp |
| `dev.spritefetch/spritefetch` | Free CC0 2D sprite sheets and tilesets for games | https://api.spritefetch.dev/mcp |
| `dev.starwell/world-data-statistics` | Official statistics from FRED, Eurostat, ECB, World Bank and OECD | https://starwell.dev/api/starwell/mcp |
| `dev.stepcode/stepcode` | How-to pages for data analyses by tool | https://stepcode.dev/api/mcp |
| `dev.stitchapi/docs` | StitchAPI documentation | https://stitchapi.dev/api/mcp |
| `dev.suzuri/mcp` | Japan government white papers on policy and national statistics | https://suzuri.dev/mcp |
| `dev.svelte/mcp` | Official Svelte 5 and SvelteKit documentation | https://mcp.svelte.dev/mcp |
| `dev.swiftskills/catalog` | Agent skills, MCP servers and rules for Swift and iOS development | https://swiftskills.dev/mcp |
| `dev.toolpin/toolpin` | MCP server reachability, advertised tools and tool definition changes | https://toolpin.dev/mcp |
| `dev.upfork/upfork` | React and Tailwind CSS components, landing pages and developer lessons | https://upfork.dev/mcp |
| `dev.urantia/urantia-papers` | Urantia Papers text with Bible and other text cross-references | https://api.urantia.dev/mcp |
| `dev.workers.bhazarstudio.datoqa/historical-exchange-rates` | ECB historical daily exchange rates since 1999 with source evidence | https://datoqa.bhazarstudio.workers.dev/mcp/fx |
| `dev.workers.cybermax-tools.cybermax/commonkite` | Openly licensed and public-domain images with license and credit lines | https://commonkite.cybermaxtools.com/mcp?via=mcp-registry |
| `dev.workers.cybermax-tools.cybermax/dutyfinch-chatgpt` | US HTS tariff codes, duty rates and Section 301 China status | https://gpt-dutyfinch.cybermaxtools.com/mcp?via=mcp-registry |
| `dev.workers.flowfresh.ff-sa-fruit-data/sa-fruit-reference-data` | South African export fruit seasons, specs and destination market access | https://ff-sa-fruit-data.flowfresh.workers.dev/mcp |
| `dev.workers.rasczak-commons.rasczak-agent-service/agent-service` | Free decision methods and vendor-evaluation work packs | https://rasczak-agent-service.rasczak-commons.workers.dev/mcp |
| `dev.workers.slawian.agent-commons/agent-commons` | Public agent questions and sourced findings from Agent Commons | https://agent-commons.slawian.workers.dev/mcp |
| `dev.wraps/docs` | Wraps documentation for email on AWS SES | https://wraps.dev/mcp |
| `directory.neeed/listings` | Directory of software products and tools | https://neeed.directory/api/mcp |
| `directory.pwa/guichet` | Catalog of progressive web apps | https://pwa.directory/mcp |
| `dk.humanified/trinity-research` | Fact-check verdicts for claims against live web sources | https://trinity-v2-mcp.fly.dev/mcp |
| `dk.leadstrategist/cvr` | Danish CVR company data and annual-report financials | https://leadstrategist.dk/mcp |
| `dk.sortition/sortition-knowledge` | Research on sortition, citizens' assemblies and democratic reform | https://mcp.sortition.dk |
| `dk.ullasopskrifter/recipes` | Danish recipes, ingredients and recipe categories | https://ullasopskrifter.dk/mcp |
| `do.sysproperties/servicenow-properties` | Plain-English explanations of ServiceNow system properties | https://myhvtuybcqdltewbmkng.supabase.co/functions/v1/mcp |
| `eco.reeco/reecopedia` | EU textile sustainability law: ESPR, DPP, CSRD, CBAM with cited source text | https://ia.reeco.eco/mcp |
| `ee.city24/real-estate` | Estonia real estate listings with geo filters and property details | https://mcp.city24.ee/_mcp |
| `ee.kand/muhu` | Muhu island Estonian dialect dictionary, texts and audio sources | https://kand.ee/muhu/mcp |
| `energy.mentor/mentor-energy` | Energy industry career courses, lessons and articles | https://mentor.energy/api/mcp |
| `estate.guthmann/mcp` | Berlin boroughs, neighborhoods and real estate market data | https://mcp.guthmann.estate/mcp |
| `eu.casanest/catalogue` | Portugal property listings and INE housing price statistics | https://casanest.eu/mcp |
| `eu.cuttingtoolsai/reference` | Carbide insert grade and material cross-references, turning speeds and feeds | https://cuttingtoolsai.eu/mcp |
| `eu.cuttingtoolsai/xref` | Cross-brand carbide grade equivalents from manufacturer charts | https://cuttingtoolsai-mcp.memmizgezgin.workers.dev |
| `eu.gamedeal/public` | PC game store offers and recorded price history | https://gamedeal.eu/api/mcp |
| `eu.icos-cp/icos` | ICOS greenhouse-gas observations from atmosphere, ocean and ecosystem stations | https://mcp.icos-cp.eu/mcp |
| `eu.janbrennenstuhl/site` | Essays on application security, identity and agent identity | https://mcp.janbrennenstuhl.eu/mcp |
| `eu.madeinro/rotv-mcp` | Romanian TV channel listings, prime time and program search | https://tv.madeinro.eu/mcp |
| `eu.muralists/directory` | Professional muralists and street artists in Europe | https://mcp.muralists.eu/mcp |
| `eu.obato/obato-mcp` | Boats for sale or rent in Europe, marinas and boat market pricing | https://obato.eu/mcp |
| `eu.paymentslaw/legislation` | EU payments legislation: PSD2, PSD3, PSR, DORA provisions and definitions | https://mcp.paymentslaw.eu/mcp/v1 |
| `eu.regulatoryai/sovereign-ai-act-mcp` | EU AI Act articles, risk classification and compliance deadlines | https://www.regulatoryai.eu/mcp |
| `eu.scopematch/labs` | Accredited testing labs and their accreditation scope by standard | https://scopematch.eu/mcp |
| `eu.tech.funding/funding-explorer` | European tech funding rounds, companies, investors and exits | https://funding.tech.eu/api/mcp |
| `eu.vokko/vokko` | Which web hosts support MCP, x402 and other agent protocols | https://www.vokko.eu/api/v1/mcp |
| `eu.voxs/voxcars-pt` | Portugal used-car listings, price statistics and market articles | https://www.voxcars.pt/api/mcp |
| `eu.voxs/voxhouses-pt` | Portugal property listings, market statistics and neighbourhood guides | https://www.voxhouses.pt/api/mcp |
| `eu.voxs/voxjobs-pt` | Portugal job listings, salary statistics and employers | https://www.voxjobs.pt/api/mcp |
| `events.long/long-events` | Events, conference weeks, venues and cities worldwide | https://long.events/functions/v1/mcp-server/mcp |
| `events.thisweekend/this-weekend` | Festivals, shows and exhibitions in South Korea by date | https://thisweekend.events/mcp |
| `expert.ptl/knowledge` | PTL services, case studies and professional evidence from its websites | https://mcp.ptl.expert/mcp |
| `fi.sukuk/sukukfi` | SukukFi vault metrics, contracts and documentation | https://mcp.sukuk.fi/mcp |
| `film.mcp/directory` | MCP servers for AI filmmaking with install configs and capabilities | https://mcp.film/mcp |
| `food.strega/strega` | Recipes with ingredient amounts, scalable servings and diets | https://strega.food/mcp |
| `foundation.finance/finance-foundation` | Financial entities with LEI, ISIN, FIGI identifiers, markets, funds and graph | https://finance.foundation/mcp |
| `fr.bestwestern.mcp-hotel/hotels` | Best Western hotel descriptions, addresses, amenities and photos | https://mcp-hotel.bestwestern.fr/mcp |
| `fr.carhunt/carhunt` | French used-car listings across marketplaces, price estimates and market stats | https://api.carhunt.fr/mcp |
| `fr.miramo/mcp` | French rent caps, tense zones and rental law for landlords | https://mcp.miramo.fr/mcp |
| `fr.missionmuseaux/annonces` | Lost and found pets, adoptions, breeds and advice in France | https://missionmuseaux.fr/mcp |
| `fr.symone/symone-docs` | SYMONE documentation: service, prices, public API and MCP servers | https://symone.fr/docs/mcp |
| `fun.film.splice/splice-docs` | Splice agent docs, models, prices and templates | https://splice.film.fun/api/mcp/docs |
| `fyi.bsp/bot-space` | Bot-written fixes, wiki and forum threads shared among AI agents | https://bsp.fyi/mcp |
| `fyi.clearmarket/clearmarket` | Prediction market events, resolution clarity and cross-venue links | https://api.clearmarket.fyi/mcp |
| `fyi.levels/levels-fyi` | Tech salary, level and compensation data by company and role | https://mcp.levels.fyi/ |
| `garden.stanislav.svelte-llm/svelte-llm-mcp` | Svelte 5 and SvelteKit documentation sections | https://svelte-llm.stanislav.garden/mcp/mcp |
| `gg.dinogame/games` | Free browser games and Chrome Dino gaming guides | https://dinogame.gg/mcp |
| `gift.dhamma/pali-canon` | Pali Canon texts with English and Russian translations | https://api.dhamma.gift/mcp |
| `glass.cocktail/cocktail-glass` | 500 cocktail recipes searchable by name and ingredient | https://cocktail.glass/mcp |
| `global.insurers/directory` | Licensed insurers worldwide by country, class, group and regulator | https://insurers.global/mcp |
| `global.uain/network` | United AI Network public research tasks and contributions | https://uain.global/mcp |
| `goog.workspace-developer/developer-tools` | Official Google Workspace developer documentation | https://workspace-developer.goog/mcp |
| `gr.jobily/jobs` | Greek job listings by role, location, sector and company | https://jobily.gr/mcp |
| `homes.socials/socials-homes-docs` | Socials Homes FAQ, pricing and housing guides for moving abroad | https://www.socials.homes/mcp/docs |
| `hr.inmar/business-knowledge` | INMAR services, projects and business information | https://inmar.hr/mcp |
| `il.co.checko/docs` | Hebrew travel insurance guides and FAQ | https://checko.co.il/mcp/docs |
| `il.co.finly/public-knowledge` | Israeli mortgage knowledge with sources and guides | https://finly.co.il/mcp |
| `il.co.foodiepedia/prices` | Grocery prices by barcode across Israeli supermarket chains | https://foodiepedia.co.il/api/mcp/ |
| `il.co.makore.www/makore` | Upcoming public events in Israel by date, city and category | https://www.makore.co.il/api/mcp |
| `il.co.mamachoice/guides` | Hebrew baby product buying guides | https://mamachoice-mcp.ohadf1976.workers.dev/mcp |
| `il.co.sabag3d/studio` | Sabag 3D Studio services, past projects, products and FAQ | https://sabag3d.co.il/mcp |
| `in.dalalos/mcp` | Indian NSE/BSE stock filings, financials and FII flows | https://mcp.dalalos.in/mcp |
| `in.nebulatech/nebula` | Nebula B2B digital marketing services and AI search answers | https://www.nebulatech.in/_functions/mcp |
| `in.sambodh-ias/upsc-prep` | UPSC study material, previous-year questions and current affairs | https://api.sambodh-ias.in/mcp |
| `in.therapistsnearme/directory` | Credential-verified therapists in India by specialty | https://mcp.therapistsnearme.in/api/mcp |
| `info.astroway/docs` | AstroWay API guides, endpoints and credit prices | https://mcp.astroway.info/mcp/docs |
| `info.henryknows/henryknows` | F-1 and J-1 student immigration rules with citations | https://henryknows.info/mcp |
| `info.vetclinic/directory` | US veterinary specialty clinics, procedure articles and cost estimates | https://vetclinic.info/mcp |
| `info.workingproxysites/provider-directory` | Proxy providers, published prices and MCP integrations | https://workingproxysites.info/api/mcp |
| `ink.loreboard/loreboard` | Curated Disney Lorcana trading card game resources and change history | https://loreboard.ink/mcp |
| `insure.spot/insurance-research` | Commercial insurance provider comparisons, reviews and requirements | https://spot.insure/mcp |
| `investments.stein/mcp` | Market state classifications, economic calendar and trading research | https://stein.investments/mcp |
| `io.4dayweek/jobs` | Reduced-hours jobs and employers: four-day weeks and flexible schedules | https://4dayweek.io/api/mcp |
| `io.agentage/find-mcp` | Directory of 17,000 MCP servers with trust grades | https://catalog.agentage.io/mcp |
| `io.agentropolis/agentropolis` | Index of MCP servers, paid APIs and A2A agents | https://agentropolis.io/api/mcp |
| `io.arxo/cnaf` | French family benefit rules from CNAF with sources | https://mcp.arxo.io/mcp/cnaf |
| `io.arxo/code-civil` | French Civil Code rules with legal grounds | https://mcp.arxo.io/mcp/code-civil |
| `io.arxo/fide-chess` | FIDE Laws of Chess 2023 rules answered with grounds and source text | https://mcp.arxo.io/mcp/fide-chess |
| `io.arxo/picc` | UNIDROIT Principles 2016 contract law rules with source text | https://mcp.arxo.io/mcp/picc |
| `io.aviationresources/aviation-resources` | FAA handbooks, advisory circulars and airman certification standards | https://api.aviationresources.io/mcp |
| `io.banksapi/docs` | BANKSapi open banking developer docs and OpenAPI specs | https://banksapi.io/docs-mcp |
| `io.blockrazor/docs` | BlockRazor documentation for fast blockchain transactions | https://mcp.blockrazor.io/docs |
| `io.capawesome/capacitor-mcp` | Capacitor documentation, plugin list and blog posts | https://capacitor-mcp.capawesome.io/mcp |
| `io.capawesome/ionic-framework-mcp` | Ionic Framework documentation, components, usage examples and blog posts | https://ionic-framework-mcp.capawesome.io/mcp |
| `io.capawesome/mcp` | Capawesome documentation, guides and blog | https://mcp.capawesome.io/mcp |
| `io.carchat/inventory` | Live US dealership car inventory and market price statistics | https://carchat.io/mcp |
| `io.crela/mcp` | Reviewed software, apps and games on Crela marketplace | https://crela.io/mcp |
| `io.ddx.pg/archive` | PostgreSQL mailing lists since 1991 linked to commits, code and docs | https://pg.ddx.io/mcp |
| `io.dealscanner/dealscanner` | Real estate investment deals, sold comps and top investing areas | https://mcp.dealscanner.io/mcp |
| `io.defianceinternational/storefront` | Research-use peptide supplier catalog, sequences, evidence and COA verification | https://defianceinternational.io/mcp |
| `io.developerhub/docs` | DeveloperHub product documentation | https://docs.developerhub.io/mcp |
| `io.disdex/discord-servers` | Public Discord servers by topic, language, size and growth | https://disdex.io/mcp |
| `io.ecfr/ecfr` | US Code of Federal Regulations text with citations | https://ecfr.io/mcp |
| `io.ecfr/uscode` | US Code federal statutes text with citations | https://uscode.ecfr.io/mcp |
| `io.founderventures/founder-ventures` | Bootstrapped B2B SaaS founder library and European founder events | https://founderventures.io/api/mcp |
| `io.foundplay/foundplay` | Directory of free browser games including AI-made games and fan ports | https://foundplay.io/mcp |
| `io.fusionauth/mcp-docs` | FusionAuth documentation and technical answers | https://ai.fusionauth.dev/mcp/docs |
| `io.github.0design/qfactory` | Verified catalog of agent workflows and components with schemas | https://qfactory.io/api/mcp |
| `io.github.0xkayser/vaultvision` | Hyperliquid vault records, risk scores, rankings and TVL | https://vaultvision.tech/mcp |
| `io.github.1nzpainter/painting-lessons` | Transcribed painting lessons with video timestamps | https://mypaintingclub.com/kb/mcp |
| `io.github.99darwin/nexus` | Deduplicated AI industry news by vertical and event type | https://nexus.carapace.bot/mcp |
| `io.github.a-church-ai/church` | Songs, lyrics, theology and writings of an AI sanctuary | https://achurch.ai/mcp |
| `io.github.aadarshvelu/hirehouse-mcp` | Live public job listings on HireHouse | https://hirehouse.xyz/mcp |
| `io.github.aanari/loacare-healthcare-pricing` | US hospital prices, CPT codes, providers and healthcare cost estimates | https://www.loacare.com/api/mcp |
| `io.github.abasmartinc/apiempresas` | Spanish company records, BORME acts, directors, risk and public tenders | https://apiempresas.es/api/mcp |
| `io.github.ABTdomain/domainkits-mcp` | Registered, expired, aged and for-sale domains, WHOIS, DNS and backlinks | https://api.domainkits.com/v1/mcp |
| `io.github.ADahling/builders-prompt-library` | Graded AI prompts for software builders by delivery stage | https://buildersprompt.com/mcp |
| `io.github.adpadinc/brinkeradvisor-moneytalk-archive` | Moneytalk radio clip topics and dates through September 2018 | https://mcp.brinkeradvisor.com/mcp/audio |
| `io.github.adpadinc/brinkeradvisor-reading-guide` | Investing book metadata and BrinkerAdvisor reading paths | https://mcp.brinkeradvisor.com/mcp/books |
| `io.github.agentcitylabs/gmgn-robinhood-mcp` | Robinhood Chain token launches, trending tokens and due diligence data | https://gmgn.agentcity.lol/mcp |
| `io.github.agentsherpa/yieldhunter` | Risk-adjusted stablecoin yield rankings and protocol risk on Ethereum, Base, Arbitrum | https://yieldhunter-agent-production.up.railway.app/mcp |
| `io.github.agentstructure/clinical` | ClinicalTrials.gov and EU trial records, plus FDA approvals and recalls | https://clinicaltracker.org/mcp/public |
| `io.github.agentstructure/fedreg` | US Federal Register rules, notices, comment deadlines and rulemaking timelines | https://fedregtracker.com/mcp |
| `io.github.agentstructure/local-events` | Upcoming local concerts, shows and sports events with change alerts | https://localeventstracker.com/mcp |
| `io.github.agentstructure/realty` | US homes for sale or rent with property details and price history | https://realty.bingo/mcp |
| `io.github.ahmed-suman/nextjobz-job-search` | Job listings on NextJobz by keyword, location, salary and experience | https://mcp.nextjobz.com.bd/mcp |
| `io.github.ahmedaminsa/aljazeera360-mcp-server` | Al Jazeera 360 Arabic shows, documentaries and podcasts | https://aljazeera360-mcp.ahmed-26d.workers.dev/mcp |
| `io.github.AIAll-TARS/naim` | Registry of AI APIs with docs, pricing and agent-sourced ratings | https://mcp.naim.janis7ewski.org/mcp |
| `io.github.Airpote/avalanche-docs` | Avalanche blockchain documentation, RPC methods and community proposals | https://build.avax.network/api/mcp |
| `io.github.AjnasNB/skilldash` | Source-pinned agent skills, plugins and tools catalog | https://skills.maqamagent.com/mcp |
| `io.github.ALDEBERTArnaud/mcp-rncp` | French RNCP and RS professional certifications, skill blocks and habilitation | https://mcp-rncp.com/mcp |
| `io.github.algorerthym/agent-commons` | Help desk tickets and answers from AI agents | https://www.agentscommons.io/mcp/read |
| `io.github.alicelabs-llc/marketnow` | Catalog of 70,000 MCP servers with install-risk scoring | https://marketnow.site/api/mcp |
| `io.github.altss-data/docs` | Altss public data and agent documentation | https://docs.altss.com/mcp |
| `io.github.altss-data/public-profiles` | Published Altss organization profile summaries with citations | https://altss.com/mcp |
| `io.github.AM-Digital-Research-Environment/amira-mcp-server` | Digitised African research items, projects and person records | https://data.africamultiple.uni-bayreuth.de/mcp |
| `io.github.amakkar-leap/convergent-provider-directory` | Healthcare providers by name, specialty and city | https://convergent-mcp-dummy.livelycoast-4be0cd2b.eastus2.azurecontainerapps.io/mcp |
| `io.github.amcharts/amcharts5` | amCharts 5 documentation, code examples and API reference | https://mcp.amcharts.com/mcp |
| `io.github.amirdaraee/luxembourg-mcp` | Luxembourg open data, laws, statistics, geodata and weather alerts | https://mcp.luxembourg-mcp.com/mcp |
| `io.github.AnastasiyaW/diffusion-love-knowledge` | Public knowledge snapshot and news on diffusion models and tooling | https://diffusion.love/mcp |
| `io.github.AnchorRegistry/ar-mcp` | On-chain provenance records for artifacts by AR-ID or hash | https://mcp.anchorregistry.ai/mcp |
| `io.github.Anon2052/search-mcp` | Web search results and page text | https://search-mcp-tgsn.onrender.com/mcp/ |
| `io.github.anousss007/ng-blatui` | ng-blatui Angular components, blocks, charts, templates and typed APIs | https://ngblatui.remix-it.com/mcp |
| `io.github.ant588362/yarrow` | Fixes other coding agents found for errors | https://yarrow-fixes.vercel.app/mcp |
| `io.github.archestack/mcp` | Ranked open-source AI projects, deploy facts and alternatives to paid tools | https://mcp.archestack.com/mcp |
| `io.github.arcusid/arcid-mcp` | AI agents registered on Arc: ERC-8004 identity, feedback and trust scores | https://mcp.arcusid.com/mcp |
| `io.github.arhancanli/canli-research-mcp` | Canli Capital trading research papers, failed strategies and live record | https://canlicapital.com/mcp/research |
| `io.github.ArneFfm/animal-checklist` | Animal species in eight languages with habitats, countries and photos | https://animalchecklist.com/mcp |
| `io.github.ArneFfm/ecoaloha` | Reviewed outdoor tours and experiences by destination and collection | https://ecoaloha.com/mcp |
| `io.github.ArneFfm/nowyourlink-docs` | nowyourlink developer documentation: API, authentication, versioning, privacy | https://nowyourlink.com/mcp/docs |
| `io.github.arseniigruzdev/llmsmap` | Directory of sites publishing llms.txt files | https://llmsmap.me/api/mcp/ |
| `io.github.AshutoshRaj97/agentready-mcp` | Cited answers from any indexed documentation website | https://www.agentready.it.com/api/mcp |
| `io.github.Ask-Cyborg/askcyborg-mcp` | Analyst research reports, scores and competitors for companies | https://mcp.askcyborg.com/mcp |
| `io.github.asr-aditya/iconserve` | Over 366,000 open-source icons as SVG or PNG | https://icons-for-agents.site/mcp |
| `io.github.asrplv/ailibri` | Catalog of 3000+ AI tools with pricing and availability in Russia | https://mcp.ailibri.com/mcp |
| `io.github.assafbar2/agentswitchboard` | Directory of 800+ AI agents, MCP servers and agentic tools | https://agentswitchboard.dev/api/mcp |
| `io.github.assetgrid-llc/jueban-buddhist-companion` | Buddhist scripture passages with explanations and practice guidance | https://jueban.online/mcp |
| `io.github.asturksever/agentic-house-search` | UK neighbourhood data by postcode from government open datasets | https://agentic-house-search.vercel.app/mcp |
| `io.github.atakanelik34/clawifi-mcp` | Web search and page content extraction | https://api.clawifi.dev/mcp |
| `io.github.atomno-mcp/mcp-catalog` | Directory of MCP servers in the Russian mcp-catalog.ru | https://mcp-catalog.ru/mcp |
| `io.github.ayers-software-repair/lancelot` | Documents stored in a local LanceDB vector database | https://mcp.ayers.repair/lancelot |
| `io.github.balthasarspeyr/catalogue` | Works and texts of Hans Urs von Balthasar and Adrienne von Speyr | https://mcp.balthasarspeyr.org/mcp |
| `io.github.bauerpawel/dockyard` | 600+ Docker and Portainer app templates with deploy instructions | https://dockyard.kim1.ovh/mcp |
| `io.github.BCXTRUST/kyma-frequency-mcp` | KYMA369 healing frequency library, articles and FAQ | https://eaqistzhmblvuxndwfbn.supabase.co/functions/v1/freq-mcp |
| `io.github.beepboop2025/financial-evidence-workspace` | Cited financial datasets on funding, institutions and BTC exit | https://agents.seiche.info/products/financial-evidence/mcp |
| `io.github.beepboop2025/liquilens` | Bank filings, NPAs, crypto exposure and counterparty stress evidence | https://api.liquilens.in/mcp |
| `io.github.beepboop2025/seiche-market-corpus` | BIS statistics and Seiche money-market observations with source dates | https://agents.seiche.info/products/seiche-market-corpus/mcp |
| `io.github.bennekrouf/mayorana` | Mayorana desktop apps, release notes, plans, and Rust, LLM, Azure articles | https://mayorana.ch/mcp |
| `io.github.benno303/ndis-provider-feed` | Registered NDIS providers by location and service category | https://ndis-provider-feed-125475360011.australia-southeast1.run.app/mcp |
| `io.github.bg7iuy/china-phone` | Carrier, province and city for Chinese mobile number prefixes | https://china-phone-mcp.vercel.app/api/index |
| `io.github.bguillow-rgb/percolate` | Specialty coffees with flavor profiles, brew recipes and pairings | https://mcp.percolateapp.com/?src=registry |
| `io.github.bguillow-rgb/perfume-picks` | Fragrance notes, dupes, similar scents and wear data for 10,000+ perfumes | https://mcp.perfumepicks.app/?src=registry |
| `io.github.bguillow-rgb/pour-picks` | Bourbon and whiskey bottles with tasting profiles and prices | https://mcp.pourpicks.app/?src=registry |
| `io.github.bh-rat/context-awesome` | Curated items from GitHub awesome lists by topic | https://www.context-awesome.com/api/mcp |
| `io.github.BharatDharmaAcademy/bda-mcp` | Panchang, tithi, nakshatra, Hindu festivals and Jyotish concepts with citations | https://jyotish-api.bda.ai/mcp |
| `io.github.birdwell/runescape-wiki-mcp` | RuneScape wiki, Grand Exchange prices and player hiscores | https://runescape-wiki-mcp.fly.dev/mcp |
| `io.github.bitrix24/bitrix-mcp-rest` | Bitrix24 REST API methods, events and app development documentation | https://mcp-dev.bitrix24.com/mcp |
| `io.github.blakeplock/i2idl-glossary` | Digital learning concepts, definitions, relationships and citations | https://id.i2idl.org/mcp |
| `io.github.bleemohr/foodbe` | Cited food answers, ingredient nutrition, allergens and recipes | https://mcp.foodbe.ai/v1/mcp |
| `io.github.bluetouff/13flow` | SEC 13F institutional holdings by fund and stock, with quality checks | https://13flow.eu/api/mcp |
| `io.github.bluetouff/l0g` | Macro risk analysis articles, evidence and sourced claims | https://l0g.fr/api/mcp/compact |
| `io.github.blutrich/podlearn` | Podcasts and episodes from 4M+ shows, with transcripts | https://podlearn.ai/mcp |
| `io.github.bmlt-enabled/bmlt-server-mcp` | Narcotics Anonymous meetings worldwide by location and format | https://mcp.bmlt.app/mcp |
| `io.github.bobymicjohn/2b2t-atlas` | 2b2t Minecraft server bases, signs, rare blocks and NoCom history | https://api.blackportal.cloud/mcp |
| `io.github.books-service/ru-books` | Russian books catalog by genre, author, language and format | https://knigochit.ru/mcp |
| `io.github.brand-lc/findaiforwork` | Curated AI software tools for work, with comparisons | https://findaiforwork.com/mcp |
| `io.github.brian8a1/atisbo-docs` | Atisbo product documentation pages | https://app.atisbo.dev/api/mcp-docs |
| `io.github.busybusybussiness/uk-legislation-changes` | Amendment histories of UK law provisions | https://uk-legal-changes.pages.dev/mcp |
| `io.github.BUYMYAGENT-TECHNOLOGIES-INC/marketplace` | Curated catalogue of AI agents for sale | https://www.buy-my-agent.com/api/mcp |
| `io.github.c-mongan/ireland-mcp` | Irish public data: statistics, law, transport, weather, property | https://mcp.irishopendata.ie/mcp |
| `io.github.cadenlpicard/rocketvault` | RocketVault product documentation, plans and public card marketplace listings | https://rocketvault.io/mcp |
| `io.github.cairncommons/cairn-commons` | Verified records of dependency bugs and their fixes | https://cairncommons.dev/api/mcp |
| `io.github.cairncommons/cairn-read` | Verified, version-pinned bug notes for software library dependencies | https://cairncommons.dev/api/mcp/read |
| `io.github.cammac-creator/openswissdata` | Swiss customs tariff, FINMA register, companies and industry classification codes | https://mcp.openswissdata.com/jsonrpc |
| `io.github.carbaj03/solution-commons` | Public solutions from agent work with evidence and reuse reports | https://solutions.agentlife.app/api/mcp |
| `io.github.Carmel-Labs-Inc/mcp-index` | Index of healthy public MCP servers with recommendations | https://index.mcp.agentstatus.dev/mcp |
| `io.github.cdaily1995-create/findingsteel-steel-sections` | Chinese GB standard steel section properties and weights | https://www.findingsteel.com/mcp/ |
| `io.github.cello305/carddeals-mcp` | Current US gift card discounts across providers | https://catalog.carddeals.co/mcp |
| `io.github.Centrify-Internal/hubspot-integrations-mcp` | HubSpot Integrations Center app integrations data | https://n6k96b1ql7.execute-api.us-west-2.amazonaws.com/prod/ |
| `io.github.chrisryugj/korean-law-mcp` | Korean statutes, precedents, ordinances and treaties | https://mcp.gomdori.app/law |
| `io.github.classofdoom/tresslers-intelligence` | Intelligence dossiers and daily briefings with semantic search and knowledge graph | https://tresslersgroup.com/api/mcp |
| `io.github.CleanSlice/mcp` | Architecture docs and patterns for NestJS and Nuxt full-stack apps | https://mcp.cleanslice.org/mcp |
| `io.github.cloudalien2025/1800deals-directory` | Directory of toll-free and vanity-number US businesses | https://1800deals-connector.michael-b38.workers.dev/mcp |
| `io.github.cloudalien2025/bangkokvacay-directory` | Bangkok tours, hotels, restaurants, nightlife and services | https://bangkokvacay-connector.michael-b38.workers.dev/mcp |
| `io.github.cloudalien2025/bostonvacay-directory` | Boston tours, hotels, restaurants, nightlife and services | https://bostonvacay-connector.michael-b38.workers.dev/mcp |
| `io.github.cloudalien2025/vailvacay-directory` | Vail Valley, Colorado restaurants, hotels, activities, shops and services | https://vailvacay-connector.michael-b38.workers.dev/mcp |
| `io.github.coburn2716/directree-mcp` | Structured facts on 5000+ software tools, with comparisons | https://www.directree.io/api/mcp |
| `io.github.coltongriffith/explorationmaps` | Public mineral claim registries by holder and claim number | https://www.explorationmaps.com/mcp/server |
| `io.github.cometchat/docs-mcp` | CometChat documentation for chat, voice, video and moderation SDKs | https://mcp.cometchat.com/mcp |
| `io.github.connerlambden/bgpt-mcp` | Claim-level experimental evidence from full-text scientific papers | https://bgpt.pro/mcp/stream |
| `io.github.conorbronsdon/chain-of-thought-podcast-mcp` | Chain of Thought AI podcast transcripts and episodes | https://mcp.chainofthought.show/mcp |
| `io.github.contexte-tech/contexte` | AI datasets, prompt templates and few-shot contexts | https://contextetech.com/mcp |
| `io.github.Cora77-ops/kingy-guides` | Video game guides, hints and walkthroughs from kingy.wiki | https://kingy-guides.vercel.app/mcp |
| `io.github.CumulativeWebInc/cwi-discovery-engine` | Music catalog of tracks, artists and releases searchable by brief or mood | https://cwi-machine-data.hp-ace.workers.dev/mcp |
| `io.github.curlymolelabs/supericons` | Over 20,000 SVG icons searchable by meaning | https://mcp.supericons.dev/mcp |
| `io.github.CYAN-ECLIPSE-TECHNOLOGIES-LLC/trust` | Benchmark verdicts, receipts and ERC-8004 agent validation records | https://cetech.ai/trust/mcp |
| `io.github.CYAN-ECLIPSE-TECHNOLOGIES-LLC/white-report` | Crypto and AI news archive with graded market calls | https://thewhitereport.com/mcp.php |
| `io.github.cyanheads/art-institute-chicago-mcp-server` | Art Institute of Chicago artworks, artists, exhibitions and audio guides | https://art-institute-chicago.caseyjhand.com/mcp |
| `io.github.cyanheads/arxiv-mcp-server` | arXiv paper metadata and full text | https://arxiv.caseyjhand.com/mcp |
| `io.github.cyanheads/biorxiv-mcp-server` | bioRxiv and medRxiv preprints, metadata and full text | https://biorxiv.caseyjhand.com/mcp |
| `io.github.cyanheads/bluesky-mcp-server` | Public Bluesky posts, profiles, feeds, threads and trending topics | https://bluesky.caseyjhand.com/mcp |
| `io.github.cyanheads/cdc-health-mcp-server` | CDC public health data: mortality, vaccinations, surveillance, behavioral risk | https://cdc.caseyjhand.com/mcp |
| `io.github.cyanheads/cern-inspire-mcp-server` | High-energy physics papers, authors, experiments and HEPData records | https://cern-inspire.caseyjhand.com/mcp |
| `io.github.cyanheads/cern-opendata-mcp-server` | CERN Open Data particle physics datasets, files and analysis environments | https://cern-opendata.caseyjhand.com/mcp |
| `io.github.cyanheads/chembl-mcp-server` | ChEMBL compounds, protein targets, bioactivity and drug mechanisms | https://chembl.caseyjhand.com/mcp |
| `io.github.cyanheads/cisa-cybersecurity-mcp-server` | CISA known exploited vulnerabilities, SSVC and ICS advisories | https://cisa-cybersecurity.caseyjhand.com/mcp |
| `io.github.cyanheads/clinicaltrialsgov-mcp-server` | ClinicalTrials.gov studies, results and patient-matched trials | https://clinicaltrials.caseyjhand.com/mcp |
| `io.github.cyanheads/college-scorecard-mcp-server` | US college costs, earnings, programs and outcomes | https://college-scorecard.caseyjhand.com/mcp |
| `io.github.cyanheads/courtlistener-mcp-server` | US court opinions, federal dockets, judges and citations | https://courtlistener.caseyjhand.com/mcp |
| `io.github.cyanheads/crossref-mcp-server` | Scholarly works, DOIs, references, journals and funders from Crossref | https://crossref.caseyjhand.com/mcp |
| `io.github.cyanheads/cyanheads-mcp-server` | Catalog of cyanheads MCP servers and tools with install snippets | https://cyanheads.caseyjhand.com/mcp |
| `io.github.cyanheads/datacite-mcp-server` | DataCite DOI metadata for datasets, software and research outputs | https://datacite.caseyjhand.com/mcp |
| `io.github.cyanheads/earthquake-mcp-server` | USGS and EMSC earthquake events and real-time feeds | https://earthquake.caseyjhand.com/mcp |
| `io.github.cyanheads/elevation-mcp-server` | Ground elevation, route profiles and terrain line of sight worldwide | https://elevation.caseyjhand.com/mcp |
| `io.github.cyanheads/ensembl-mcp-server` | Genes, sequences, variants and homologs from Ensembl genomes | https://ensembl.caseyjhand.com/mcp |
| `io.github.cyanheads/epa-mcp-server` | EPA compliance, toxic releases, Superfund, drinking water and air quality | https://epa.caseyjhand.com/mcp |
| `io.github.cyanheads/eu-parliament-mcp-server` | European Parliament procedures, MEPs, votes, documents and speeches | https://eu-parliament.caseyjhand.com/mcp |
| `io.github.cyanheads/eur-lex-mcp-server` | EU legislation, CJEU case law, treaties and EuroVoc concepts | https://eur-lex.caseyjhand.com/mcp |
| `io.github.cyanheads/eurostat-mcp-server` | EU economy, demography, trade and regional statistics from Eurostat | https://eurostat.caseyjhand.com/mcp |
| `io.github.cyanheads/faa-aircraft-registry-mcp-server` | US civil aircraft registrations decoded by N-number, owner and type | https://faa-aircraft-registry.caseyjhand.com/mcp |
| `io.github.cyanheads/faa-airmen-registry-mcp-server` | FAA pilot and instructor certificates, ratings and medical class records | https://faa-airmen-registry.caseyjhand.com/mcp |
| `io.github.cyanheads/fbi-crime-mcp-server` | FBI US crime rates, arrests, hate crimes and agency statistics | https://fbi-crime.caseyjhand.com/mcp |
| `io.github.cyanheads/fcc-spectrum-mcp-server` | FCC radio licenses, licensed sites and frequency allocations | https://fcc-spectrum.caseyjhand.com/mcp |
| `io.github.cyanheads/fdic-banks-mcp-server` | FDIC-insured banks, financials, failures, mergers and deposit data | https://fdic-banks.caseyjhand.com/mcp |
| `io.github.cyanheads/federal-regulations-mcp-server` | US Federal Register rules, CFR text, dockets and public comments | https://federal-regulations.caseyjhand.com/mcp |
| `io.github.cyanheads/first-epss-mcp-server` | EPSS exploit probability scores for CVEs, with daily history | https://first-epss.caseyjhand.com/mcp |
| `io.github.cyanheads/gbif-biodiversity-mcp-server` | Species taxonomy and billions of occurrence records from GBIF | https://gbif-biodiversity.caseyjhand.com/mcp |
| `io.github.cyanheads/gdelt-mcp-server` | Global news coverage and US TV news transcripts from GDELT | https://gdelt.caseyjhand.com/mcp |
| `io.github.cyanheads/geonames-mcp-server` | Places, administrative hierarchies, postal codes and country facts | https://geonames.caseyjhand.com/mcp |
| `io.github.cyanheads/grantsgov-mcp-server` | US federal funding opportunities, eligibility and deadlines from Grants.gov | https://grantsgov.caseyjhand.com/mcp |
| `io.github.cyanheads/gutenberg-mcp-server` | Public-domain ebooks with full text from Project Gutenberg | https://gutenberg.caseyjhand.com/mcp |
| `io.github.cyanheads/hn-mcp-server` | Hacker News stories, threads and user profiles | https://hn.caseyjhand.com/mcp |
| `io.github.cyanheads/ilostat-mcp-server` | Global labour market statistics and indicators from ILOSTAT | https://ilostat.caseyjhand.com/mcp |
| `io.github.cyanheads/inaturalist-mcp-server` | iNaturalist wildlife sightings, species counts, identifications and phenology | https://inaturalist.caseyjhand.com/mcp |
| `io.github.cyanheads/internet-archive-mcp-server` | Wayback Machine snapshots and Internet Archive books, media and texts | https://internet-archive.caseyjhand.com/mcp |
| `io.github.cyanheads/interpro-mcp-server` | Protein families, domains and signatures from InterPro | https://interpro.caseyjhand.com/mcp |
| `io.github.cyanheads/libofcongress-mcp-server` | Library of Congress collections, historic newspapers and subject headings | https://libofcongress.caseyjhand.com/mcp |
| `io.github.cyanheads/medical-codes-mcp-server` | US medical codes: ICD-10, HCPCS and RxNorm, with crosswalks | https://medical-codes.caseyjhand.com/mcp |
| `io.github.cyanheads/met-museum-mcp-server` | Metropolitan Museum of Art collection records and open images | https://met-museum.caseyjhand.com/mcp |
| `io.github.cyanheads/musicbrainz-mcp-server` | Music artists, releases, recordings, works and labels from MusicBrainz | https://musicbrainz.caseyjhand.com/mcp |
| `io.github.cyanheads/nhtsa-vehicle-safety-mcp-server` | US vehicle recalls, complaints, crash ratings and NHTSA investigations | https://nhtsa.caseyjhand.com/mcp |
| `io.github.cyanheads/nist-nvd-mcp-server` | NIST NVD CVE vulnerabilities by severity, CWE, KEV status and product | https://nist-nvd.caseyjhand.com/mcp |
| `io.github.cyanheads/noaa-climate-mcp-server` | NOAA historical weather observations and climate stations | https://noaa-climate.caseyjhand.com/mcp |
| `io.github.cyanheads/npi-providers-mcp-server` | US healthcare providers from NPPES and specialty taxonomy codes | https://npi-providers.caseyjhand.com/mcp |
| `io.github.cyanheads/oecd-mcp-server` | OECD statistical datasets on economy, society and environment | https://oecd.caseyjhand.com/mcp |
| `io.github.cyanheads/oeis-mcp-server` | Integer sequences, formulas and programs from the OEIS | https://oeis.caseyjhand.com/mcp |
| `io.github.cyanheads/openalex-mcp-server` | Academic publications, authors, institutions and citations from OpenAlex | https://openalex.caseyjhand.com/mcp |
| `io.github.cyanheads/openfoodfacts-mcp-server` | Packaged food products, nutrition and scores by barcode or search | https://openfoodfacts.caseyjhand.com/mcp |
| `io.github.cyanheads/openlibrary-mcp-server` | Books, authors, editions and subjects from Open Library | https://openlibrary.caseyjhand.com/mcp |
| `io.github.cyanheads/openstates-mcp-server` | US state bills, legislators, committees and legislative events | https://openstates.caseyjhand.com/mcp |
| `io.github.cyanheads/ourairports-mcp-server` | Global airports, runways, navaids and radio frequencies | https://ourairports.caseyjhand.com/mcp |
| `io.github.cyanheads/paleobiology-mcp-server` | Fossil occurrences, taxa, diversity and geologic time scale | https://paleobiology.caseyjhand.com/mcp |
| `io.github.cyanheads/pentest-mcp-server` | Penetration testing methodology, MITRE ATT&CK techniques and OWASP test cases | https://pentest.caseyjhand.com/mcp |
| `io.github.cyanheads/pharmacogenomics-guidelines-mcp-server` | CPIC pharmacogenomics guidelines, gene-drug pairs and prescribing recommendations | https://pharmacogenomics-guidelines.caseyjhand.com/mcp |
| `io.github.cyanheads/pokeapi-mcp-server` | Pokemon stats, moves, abilities, items and type matchups | https://pokeapi.caseyjhand.com/mcp |
| `io.github.cyanheads/pubchem-mcp-server` | PubChem compounds, properties, hazard data and bioactivity | https://pubchem.caseyjhand.com/mcp |
| `io.github.cyanheads/pubmed-mcp-server` | Biomedical literature, abstracts, full text and MeSH terms | https://pubmed.caseyjhand.com/mcp |
| `io.github.cyanheads/reference-data-mcp-server` | Countries, timezones, periodic table, physical constants and HTTP codes | https://reference-data.caseyjhand.com/mcp |
| `io.github.cyanheads/reliefweb-mcp-server` | ReliefWeb humanitarian reports, disasters, country profiles and jobs | https://reliefweb.caseyjhand.com/mcp |
| `io.github.cyanheads/ris-austria-mcp-server` | Austrian federal and state law, court decisions and gazette | https://ris-austria.caseyjhand.com/mcp |
| `io.github.cyanheads/smithsonian-mcp-server` | Smithsonian museum objects and open-access images | https://smithsonian.caseyjhand.com/mcp |
| `io.github.cyanheads/socrata-mcp-server` | Government open datasets from Socrata data portals | https://socrata.caseyjhand.com/mcp |
| `io.github.cyanheads/stackexchange-mcp-server` | Stack Exchange questions, answers and tag FAQs | https://stackexchange.caseyjhand.com/mcp |
| `io.github.cyanheads/sweden-parliament-mcp-server` | Swedish parliament documents, speeches, votes, members and statutes | https://sweden-parliament.caseyjhand.com/mcp |
| `io.github.cyanheads/switzerland-parliament-mcp-server` | Swiss parliamentary business, votes, debates and member interests | https://switzerland-parliament.caseyjhand.com/mcp |
| `io.github.cyanheads/uk-legislation-mcp-server` | UK legislation text at any date, with amendments and changes | https://uk-legislation.caseyjhand.com/mcp |
| `io.github.cyanheads/uk-parliament-mcp-server` | UK Parliament bills, members, votes, Hansard and questions | https://uk-parliament.caseyjhand.com/mcp |
| `io.github.cyanheads/uk-police-crime-mcp-server` | UK street crime, outcomes, stop and search, and neighbourhood policing | https://uk-police-crime.caseyjhand.com/mcp |
| `io.github.cyanheads/unesco-heritage-mcp-server` | UNESCO World Heritage, intangible heritage, biosphere reserves and geoparks | https://unesco-heritage.caseyjhand.com/mcp |
| `io.github.cyanheads/uniprot-mcp-server` | Curated protein records, sequences and proteomes from UniProt | https://uniprot.caseyjhand.com/mcp |
| `io.github.cyanheads/us-lobbying-mcp-server` | US lobbying disclosures and foreign agent registrations | https://us-lobbying.caseyjhand.com/mcp |
| `io.github.cyanheads/usda-mcp-server` | Food nutrient data from USDA FoodData Central | https://usda.caseyjhand.com/mcp |
| `io.github.cyanheads/usitc-tariffs-mcp-server` | US tariff schedule codes and published duty rates | https://usitc-tariffs.caseyjhand.com/mcp |
| `io.github.cyanheads/wikidata-mcp-server` | Wikidata entities, statements and SPARQL queries | https://wikidata.caseyjhand.com/mcp |
| `io.github.cyanheads/wikipedia-mcp-server` | Wikipedia articles, summaries, sections and references | https://wikipedia.caseyjhand.com/mcp |
| `io.github.cyanheads/zenodo-mcp-server` | Zenodo research datasets, software and publications by DOI | https://zenodo.caseyjhand.com/mcp |
| `io.github.CyberMax-tools/creative-commons-images` | Openly licensed and public-domain images with license and credit lines | https://commonkite.cybermax-tools.workers.dev/mcp?via=mcp-registry |
| `io.github.daftAI2026/awesome-jev` | Jev and System One projects with recorded inclusion evidence | https://awesomejev.cc/api/mcp |
| `io.github.Daisuke134/ai-monk-index` | AI monk avatar creators, video formats, monetization and playbooks | https://aniccaai.com/.netlify/functions/ai-monk-mcp |
| `io.github.daleweaver1981/tariffmonitor-mcp` | US HTS codes and stacked import tariff rates by origin | https://adcreator-ai.com/mcp-free |
| `io.github.Damso74/arcadeops-public-discovery` | ArcadeOps public developer docs, OAuth guide and OpenAPI | https://arcadeops.leadalpes.fr/mcp/public |
| `io.github.danielinniss/boundr` | UK administrative boundaries and GeoJSON geometries from OS Boundary Line | https://mcp.boundr.dev/mcp |
| `io.github.DataLeadsPRO/airbnb-data` | Airbnb listings, details and calendar availability | https://data.dataleads.pro/mcp/airbnb-data |
| `io.github.DataLeadsPRO/app-data` | Google Play and App Store app details, reviews and search | https://data.dataleads.pro/mcp/app-data |
| `io.github.DataLeadsPRO/google-serp` | Google search, news and local results as structured data | https://data.dataleads.pro/mcp/google-serp |
| `io.github.DataLeadsPRO/government-tenders` | Government tenders and public procurement opportunities | https://data.dataleads.pro/mcp/government-tenders |
| `io.github.datmay-dot/streambridge` | Chinese TV drama scenes with timestamps by character, emotion and scene type | https://mcp.lume.living/mcp |
| `io.github.deficlow/hyperstore-mcp` | Directory of 6,500+ curated AI apps | https://mcp.store.hypergpt.ai/mcp |
| `io.github.Deke1Yahav/hive` | Agent-written Q&A threads and canonical fixes for errors and failing commands | https://hive-agents.fly.dev/mcp |
| `io.github.delicious28/wuming-books` | Chinese books with Douban ratings, guides and toplists | https://www.book345.com/api/mcp |
| `io.github.Desearch-ai/mcp-desearch` | Web and X (Twitter) search results, posts, people and companies | https://mcp.desearch.ai/mcp |
| `io.github.devids77/mcp-market-ru` | Russian construction contractors, house projects, prices and ratings | https://mcp-market.ru/mcp/ |
| `io.github.dhamma-seeker/tripitaka-mcp` | Pali Canon suttas with search, citations and translations | https://mcp.tripitaka-mcp.com/mcp |
| `io.github.DiceHoldingsInc/dice-mcp` | Tech job listings on Dice.com | https://mcp.dice.com/mcp |
| `io.github.disclose/lookup-disclose-io` | Security vulnerability disclosure contacts for domains, packages and repositories | https://lookup.disclose.io/mcp |
| `io.github.dodopayments/dodo-knowledge` | Dodo Payments API and product documentation | https://knowledge.dodopayments.com/mcp |
| `io.github.domusdeiug/muyiribi` | Ugandan business directory by category and district | https://ug-online.domus-dei-tech.workers.dev/mcp |
| `io.github.donniertf-hub/jp-library-search-mcp` | Japan National Diet Library catalogue of books and publications | https://jp-library-search-mcp.donniertf.workers.dev/mcp |
| `io.github.donniertf-hub/jp-postal-lookup-mcp` | Japanese postcodes to prefecture, city and town | https://jp-postal-lookup-mcp.donniertf.workers.dev/mcp |
| `io.github.DrRataplan/fonto-docs` | Fonto XML editor documentation and API reference | https://fonto-docs.elliat.nl/mcp |
| `io.github.dubaikseniia-wq/entra-mcp` | Verified AI and tech jobs, companies hiring and salary stats | https://mcp.entracareers.com/mcp |
| `io.github.dunctk/marketing-manager-jobs` | Marketing manager jobs and hiring research trackers | https://marketingmanagerjobs.com/mcp |
| `io.github.dynamical-org/mcp` | Open weather and climate datasets such as GFS, ECMWF, HRRR | https://mcp.dynamical.org/mcp |
| `io.github.eater2/ai-agents-api-library` | Catalog of APIs and MCP servers for AI agents | https://ai-agents-api-library.vercel.app/mcp |
| `io.github.ebspark/agent-net-answers` | Reviewed answers on agent identity, permissions, persistence and durable jobs | https://agent-net-hub.duckdns.org/mcp |
| `io.github.edtool79-collab/hirepulse-b2b` | Company profiles, tech stack, hiring signals, open jobs and ads | https://gethirepulse.xyz/mcp?profile=b2b&ref=registry-b2b |
| `io.github.eduair94/cambio-uruguay` | Uruguay exchange rates, rentals, used cars, prices and economy news | https://mcp.cambio-uruguay.com/mcp |
| `io.github.eltociear/tokenguard-mcp` | Air quality, earthquakes, holidays, World Bank indicators, geocoding and web search | https://eltociear-tokenguard.hf.space/mcp |
| `io.github.elyngved/failmodes` | Taxonomy of AI system failure modes by symptom | https://www.failmodes.com/api/mcp |
| `io.github.Embassy-of-the-Free-Mind/sourcelibrary` | Rare pre-modern texts translated to English: philosophy, religion, science | https://sourcelibrary.org/api/mcp |
| `io.github.Enrico55/humanity-commons` | Federated knowledge records with provenance and critiques | https://humanitycommons.org/mcp |
| `io.github.entire-vc/spark` | AI agents, skills, prompts and MCP connectors from the Spark marketplace | https://spark.entire.vc/mcp/ |
| `io.github.eugenelabonarsky/votura-tours` | Audio walking, cycling and driving tours and places by city | https://api.votura.app/functions/v1/app_a0630e492b_mcp |
| `io.github.EvidInvest/aether-developer` | SEC filings, earnings call transcripts, EU financial regulation and 13F holdings | https://aether.evidinvest.com/mcp |
| `io.github.f-tiger/bpj-startup-research` | AI startup cases, launch signals and validation evidence | https://baipiaoji.com/api/startup-mcp |
| `io.github.f-tiger/bpj-video-tools` | Chinese video platform rules and AI drama catalogue | https://baipiaoji.com/api/video-mcp |
| `io.github.fadymondy/nasaq` | Nasaq UI design system components, tokens and setup docs | https://mcp.nasaqui.com/mcp |
| `io.github.FarseenSh/web3ctx` | Version-pinned web3 docs, contract ABIs, EIPs and integration recipes | https://mcp.scarai.xyz/mcp |
| `io.github.felipegambettadesouza6-jpg/open-economics` | Official Brazilian economic data from BCB, IBGE and SICONFI | https://open-economics-data.knbf982hkn.chatgpt.site/api/mcp |
| `io.github.firecrawl/firecrawl-mcp-server` | Web, news and image search results and scraped page content | https://mcp.firecrawl.dev/v2/mcp |
| `io.github.flo7up/aiusecasehub` | Source-linked enterprise AI deployment use cases | https://basic-backend713-dsd8hygyfkc8d8f5.swedencentral-01.azurewebsites.net/api/mcp |
| `io.github.flogvit/bible` | Bible translations, Hebrew and Greek texts, study notes and cross references | https://mcp.bible.flogvit.com/mcp |
| `io.github.flohoeller/affectui` | AffectUI React components, screens and blocks with docs and source | https://www.affectui.com/api/mcp |
| `io.github.fluttersdk/ai` | FlutterSDK package documentation: Wind UI, Magic, Dusk, Telescope, Artisan | https://mcp.fluttersdk.com/ |
| `io.github.Fokuus/mdprint-docs` | mdprint product information, documentation and Markdown examples | https://mdprint.app/mcp/docs |
| `io.github.ForkastPredict/forkast-mcp-docs` | Forkast prediction market documentation | https://mcp.forkast.gg/mcp |
| `io.github.frankbongo/disc-golf-england` | English Disc Golf Association tour results, policies, courses and funding guidance | https://discgolfengland.com/wp-json/edga/v1/mcp |
| `io.github.frankbongo/discgolfapi` | Disc golf courses worldwide with details and updates | https://io.discgolfapi.com/mcp |
| `io.github.frankbongo/thedisclist` | Disc golf discs, flight ratings, comparisons and sales rankings | https://api.thedisclist.com/mcp |
| `io.github.freecvorg/cvjson` | Public CVs of people open to work, in cv.json format | https://freecv.org/api/mcp |
| `io.github.Galanai/machinerealms` | Agent research commons findings, evidence ledgers and open research quests | https://machinerealms.com/mcp |
| `io.github.GenPM-net/genpm` | Injectable source code modules with AI rules and MCP, pinned to commits | https://mcp.genpm.net/ |
| `io.github.Georgi-Petkov/personalknowhow` | One person's skills and work experience as a knowledge graph | https://personalknowhow-demo.kxtwrdzt6g.workers.dev/mcp |
| `io.github.geronco/commandvault` | Prompts, CLAUDE.md templates, Cursor rules and agent skills | https://commandvault.ai/api/mcp |
| `io.github.getgapup/mcp-knowledge` | Enriched metadata on games, films and other content franchises | https://mcp.gapup.io |
| `io.github.godavid/gitjog` | Hungarian laws full text with amendment history and point-in-time versions | https://gitjog.remenyfarm.hu/api/mcp |
| `io.github.gokimedia/cordfind-generator-compatibility` | Generator cords, plugs, connector compatibility and cord sizing | https://cordfind.com/api/mcp |
| `io.github.gokimedia/sewlore-measurement-reference` | Sewing measurement documentation, worked examples and tool references | https://sewlore.gitbook.io/sewlore-docs/~gitbook/mcp |
| `io.github.GoodTurnStudio/bible` | Bible passages, daily readings and search | https://goodturn-mcp.pages.dev/bible/mcp |
| `io.github.GoodTurnStudio/findmymoney` | Official US and UK unclaimed money and property searches and how to claim | https://goodturn-mcp.pages.dev/findmymoney/mcp |
| `io.github.GoodTurnStudio/jobspotter` | Current US and UK job listings, salaries and employers | https://goodturn-mcp.pages.dev/jobspotter/mcp |
| `io.github.GoodTurnStudio/talmud` | Talmud and Mishnah text with daily Daf Yomi readings and explanations | https://goodturn-mcp.pages.dev/talmud/mcp |
| `io.github.gosodax/builders-mcp` | SODAX cross-chain DeFi data, swaps, volume, money market and SDK docs | https://builders.sodax.com/mcp |
| `io.github.greencore-solutions/cpg-knowledge-graph` | Grocery product records, market rules, labelling and claims by jurisdiction | https://mcp.cpgknowledgegraph.ai/mcp |
| `io.github.GriffMurder/orca-site` | Orca product, pricing, FAQs and docs | https://ops.orcarw.com/api/mcp |
| `io.github.GSMS-B/indian-legal-mcp` | Text of 102 Indian Acts and the Constitution | https://gsms-b-indian-legal-mcp.hf.space/gradio_api/mcp/ |
| `io.github.Guru-ragul/kabo-nutrition` | ICMR-NIN nutrition facts for Indian foods and protein targets | https://kabo-nutrition-mcp.onrender.com/mcp |
| `io.github.gustavoatar/instafan` | Travel destinations, top spots, briefs and itineraries | https://instafan.app/mcp |
| `io.github.guyvolvo/oceanofjobs` | Over a million open job listings and employer profiles | https://oceanofjobs.com/mcp |
| `io.github.h2-papers/mcp-server` | Molecular hydrogen medical literature with safety notes | https://h2-papers.org/mcp |
| `io.github.hans6883/cert-atlas` | Certification and professional exam blueprints, prices, duration and passing scores | https://mcp.quizforge.ai/mcp |
| `io.github.haocn-ops/git-top` | Open-source projects with recommendations, alternatives and comparisons | https://git.top/mcp/core/source/mcp-registry?source=mcp-registry |
| `io.github.HarshithNayakaL/portfolio-docs` | Developer docs for a portfolio's JSON API, MCP, A2A and NLWeb | https://harshith-nayaka-l-portfolio.vercel.app/mcp/docs |
| `io.github.hbailla/huntprice` | Grocery prices across Canadian stores and cities, with weekly cheapest store | https://huntprice.ca/mcp |
| `io.github.heathermacavelia-cell/ai-agent-index` | AI agents and automation agencies with pricing, integrations and ratings | https://theaiagentindex.com/mcp/mcp |
| `io.github.Heirloomz/oral-heritage-index` | Guides and interview prompts for saving family stories | https://oral-heritage-index.inktree.ai/mcp |
| `io.github.helena-bioinformatics/ask-helena` | Helena Bioinformatics company and product information with citations | https://api.helena.bio/ask/v1/mcp |
| `io.github.helena-bioinformatics/noodle` | PubMed-derived biomedical papers with citation and semantic graphs | https://api.helena.bio/noodle/v1/mcp |
| `io.github.hey-research-lab/hey-research` | Robinhood Chain projects: builders, releases, contracts and recent changes | https://heyresearch.xyz/mcp |
| `io.github.HeyZod/mansa-african-identity` | African bank and SWIFT codes, mobile networks, holidays and currencies | https://mansaapi.com/api/mcp |
| `io.github.hiddenjobs/job-search-mcp` | Remote tech job listings and descriptions | https://api.hiddenjobs.dev/mcp |
| `io.github.hoodly-agent/hoodly-gmgn-robinhood-mcp` | Robinhood Chain token launches, trends and due diligence data | https://gmgn.hoodly.io/mcp |
| `io.github.Humanleap/magicscreenshots-mcp` | Real App Store listing screenshots, previews and version history | https://www.magicscreenshots.com/api/mcp |
| `io.github.Ibrahim-Salman19/uetgpt` | UET Taxila admissions, programs, fees and merit calculation | https://uetgpt.site/mcp |
| `io.github.ifcode/gameshot` | Video game industry news, hot stories, and daily, weekly and monthly reports | https://gameshot.games/api/mcp |
| `io.github.InstaBlick/complyzard` | Compliance resources and documents by framework and topic | https://complyzard.com/mcp |
| `io.github.introman2023/tonzar` | Russian B2B industrial products and verified manufacturers catalog | https://tonzar.com/mcp |
| `io.github.isaacaskew/venunite-events` | US local events: concerts and more within 90 days | https://mcp.venunite.com/v1/mcp/ |
| `io.github.IsaiahDupree/agentsearch-mcp` | Web search, instant answers and clean page text | https://agentsearch-mcp.vercel.app/mcp |
| `io.github.IsaiahDupree/jobstack-mcp` | Job postings merged from USAJOBS, Adzuna, Greenhouse and Lever | https://jobstack-mcp.vercel.app/mcp |
| `io.github.IsaiahDupree/socialbridge-mcp` | Social media profiles, posts, comments and ads across networks | https://socialbridge-mcp.vercel.app/mcp |
| `io.github.iyuyoung/jotoak` | Published word searches, crosswords and mazes with printable PDFs | https://jotoak.com/mcp |
| `io.github.iyuyoung/nameideahub` | US surnames with 2010 Census ranks and counts | https://nameideahub.com/mcp |
| `io.github.izzet/mcp` | Izzet Yildirim's research papers, publications and CV | https://iyildirim.com/api/mcp |
| `io.github.Jackalope-Dev/moxie-docs` | Generated repository documentation, coding conventions and doc gaps | https://moxiedocs.com/api/mcp |
| `io.github.JacobiusMakes/diamond-mcp` | Diamond and gemology encyclopedia, lab-grown grading and price index | https://diamond-mcp.stienhardt.workers.dev/mcp |
| `io.github.james-robson/push-realm` | Agent-shared solutions to package, setup and runtime problems | https://api.pushrealm.com/mcp |
| `io.github.jamesmirusa/greengopartners` | GreenGo marketplace listings of AI agents, apps, templates, plus AI news | https://greengopartners.com/mcp |
| `io.github.JaniJegoroff/agent-connectors-mcp` | Directory of agent connectors and MCP tools | https://agentconnectors.dev/mcp |
| `io.github.jannegpriv/skyddsrumskollen` | Swedish civil-defence shelter locations, details and national statistics | https://tjovnwtrzrneiaqmigqe.supabase.co/functions/v1/mcp |
| `io.github.Jascenn/lingyi-tools-mcp` | Directory of AI tools by category and pricing | https://lingyi-tools-mcp.vercel.app/api/mcp |
| `io.github.Jenpo/fxpeek` | Latest and historical reference exchange rates with source links | https://fxpeek.com/api/mcp |
| `io.github.jimy-r/agent-workspace-practice` | Agent workspace architecture patterns and best practices | https://jamesross.ai/mcp |
| `io.github.jmrplens/libgen-mcp` | Books, papers, magazines and standards with text reading | https://mcp.jmrp.io/libgen |
| `io.github.joachimglassell-ship-it/tsre-swedish-equities` | Daily research intelligence on Swedish equities and market | https://machine-job-fishing-net.onrender.com/mcp/ |
| `io.github.joelp22-maker/referencesource` | Verified reference datasets with source URLs and quotes | https://referencesource.org/mcp |
| `io.github.jovan1301/official-translator-guides` | Guides on document translation, apostille and visas | https://officialtranslator.pro/mcp |
| `io.github.jqy-yo/gptimagehub` | Attributed image generation prompt templates by category | https://www.gptimagehub.com/mcp |
| `io.github.JSONbored/heyclaude` | Directory of Claude Code agents, MCP servers, skills and tools | https://heyclau.de/api/mcp |
| `io.github.justinmont84/loyaltyvip` | US casino directory and casino rewards programs | https://loyaltyvip.com/mcp |
| `io.github.justjlee/omnarai-mcp` | Omnarai multi-AI attributed corpus and model divergence records | https://engine.omnarai.org/api/mcp |
| `io.github.JustJuice55/telegram-catalog` | Telegram channels, chats, bots, recent posts and OTC marketplace listings | https://tgden.com/api/mcp |
| `io.github.kaitoInfra/twitterapi-mcp-server` | Twitter/X tweets, user profiles, followers, timelines and trends | https://mcp.twitterapi.io/mcp |
| `io.github.Kaixxrua/aigc-radar` | AI arXiv papers, GitHub AI projects and daily rankings | https://aigcnews.cn/api/mcp |
| `io.github.kangax/przilla` | CrossFit and HYROX workouts, benchmark targets, scaling and movement technique | https://przilla.app/mcp |
| `io.github.karandaid/karandeepsingh-blog` | DevOps and AWS articles and cheatsheets | https://karandeepsingh.ca/mcp |
| `io.github.kcaldata/kcaldata` | USDA-sourced calories and nutrition for foods and meals | https://api.kcaldata.com/mcp-server/mcp |
| `io.github.Kennethlee83/world-innovation` | World Innovation research abstracts and white papers with citations | https://winnovation.wead.live/mcp |
| `io.github.kerbelp/ai-collection` | Directory of AI tools with categories, alternatives and comparisons | https://thataicollection.com/mcp |
| `io.github.ketherworks/atcoder` | AtCoder competitive programming problem statements | https://api.ksrnyx.top/oj-mcp/atcoder/mcp |
| `io.github.khaledmoayad/3ammiya` | Egyptian Arabic slang words, meanings and regions | https://3ammiya.com/api/mcp/mcp |
| `io.github.khaoss85/agent-crm` | Accordo CRM framework documentation and capability claims | https://accordo.dev/api/mcp |
| `io.github.Kibetho/saasforit` | Curated SaaS business tools directory with recommendations and guides | https://fuechvghummojkgliyha.supabase.co/functions/v1/mcp |
| `io.github.killbridge/startupjobs-mcp` | Live startup job listings, companies, trends and salary benchmarks | https://api.startup.jobs/mcp |
| `io.github.kimnchai/korea-flight-mcp` | Korean airport flight status, Incheon congestion and facilities | https://korea-flight.kimnchai.com/mcp |
| `io.github.kirupa/kirupa` | Web development, JavaScript, CSS and algorithms tutorials from KIRUPA | https://www.kirupa.com/mcp/ |
| `io.github.kkfir13/valuedge` | Stock fair value, fundamentals and screening for public companies | https://valuedge.app/mcp |
| `io.github.KKKKhazix/aihot` | Chinese AI news, hot events and daily, weekly, monthly briefs | https://aihot.news/api/mcp |
| `io.github.klmlfl/case-doha-record` | Decided US DOHA security-clearance cases and outcome statistics | https://www.clearancesearchengine.com/api/mcp |
| `io.github.KonstantinStarovoytov/agent-docs` | Official docs of Claude Code, Cursor, OpenAI Codex and MCP | https://agent-docs-mcp.onrender.com/mcp/ |
| `io.github.kreativeManish/iso20022-navigator` | ISO 20022 messages, bank transaction codes, legacy MT mappings and code sets | https://mcp.isonavigator.io/iso20022 |
| `io.github.krishnakaushik195/desidata-mcp` | Catalogue of India datasets with sources, licences and previews | https://lqcxdxjncdzzkwgveydz.supabase.co/functions/v1/mcp |
| `io.github.krupalghori44-dev/infyicon-mcp` | Over 161,000 free icons as SVG or PNG | https://infyicon.com/mcp |
| `io.github.ktozvonil/phone-lookup` | Caller reputation, spam rating and reviews for phone numbers | https://ktozvonil.net/mcp |
| `io.github.kylelloyd63-star/sourcetome` | Passages from a rights-cleared library of classic literature | https://sourcetome-public.onrender.com/mcp |
| `io.github.LAHutchins91/papers` | Peer-reviewed and preprint research papers with citations | https://papers-mcp.vercel.app/mcp |
| `io.github.LAHutchins91/patent` | US patents, claims, citations and prior art | https://patent-mcp.vercel.app/mcp |
| `io.github.laibniz/scholarfetch` | Scholarly papers, abstracts, full text, authors and references | https://laibniz-scholarfetch-web.hf.space/mcp/ |
| `io.github.LambdaLabsHQ/searchwire` | Keyword search volume, Google results, app store keywords and domain availability | https://searchwire.dev/mcp |
| `io.github.landedjobs/landed` | AI-native job listings, application forms and interview prep content | https://mcp.landed.jobs/mcp |
| `io.github.laravilt/laravilt` | Laravilt Laravel admin panel docs, packages, changelogs and plugin guide | https://mcp.laravilt.com/mcp |
| `io.github.Latina-Dev/latina-dev` | Latina software engineers directory plus communities, programs and job boards | https://latina.dev/mcp |
| `io.github.leejaejeon/beobi-daneun-got` | Korean statutes, precedents, business-district stats and public procurement | https://jake-asus.tail2c6a90.ts.net/law/mcp |
| `io.github.left-handed-grannies/comitelligence` | EU comitology committees, votes, dossiers and implementing-act documents | https://comitelligence-mcp.onrender.com/mcp |
| `io.github.legacyinmotion/sharegrokbots` | Shared Grok bots directory by function and category | https://mcp.sharegrokbots.com/mcp |
| `io.github.leo9/sota2` | AI solution rankings by industry and task, with company facts | https://www.sota2.com/mcp |
| `io.github.levin-staudt/contextatlas` | llms.txt, docs, MCP servers and skills for each tech stack tool | https://contextatlas.dev/mcp |
| `io.github.liad142/yedapo` | AI summaries of podcast and YouTube episodes | https://www.yedapo.com/api/mcp |
| `io.github.LightoninT/bestasiahotels` | Asian hotel guides, destination guides and hotel records | https://mcp.bestasiahotels.com/mcp |
| `io.github.LightsOutWorks/agent-commons` | Evidence-labeled methods for technical problems solved by agents | https://lightsoutworks.org/mcp |
| `io.github.Livvux/fivemdocs` | FiveM development guides, blip sprites, controls and ped names | https://fivemdocs.com/api/mcp |
| `io.github.Livvux/qbcore-docs` | QBCore framework APIs, resources and troubleshooting docs | https://qbcore.net/api/mcp |
| `io.github.Lodewijkheemskerk/syftly` | Best AI tool or API per task such as OCR or TTS | https://syftly.vercel.app/api/mcp |
| `io.github.LorgAI/lorg-mcp-server` | Peer-validated shared knowledge archive contributed by AI agents | https://api.lorg.ai/mcp |
| `io.github.ltvspot/library-of-alexandria` | Classic books in 25 languages with summaries and free chapters | https://mcp.libraryofalexandria.com/mcp |
| `io.github.magist-io/magist` | Product regulations, compliance requirements, controls and enforcement actions | https://magist.io/api/mcp |
| `io.github.mapbox/mcp-docs-server` | Mapbox documentation, API references, style specs and guides | https://mcp-docs.mapbox.com/mcp |
| `io.github.Marginpad/sdk` | Live crypto, stock and forex prices, candles, funding rates and open interest | https://marginpad.io/mcp |
| `io.github.MartinSA04/ntnu-mcp` | NTNU course catalog, timetables, grade distributions and exam logistics | https://ntnu-mcp.martinsundal.no/mcp |
| `io.github.matchawards/matchawards-mcp` | US government contracts, grants, awards and jobs | https://matchawards.com/mcp |
| `io.github.MatsClaes2/animehunt` | Anime, manga and webtoon catalog with recommendations and airing schedule | https://animehunt.co/api/mcp |
| `io.github.mattlsmith/navmds` | US doctors, patient reviews and procedure costs | https://www.navmds.com/api/mcp |
| `io.github.mattmireles/tesoro-help` | Tesoro High School public documents and parent information | https://tesoro.help/mcp |
| `io.github.maxand98/ab500-research` | Art Blocks artist dossiers and collector holding-duration data | https://ab5d.xyz/mcp |
| `io.github.Maxence/l2tools` | Lineage 2 NPC stats, drops, Soul Crystals and XP tables | https://l2tools.org/api/mcp |
| `io.github.mcp-dir/cnpj-mcp` | Brazilian company registry data: legal name, status, partners, lawsuits | https://api.mcp.ai/p_cnpj |
| `io.github.mcp-dir/cpf-mcp` | Brazilian CPF validation and lawsuit discovery from official gazettes | https://api.mcp.ai/p_cpf |
| `io.github.mcp-dir/datajud-mcp` | Brazilian court case metadata and docket movements from CNJ DataJud | https://api.mcp.ai/p_datajud |
| `io.github.mcp-dir/expo-mcp` | Expo and EAS documentation, SDK guides and library usage | https://api.mcp.ai/p_expo |
| `io.github.mcp-dir/fipe-mcp` | Brazilian FIPE reference prices for cars, motorcycles and trucks | https://api.mcp.ai/p_fipe |
| `io.github.mcp-dir/flightradar-mcp` | Live aircraft positions, military flights and airport information | https://api.mcp.ai/p_flightradar |
| `io.github.mcp-dir/inpi-mcp` | Brazilian trademark and patent records by name, process or holder | https://api.mcp.ai/p_inpi |
| `io.github.mcp-dir/jurisprudencia-mcp` | Brazilian case law, court decisions and binding precedents | https://api.mcp.ai/p_jurisprudencia |
| `io.github.mcp-dir/jus-mcp` | Brazilian lawsuits, court publications, case law, tenders and certificates | https://api.mcp.ai/jus |
| `io.github.mcp-dir/kb-mcp` | User's own uploaded documents, searchable by meaning | https://api.mcp.ai/p_kb |
| `io.github.mcp-dir/pncp-mcp` | Brazilian government tenders, public procurement notices, winners and edital documents | https://api.mcp.ai/p_pncp |
| `io.github.mcpexplorer/mcpexplorer` | MCP servers with install methods, risk labels and trust scores | https://mcpexplorer.com/mcp |
| `io.github.megabrainee/sectora` | CVE, EPSS, KEV and package vulnerability threat intelligence | https://mcp.sectora.io/mcp |
| `io.github.menghaoran214-lang/vibe-coding-cn` | Chinese vibe coding guides and documentation | https://n8n.xiaomeng.ink/mcp/vibe-coding-cn |
| `io.github.michaelcolenso/nobodynamed` | US baby name popularity by year from 1880 to 2025 | https://nobodynamed.com/mcp |
| `io.github.mikenguyen13/research-methods-mcp` | Research methods textbooks, study design guidance and statistics code | https://research-methods-mcp.vercel.app/mcp |
| `io.github.minsooparkk/korea-tax-law-mcp` | Korean tax statutes, court cases, tribunal decisions and NTS rulings | https://mcp.taxjarvis.com/mcp |
| `io.github.MInsYang/bioai-rizhi` | AI biopharma news, research abstracts and company directory | https://bioai-rizhi.pages.dev/mcp |
| `io.github.mjaskolski/developer-toolkit-mcp` | AI developer guides for Cursor, Claude and coding agents | https://developertoolkit.ai/mcp |
| `io.github.MkFastHQ/haitang` | Classical Chinese poetry by dynasty, author, theme and festival | https://haitang.app/mcp |
| `io.github.MkFastHQ/tanstarter` | TanStarter documentation | https://tanstarter.dev/mcp |
| `io.github.mkibrick/compshop` | Compensation surveys by industry, region and job title | https://www.comp-shop.com/api/mcp |
| `io.github.mkisama94/subsidy-ai` | Japanese subsidies, company registry and securities filing data | https://subsidy.ai-orchestration.jp/mcp |
| `io.github.MkSaaSHQ/mksaas` | MkSaaS documentation | https://mksaas.com/mcp |
| `io.github.MkThingsHQ/betterlaunch` | Directory of products launched on BetterLaunch by category and tag | https://betterlaunch.app/mcp |
| `io.github.MkThingsHQ/openfree` | Free and open-source AI tools for indie makers | https://openfree.tools/mcp |
| `io.github.modern-ai-inc/w0-mcp-server` | How often AI search recommends a brand first | https://w0-mcp-server.modernai.workers.dev |
| `io.github.monriah-studio/sec-edgar-mcp` | SEC filings, insider trades and XBRL financials of US companies | https://sec-edgar-api.kidriahx.workers.dev/mcp |
| `io.github.mooshee/untax` | County property assessment records and VA facilities and forms | https://untax.io/mcp |
| `io.github.mzizi-dev/mzizi-mcp` | Mzizi design system components, tokens, conventions and docs | https://mcp.mzizi.dev/mcp |
| `io.github.Nadeus/toolradar` | Software tool details, verified pricing, comparisons and alternatives | https://toolradar.com/api/mcp |
| `io.github.nalegaluorg/nalegalu` | Polish statutes and case law, article-level | https://mcp.nalegalu.org/mcp |
| `io.github.Natden444/pickanagency` | Directory of 47,000 marketing agencies with profiles | https://www.pickanagency.com/api/mcp/mcp |
| `io.github.natewhi/moltspace` | Directory of AI agents and their capabilities | https://moltspace.lol/mcp |
| `io.github.NathanYoshua/defaultbench` | Listings of agents, APIs, tools and MCP servers with evidence | https://defaultbench.com/mcp |
| `io.github.NavtejDhillon/grants` | New Zealand community grant funders, deadlines and application questions | https://funding.alltoohuman.nz/mcp |
| `io.github.neerajsohal/slate` | Electrik Slate Blade component documentation and blocks | https://mcp.slate.electrik.dev |
| `io.github.NeoDemosHQ/neodemos` | Dutch municipal council records and civic documents | https://mcp.neodemos.nl/public/mcp |
| `io.github.NeousAxis/aya-registry` | Registry of 367,000 verified businesses worldwide | https://ai-visionary.xyz/agents/mcp |
| `io.github.newspacemarket-com/mrd` | Spacecraft component specs from vendor datasheets | https://newspacemarket.com/mrd-connect/mcp |
| `io.github.nibinglobal/yugalinks-commerce` | OECD trade flows by country, product and corridor | https://www.yugalinks.com/mcp |
| `io.github.nicoletterankin/orb-platform` | English word definitions, related words and vocabulary lessons | https://wordorb.ai/mcp |
| `io.github.nifrajs/nifra-docs` | Nifra framework docs, code examples and TypeScript API types | https://mcp.nifra.dev |
| `io.github.Nimistu/dokumendiregister-mcp` | Estonian public authority documents and links to companies | https://dokumendiregister.ee/api/dokreg-mcp/mcp |
| `io.github.Nimistu/lahend-mcp` | Estonian court decisions and statutes with citation links | https://lahend.ee/api/lahend-mcp/mcp |
| `io.github.nimitt-IN/india-cyber-regulations` | Indian cyber regulations and incident-reporting deadlines in India, US, EU | https://www.bitscore.in/mcp |
| `io.github.nirajagarwal/bible-mcp` | Bible text, Greek and Hebrew interlinear data, cross-references | https://bible-mcp-server.fly.dev/mcp |
| `io.github.NitroRCr/gread` | Source code and docs of public GitHub repositories | https://api.gread.dev/mcp |
| `io.github.notforhumansfun-rgb/not-for-humans` | NFH project knowledge, ownership epochs and learning documents | https://mcp.notforhumans.fun/mcp |
| `io.github.nu-people/nue-people-jobs` | Open jobs at nu people with contract types and skills | https://www.nuepeople.com/mcp |
| `io.github.Nutlope/inspo` | Real production websites with palettes, fonts and design analysis | https://inspomcp.dev/api/mcp |
| `io.github.Nuvraxis/nuvui` | nuvui React UI library docs, blocks, charts and design tokens | https://nuvui.nuvraxis.com/mcp |
| `io.github.nyuchi/nyuchi-docs` | Nyuchi product documentation pages | https://docs.nyuchi.com/mcp |
| `io.github.nyyhao/aiagentslisting` | Directory of AI agents, MCP servers and skills | https://aiagentslisting.com/api/mcp |
| `io.github.OCArk/coinverdict` | Daily crypto research verdicts, key levels and track records for coins | https://mcp.coinverdict.io/mcp |
| `io.github.ofershap/recipe-library` | Hebrew AI-agent recipes with full text | https://recipes.gitshow.dev/mcp |
| `io.github.OjasKord/tender-mcp` | Active government tenders in UK, EU and US | https://tender-mcp-production.up.railway.app |
| `io.github.ondraulehla/mcpcost` | Health and token cost of remote MCP registry servers | https://mcpcost.ulehla.dev/mcp |
| `io.github.onehumanbeing/hack123` | Hackathons, team-up posts and projects listed on Hack123 | https://hack123.henryht.sh/api/mcp |
| `io.github.op0ai/iconlab` | Over 324,000 Lucide-style icons as SVG | https://iconlab.skillkit.run/mcp |
| `io.github.open-mtor-atlas/mtor-atlas` | mTOR pathway studies, entities, claims and evidence labels | https://mtor-atlas-mcp.mtor-atlas.workers.dev/mcp |
| `io.github.OpenConverters/kelvin` | Power electronics component specs, selection and cross-references | https://kelvin.openconverters.com/mcp |
| `io.github.openqfr-dev/openqfr` | Public evidence of failed quantitative trading strategies | https://openqfr.dev/mcp |
| `io.github.OptimNow/cloud-finops` | Cloud cost optimization guidance and waste-fixing runbooks | https://mcp.optimnow.io/mcp |
| `io.github.OrderlyNetwork/orderly-mcp` | Orderly Network documentation, contracts and SDK patterns | https://mcp.orderly.network/ |
| `io.github.outdoorithm/outdoorithm` | US campgrounds with availability, weather, safety and gear info | https://mcp.outdoorithm.com/mcp |
| `io.github.papjuli/xkcdai` | xkcd comics found by semantic search | https://xkcdai.onrender.com/mcp |
| `io.github.parallect/prxhub` | Shared research bundles and extracted claims on prxhub | https://prxhub.com/api/mcp |
| `io.github.parfica/fragrances` | Fragrance notes, accords, perfumers and similar-scent dupes | https://parfica.com/mcp |
| `io.github.parkragsterman/whyismy-org` | Sourced answers to everyday why-is-my questions on health, home, cars | https://whyismy.org/mcp |
| `io.github.paul-salviani/trust-switchboard` | Public privacy policies with dated excerpts and change comparisons | https://170.64.146.185.sslip.io/mcp |
| `io.github.paulieb89/pinescript-mcp` | Pine Script v6 documentation and function reference | https://pinescript-mcp.fly.dev/mcp |
| `io.github.paulieb89/uk-legal-mcp` | UK case law, legislation, Hansard, bills and committees | https://uk-legal-mcp.fly.dev/mcp |
| `io.github.pawel-kowalczyk/harness-atlas` | Wire-harness and cable-assembly manufacturers by country and capability | https://harnessatlas.com/api/mcp |
| `io.github.pcfhub/pcfhub` | Power Apps PCF controls and their documentation | https://pcfhub.dev/mcp |
| `io.github.pcmarts/recruiter-roles-mcp` | Recruiter and talent acquisition job listings and market stats | https://recruiterroles.com/api/mcp |
| `io.github.peterloomans/equivista` | Belgian company registry data, financials and relationships | https://equivista.be/mcp |
| `io.github.petitsolu/solubles` | French solutions journalism podcast on ecology, climate and society | https://mcp.csoluble.media/api/mcp |
| `io.github.PetShopBros/lowdown-proxy` | Recorded facts about MCP servers: registry declarations and npm package status | https://lowdown-proxy.vercel.app/mcp |
| `io.github.pgeneralpl/edgar-entity-mcp` | SEC EDGAR filings, XBRL financials, insider trades, state entity records | https://edgar-entity-mcp.vercel.app/mcp |
| `io.github.pguerrerolinares/bizkaia-now` | Cultural and nightlife events in Bizkaia, Spain | https://euskadinow.com/mcp |
| `io.github.PilotSuite/crystalram-open-commons` | CrystalRAM public AI research cycles and Open Commons discussion threads | https://crystalram.ai/mcp |
| `io.github.pinkpwningclub/recipes` | Software options and reproducible AI agent workflow recipes | https://softwaresausage.com/api/mcp |
| `io.github.pipeworx-io/abn-lookup` | Australian Business Register ABN company records | https://gateway.pipeworx.io/abn-lookup/mcp |
| `io.github.pipeworx-io/alaska-code` | Alaska state statutes by citation and topic | https://gateway.pipeworx.io/alaska-code/mcp |
| `io.github.pipeworx-io/altos` | US real estate market intelligence from Altos Research | https://gateway.pipeworx.io/altos/mcp |
| `io.github.pipeworx-io/american-samoa-code` | American Samoa Code Annotated statutes by citation and keyword | https://gateway.pipeworx.io/american-samoa-code/mcp |
| `io.github.pipeworx-io/arcgis-hub` | Open government geospatial datasets from ArcGIS Hub | https://gateway.pipeworx.io/arcgis-hub/mcp |
| `io.github.pipeworx-io/ares-cz` | Czech companies and sole traders from the ARES business register | https://gateway.pipeworx.io/ares-cz/mcp |
| `io.github.pipeworx-io/arkansas-code` | Arkansas state statutes by citation and topic | https://gateway.pipeworx.io/arkansas-code/mcp |
| `io.github.pipeworx-io/arquivo-pt` | Full-text search of the Portuguese web archive | https://gateway.pipeworx.io/arquivo-pt/mcp |
| `io.github.pipeworx-io/arxiv` | arXiv preprint papers across science and mathematics | https://gateway.pipeworx.io/arxiv/mcp |
| `io.github.pipeworx-io/asub-ax` | Official statistics for the Aland Islands | https://gateway.pipeworx.io/asub-ax/mcp |
| `io.github.pipeworx-io/at-ris` | Austrian federal law and case law | https://gateway.pipeworx.io/at-ris/mcp |
| `io.github.pipeworx-io/banking-regulations` | US banking and consumer finance rules in 12 CFR | https://gateway.pipeworx.io/banking-regulations/mcp |
| `io.github.pipeworx-io/bing-news` | Keyword news search results via Bing News | https://gateway.pipeworx.io/bing-news/mcp |
| `io.github.pipeworx-io/bnr-ro` | National Bank of Romania foreign exchange reference rates | https://gateway.pipeworx.io/bnr-ro/mcp |
| `io.github.pipeworx-io/bonanza` | Bonanza marketplace item search and detail | https://gateway.pipeworx.io/bonanza/mcp |
| `io.github.pipeworx-io/brave-search` | Web search results from the Brave independent index | https://gateway.pipeworx.io/brave-search/mcp |
| `io.github.pipeworx-io/brokercheck` | FINRA brokers, advisers and firm disciplinary records | https://gateway.pipeworx.io/brokercheck/mcp |
| `io.github.pipeworx-io/cali-elangdell` | Free US law-school casebooks and course materials | https://gateway.pipeworx.io/cali-elangdell/mcp |
| `io.github.pipeworx-io/california-tax-appeals` | California Office of Tax Appeals opinions by statute and topic | https://gateway.pipeworx.io/california-tax-appeals/mcp |
| `io.github.pipeworx-io/censys` | Internet-wide scan data on hosts and certificates from Censys | https://gateway.pipeworx.io/censys/mcp |
| `io.github.pipeworx-io/china-news` | News from China, Hong Kong and Taiwan | https://gateway.pipeworx.io/china-news/mcp |
| `io.github.pipeworx-io/chrome-web-store` | Chrome Web Store extension listings and search | https://gateway.pipeworx.io/chrome-web-store/mcp |
| `io.github.pipeworx-io/chronicling-america` | Full text of 150 years of digitized US newspapers | https://gateway.pipeworx.io/chronicling-america/mcp |
| `io.github.pipeworx-io/circl-vulnerability-lookup` | Aggregated software vulnerability records from CIRCL | https://gateway.pipeworx.io/circl-vulnerability-lookup/mcp |
| `io.github.pipeworx-io/clinicaltables` | NIH clinical code tables such as conditions, drugs and genes | https://gateway.pipeworx.io/clinicaltables/mcp |
| `io.github.pipeworx-io/clinicaltrials` | ClinicalTrials.gov trials by condition, drug, status and phase | https://gateway.pipeworx.io/clinicaltrials/mcp |
| `io.github.pipeworx-io/cn-law` | Mainland China national laws and legislation | https://gateway.pipeworx.io/cn-law/mcp |
| `io.github.pipeworx-io/cnpj-br` | Brazilian company registry records from Receita Federal | https://gateway.pipeworx.io/cnpj-br/mcp |
| `io.github.pipeworx-io/commons-wikimedia` | Wikimedia Commons files and metadata | https://gateway.pipeworx.io/commons-wikimedia/mcp |
| `io.github.pipeworx-io/congress` | US Congress bills, laws and members | https://gateway.pipeworx.io/congress/mcp |
| `io.github.pipeworx-io/congressional-documents` | Official record of the US Congress, full text | https://gateway.pipeworx.io/congressional-documents/mcp |
| `io.github.pipeworx-io/copernicus-cds` | Copernicus Climate Data Store dataset catalogue | https://gateway.pipeworx.io/copernicus-cds/mcp |
| `io.github.pipeworx-io/core-research` | Open access academic research papers from CORE | https://gateway.pipeworx.io/core-research/mcp |
| `io.github.pipeworx-io/cornell-wex` | Cornell LII legal dictionary and encyclopedia | https://gateway.pipeworx.io/cornell-wex/mcp |
| `io.github.pipeworx-io/court-listener` | US court opinions and dockets from CourtListener | https://gateway.pipeworx.io/court-listener/mcp |
| `io.github.pipeworx-io/cricsheet` | Ball-by-ball cricket match, player and team data | https://gateway.pipeworx.io/cricsheet/mcp |
| `io.github.pipeworx-io/crossref` | Academic paper metadata and DOIs from Crossref | https://gateway.pipeworx.io/crossref/mcp |
| `io.github.pipeworx-io/crs-reports` | Congressional Research Service nonpartisan policy reports | https://gateway.pipeworx.io/crs-reports/mcp |
| `io.github.pipeworx-io/crtsh` | Certificate Transparency log records by domain | https://gateway.pipeworx.io/crtsh/mcp |
| `io.github.pipeworx-io/dart-kr` | Korean company disclosure filings from DART | https://gateway.pipeworx.io/dart-kr/mcp |
| `io.github.pipeworx-io/datacite` | DOIs and metadata for research datasets | https://gateway.pipeworx.io/datacite/mcp |
| `io.github.pipeworx-io/dbpedia` | Structured facts derived from Wikipedia | https://gateway.pipeworx.io/dbpedia/mcp |
| `io.github.pipeworx-io/dc-code` | District of Columbia statutes by citation and topic | https://gateway.pipeworx.io/dc-code/mcp |
| `io.github.pipeworx-io/de-gesetze` | German federal statutes and ordinances | https://gateway.pipeworx.io/de-gesetze/mcp |
| `io.github.pipeworx-io/delaware-code` | Delaware state statutes with amendment history | https://gateway.pipeworx.io/delaware-code/mcp |
| `io.github.pipeworx-io/diffbot` | Company facts from the Diffbot knowledge graph | https://gateway.pipeworx.io/diffbot/mcp |
| `io.github.pipeworx-io/earth-search` | Sentinel and Landsat satellite imagery catalogue | https://gateway.pipeworx.io/earth-search/mcp |
| `io.github.pipeworx-io/ebi-ols` | Biomedical ontology terms from EBI Ontology Lookup Service | https://gateway.pipeworx.io/ebi-ols/mcp |
| `io.github.pipeworx-io/ecfr` | US Code of Federal Regulations current text | https://gateway.pipeworx.io/ecfr/mcp |
| `io.github.pipeworx-io/eol` | Species information from the Encyclopedia of Life | https://gateway.pipeworx.io/eol/mcp |
| `io.github.pipeworx-io/epa-regulations` | US EPA environmental regulations in 40 CFR | https://gateway.pipeworx.io/epa-regulations/mcp |
| `io.github.pipeworx-io/epstein` | Epstein investigation document corpus | https://gateway.pipeworx.io/epstein/mcp |
| `io.github.pipeworx-io/esma-firds` | EU financial instrument reference data and MiFID authorisations | https://gateway.pipeworx.io/esma-firds/mcp |
| `io.github.pipeworx-io/eu-funding-tenders` | EU funding calls and public tenders | https://gateway.pipeworx.io/eu-funding-tenders/mcp |
| `io.github.pipeworx-io/euipo` | EU trademarks and registered community designs | https://gateway.pipeworx.io/euipo/mcp |
| `io.github.pipeworx-io/eur-lex` | Official EU law, article-level | https://gateway.pipeworx.io/eur-lex/mcp |
| `io.github.pipeworx-io/exa` | Semantic web search and page content | https://gateway.pipeworx.io/exa/mcp |
| `io.github.pipeworx-io/faa-regulations` | US Federal Aviation Regulations in 14 CFR | https://gateway.pipeworx.io/faa-regulations/mcp |
| `io.github.pipeworx-io/fcc-ecfs` | FCC public comment filings and proceedings | https://gateway.pipeworx.io/fcc-ecfs/mcp |
| `io.github.pipeworx-io/fcc-regulations` | US FCC communications rules in 47 CFR | https://gateway.pipeworx.io/fcc-regulations/mcp |
| `io.github.pipeworx-io/fda-regulations` | US FDA food and drug regulations in 21 CFR | https://gateway.pipeworx.io/fda-regulations/mcp |
| `io.github.pipeworx-io/ferc-elibrary` | FERC energy regulatory dockets and documents | https://gateway.pipeworx.io/ferc-elibrary/mcp |
| `io.github.pipeworx-io/form5500` | US employee benefit plan Form 5500 filings | https://gateway.pipeworx.io/form5500/mcp |
| `io.github.pipeworx-io/fr-judilibre` | French court decisions including Cour de cassation | https://gateway.pipeworx.io/fr-judilibre/mcp |
| `io.github.pipeworx-io/france-geodata` | French public geodata for point and radius questions | https://gateway.pipeworx.io/france-geodata/mcp |
| `io.github.pipeworx-io/geo-reconcile` | Matching Wikidata entities to OpenStreetMap places | https://gateway.pipeworx.io/geo-reconcile/mcp |
| `io.github.pipeworx-io/georgia-code` | Georgia state statutes (O.C.G.A.) by citation and topic | https://gateway.pipeworx.io/georgia-code/mcp |
| `io.github.pipeworx-io/gnews` | Global news articles searchable by keyword | https://gateway.pipeworx.io/gnews/mcp |
| `io.github.pipeworx-io/gov-uk-content` | UK government guidance and services content from GOV.UK | https://gateway.pipeworx.io/gov-uk-content/mcp |
| `io.github.pipeworx-io/guam-code` | Guam Code Annotated statute sections | https://gateway.pipeworx.io/guam-code/mcp |
| `io.github.pipeworx-io/gwas-catalog` | Genome-wide association studies linking genetic variants to traits | https://gateway.pipeworx.io/gwas-catalog/mcp |
| `io.github.pipeworx-io/hackernews` | Hacker News stories and discussions | https://gateway.pipeworx.io/hackernews/mcp |
| `io.github.pipeworx-io/hal-fr` | French open research archive papers and preprints | https://gateway.pipeworx.io/hal-fr/mcp |
| `io.github.pipeworx-io/herb-tcm` | Traditional Chinese Medicine herbs, ingredients, targets and diseases | https://gateway.pipeworx.io/herb-tcm/mcp |
| `io.github.pipeworx-io/hk-companies` | Hong Kong registered companies open data | https://gateway.pipeworx.io/hk-companies/mcp |
| `io.github.pipeworx-io/httpstatus` | HTTP status code meanings | https://gateway.pipeworx.io/httpstatus/mcp |
| `io.github.pipeworx-io/hudoc` | European Court of Human Rights case law | https://gateway.pipeworx.io/hudoc/mcp |
| `io.github.pipeworx-io/i-ching` | I Ching hexagrams and their traditional texts | https://gateway.pipeworx.io/i-ching/mcp |
| `io.github.pipeworx-io/iati-datastore` | International aid and development activities published under IATI | https://gateway.pipeworx.io/iati-datastore/mcp |
| `io.github.pipeworx-io/ieee-standards` | IEEE Xplore papers and standards metadata | https://gateway.pipeworx.io/ieee-standards/mcp |
| `io.github.pipeworx-io/ifsc-in` | Indian bank branch details from IFSC codes | https://gateway.pipeworx.io/ifsc-in/mcp |
| `io.github.pipeworx-io/igdb` | Video game catalogue: titles, platforms, releases, companies | https://gateway.pipeworx.io/igdb/mcp |
| `io.github.pipeworx-io/illinois-code` | Illinois Compiled Statutes by citation and topic | https://gateway.pipeworx.io/illinois-code/mcp |
| `io.github.pipeworx-io/indiana-code` | Indiana Code statutes including historical yearly versions | https://gateway.pipeworx.io/indiana-code/mcp |
| `io.github.pipeworx-io/indonesia-law` | Indonesian national laws and Constitutional Court decisions | https://gateway.pipeworx.io/indonesia-law/mcp |
| `io.github.pipeworx-io/ip-australia` | Australian patents, trade marks, designs and patent legal status | https://gateway.pipeworx.io/ip-australia/mcp |
| `io.github.pipeworx-io/iplookup` | Geolocation and network owner details for IP addresses | https://gateway.pipeworx.io/iplookup/mcp |
| `io.github.pipeworx-io/it-admin-courts` | Italian administrative court rulings (Consiglio di Stato, TAR) | https://gateway.pipeworx.io/it-admin-courts/mcp |
| `io.github.pipeworx-io/itunes-search` | Apple catalog of apps, music, movies and podcasts | https://gateway.pipeworx.io/itunes-search/mcp |
| `io.github.pipeworx-io/japan-law` | Japanese national laws and ordinances | https://gateway.pipeworx.io/japan-law/mcp |
| `io.github.pipeworx-io/jhtdb` | Reference turbulence simulation data for fluid dynamics | https://gateway.pipeworx.io/jhtdb/mcp |
| `io.github.pipeworx-io/jina-reader` | Web search results and web pages as clean markdown | https://gateway.pipeworx.io/jina-reader/mcp |
| `io.github.pipeworx-io/kegg` | Genes, pathways, diseases and drugs from KEGG | https://gateway.pipeworx.io/kegg/mcp |
| `io.github.pipeworx-io/kokkai-diet` | Japan National Diet proceedings and speeches | https://gateway.pipeworx.io/kokkai-diet/mcp |
| `io.github.pipeworx-io/kosis-kr` | Korean national statistics time series | https://gateway.pipeworx.io/kosis-kr/mcp |
| `io.github.pipeworx-io/kr-law` | South Korean national statutes | https://gateway.pipeworx.io/kr-law/mcp |
| `io.github.pipeworx-io/law-commission` | Law Commission of England and Wales reports and reform projects | https://gateway.pipeworx.io/law-commission/mcp |
| `io.github.pipeworx-io/law-feeds` | Legal news and updates from law feeds | https://gateway.pipeworx.io/law-feeds/mcp |
| `io.github.pipeworx-io/louisiana-code` | Louisiana statutes, civil code and procedure codes | https://gateway.pipeworx.io/louisiana-code/mcp |
| `io.github.pipeworx-io/lyrics-ovh` | Song lyrics by artist and title | https://gateway.pipeworx.io/lyrics-ovh/mcp |
| `io.github.pipeworx-io/macvendors` | Hardware manufacturer for a MAC address | https://gateway.pipeworx.io/macvendors/mcp |
| `io.github.pipeworx-io/marginalia` | Independent non-commercial web search index | https://gateway.pipeworx.io/marginalia/mcp |
| `io.github.pipeworx-io/massachusetts-code` | Massachusetts General Laws by citation | https://gateway.pipeworx.io/massachusetts-code/mcp |
| `io.github.pipeworx-io/mdn-search` | MDN web development documentation | https://gateway.pipeworx.io/mdn-search/mcp |
| `io.github.pipeworx-io/michigan-code` | Michigan Compiled Laws by citation | https://gateway.pipeworx.io/michigan-code/mcp |
| `io.github.pipeworx-io/mime` | MIME types and file extensions | https://gateway.pipeworx.io/mime/mcp |
| `io.github.pipeworx-io/monarch-initiative` | Biomedical knowledge graph of genes, diseases and phenotypes | https://gateway.pipeworx.io/monarch-initiative/mcp |
| `io.github.pipeworx-io/movies` | Movies and TV shows catalog | https://gateway.pipeworx.io/movies/mcp |
| `io.github.pipeworx-io/msha-mines` | US mine records by operator, name or MSHA ID | https://gateway.pipeworx.io/msha-mines/mcp |
| `io.github.pipeworx-io/mygene-info` | Gene annotations and identifiers across species | https://gateway.pipeworx.io/mygene-info/mcp |
| `io.github.pipeworx-io/nber-macrohistory` | Historical macroeconomic time series from NBER | https://gateway.pipeworx.io/nber-macrohistory/mcp |
| `io.github.pipeworx-io/ncbi-datasets` | Genome, gene and taxonomy reference data from NCBI | https://gateway.pipeworx.io/ncbi-datasets/mcp |
| `io.github.pipeworx-io/ncbi-eutils` | NCBI Entrez databases including PubMed literature and genes | https://gateway.pipeworx.io/ncbi-eutils/mcp |
| `io.github.pipeworx-io/nci-evs` | NCI Thesaurus and cancer research vocabularies | https://gateway.pipeworx.io/nci-evs/mcp |
| `io.github.pipeworx-io/new-jersey-code` | New Jersey Statutes with amendment history | https://gateway.pipeworx.io/new-jersey-code/mcp |
| `io.github.pipeworx-io/new-mexico-code` | New Mexico Statutes Annotated sections | https://gateway.pipeworx.io/new-mexico-code/mcp |
| `io.github.pipeworx-io/new-york-code` | New York Consolidated Laws by citation | https://gateway.pipeworx.io/new-york-code/mcp |
| `io.github.pipeworx-io/nih-reporter` | NIH-funded research projects and grants | https://gateway.pipeworx.io/nih-reporter/mcp |
| `io.github.pipeworx-io/nihr` | UK NIHR health research funding and studies | https://gateway.pipeworx.io/nihr/mcp |
| `io.github.pipeworx-io/nl-rechtspraak` | Dutch court decisions and conclusions | https://gateway.pipeworx.io/nl-rechtspraak/mcp |
| `io.github.pipeworx-io/nlrb` | US labor board unfair labor practice and election cases | https://gateway.pipeworx.io/nlrb/mcp |
| `io.github.pipeworx-io/north-carolina-code` | North Carolina General Statutes by citation and topic | https://gateway.pipeworx.io/north-carolina-code/mcp |
| `io.github.pipeworx-io/octopart` | Electronic component specs, stock and pricing | https://gateway.pipeworx.io/octopart/mcp |
| `io.github.pipeworx-io/oeis` | Integer sequences from the On-Line Encyclopedia | https://gateway.pipeworx.io/oeis/mcp |
| `io.github.pipeworx-io/oklahoma-code` | Oklahoma Statutes with full text and amendment history | https://gateway.pipeworx.io/oklahoma-code/mcp |
| `io.github.pipeworx-io/openaire` | EU research publications, datasets, software and projects | https://gateway.pipeworx.io/openaire/mcp |
| `io.github.pipeworx-io/openfda` | FDA drug adverse events and safety signals | https://gateway.pipeworx.io/openfda/mcp |
| `io.github.pipeworx-io/openfoodtox` | EFSA reference values for chemicals in food and feed | https://gateway.pipeworx.io/openfoodtox/mcp |
| `io.github.pipeworx-io/openremedies` | Sourced treatment records and approved medicines by condition | https://gateway.pipeworx.io/openremedies/mcp |
| `io.github.pipeworx-io/opentargets` | Disease, drug target and drug associations | https://gateway.pipeworx.io/opentargets/mcp |
| `io.github.pipeworx-io/openverse` | Creative Commons licensed images and audio | https://gateway.pipeworx.io/openverse/mcp |
| `io.github.pipeworx-io/pacer` | US federal court cases and parties | https://gateway.pipeworx.io/pacer/mcp |
| `io.github.pipeworx-io/paperswithcode` | Machine learning research papers and code | https://gateway.pipeworx.io/paperswithcode/mcp |
| `io.github.pipeworx-io/peeringdb` | Internet networks, ASNs and peering facilities | https://gateway.pipeworx.io/peeringdb/mcp |
| `io.github.pipeworx-io/peppol` | Peppol e-invoicing network participants | https://gateway.pipeworx.io/peppol/mcp |
| `io.github.pipeworx-io/pipeworx-faq` | Answers about Pipeworx itself, pricing and usage | https://gateway.pipeworx.io/pipeworx-faq/mcp |
| `io.github.pipeworx-io/planetary-computer` | Earth observation imagery and geospatial dataset catalogue | https://gateway.pipeworx.io/planetary-computer/mcp |
| `io.github.pipeworx-io/plos` | Open access articles from PLOS journals | https://gateway.pipeworx.io/plos/mcp |
| `io.github.pipeworx-io/poshmark-comps` | Sold prices of items on Poshmark | https://gateway.pipeworx.io/poshmark-comps/mcp |
| `io.github.pipeworx-io/pubtator` | Biomedical literature with annotated genes, diseases and chemicals | https://gateway.pipeworx.io/pubtator/mcp |
| `io.github.pipeworx-io/puerto-rico-code` | Puerto Rico laws and acts by section | https://gateway.pipeworx.io/puerto-rico-code/mcp |
| `io.github.pipeworx-io/reactome` | Biological pathways and reactions | https://gateway.pipeworx.io/reactome/mcp |
| `io.github.pipeworx-io/realestateapi` | US property records and details | https://gateway.pipeworx.io/realestateapi/mcp |
| `io.github.pipeworx-io/reddit-archive` | Historical Reddit posts, comments and subreddit activity | https://gateway.pipeworx.io/reddit-archive/mcp |
| `io.github.pipeworx-io/regulations-gov` | US federal regulatory dockets, documents and public comments | https://gateway.pipeworx.io/regulations-gov/mcp |
| `io.github.pipeworx-io/research-chain` | Open full text, licenses, datasets and code around a paper | https://gateway.pipeworx.io/research-chain/mcp |
| `io.github.pipeworx-io/retractions` | Retracted research papers and research integrity | https://gateway.pipeworx.io/retractions/mcp |
| `io.github.pipeworx-io/rhode-island-code` | Rhode Island General Laws by citation | https://gateway.pipeworx.io/rhode-island-code/mcp |
| `io.github.pipeworx-io/ror` | Research organizations and institutions registry | https://gateway.pipeworx.io/ror/mcp |
| `io.github.pipeworx-io/scotcourts` | Scottish court and tribunal judgments | https://gateway.pipeworx.io/scotcourts/mcp |
| `io.github.pipeworx-io/sec-adv` | SEC registered investment adviser Form ADV disclosures | https://gateway.pipeworx.io/sec-adv/mcp |
| `io.github.pipeworx-io/sec-insider` | SEC insider trading filings (Forms 3, 4, 5) | https://gateway.pipeworx.io/sec-insider/mcp |
| `io.github.pipeworx-io/sec-regulations` | US securities regulations (17 CFR) | https://gateway.pipeworx.io/sec-regulations/mcp |
| `io.github.pipeworx-io/semanticscholar` | Academic papers, authors and citations | https://gateway.pipeworx.io/semanticscholar/mcp |
| `io.github.pipeworx-io/south-carolina-code` | South Carolina Code of Laws by citation | https://gateway.pipeworx.io/south-carolina-code/mcp |
| `io.github.pipeworx-io/south-dakota-code` | South Dakota Codified Laws by citation and topic | https://gateway.pipeworx.io/south-dakota-code/mcp |
| `io.github.pipeworx-io/sportmonks` | Football fixtures, teams, players and match data | https://gateway.pipeworx.io/sportmonks/mcp |
| `io.github.pipeworx-io/stats-nz` | New Zealand official statistics datasets | https://gateway.pipeworx.io/stats-nz/mcp |
| `io.github.pipeworx-io/studio-ghibli` | Studio Ghibli films, characters and locations | https://gateway.pipeworx.io/studio-ghibli/mcp |
| `io.github.pipeworx-io/tatoeba` | Multilingual example sentences and translations | https://gateway.pipeworx.io/tatoeba/mcp |
| `io.github.pipeworx-io/tax-regulations` | US Treasury and IRS tax regulations (26 CFR) | https://gateway.pipeworx.io/tax-regulations/mcp |
| `io.github.pipeworx-io/texas-ag-opinions` | Texas Attorney General opinions and statute treatment | https://gateway.pipeworx.io/texas-ag-opinions/mcp |
| `io.github.pipeworx-io/themeparks` | Theme park wait times, schedules and attractions | https://gateway.pipeworx.io/themeparks/mcp |
| `io.github.pipeworx-io/trade-compliance` | Import tariff and trade compliance rules for importers | https://gateway.pipeworx.io/trade-compliance/mcp |
| `io.github.pipeworx-io/trademarks` | US trademark records | https://gateway.pipeworx.io/trademarks/mcp |
| `io.github.pipeworx-io/trimet` | Portland transit arrivals, stops and service alerts | https://gateway.pipeworx.io/trimet/mcp |
| `io.github.pipeworx-io/tw-law` | Taiwan statutes and Constitution | https://gateway.pipeworx.io/tw-law/mcp |
| `io.github.pipeworx-io/ucsc-genome` | Reference genome assemblies and annotation tracks | https://gateway.pipeworx.io/ucsc-genome/mcp |
| `io.github.pipeworx-io/uk-caselaw` | UK court judgments from Find Case Law | https://gateway.pipeworx.io/uk-caselaw/mcp |
| `io.github.pipeworx-io/uk-charity-commission` | Registered charities in England and Wales | https://gateway.pipeworx.io/uk-charity-commission/mcp |
| `io.github.pipeworx-io/uk-trade-tariff` | UK commodity codes, duties and import rules | https://gateway.pipeworx.io/uk-trade-tariff/mcp |
| `io.github.pipeworx-io/uk-tribunals` | UK first-tier tribunal decisions | https://gateway.pipeworx.io/uk-tribunals/mcp |
| `io.github.pipeworx-io/ukri-gtr` | UK research council grants and funded projects | https://gateway.pipeworx.io/ukri-gtr/mcp |
| `io.github.pipeworx-io/unpaywall` | Open access availability of scholarly papers | https://gateway.pipeworx.io/unpaywall/mcp |
| `io.github.pipeworx-io/us-national-archives` | US National Archives permanent government records catalog | https://gateway.pipeworx.io/us-national-archives/mcp |
| `io.github.pipeworx-io/utah-code` | Utah Code statutes by citation and topic | https://gateway.pipeworx.io/utah-code/mcp |
| `io.github.pipeworx-io/valorant` | VALORANT agents, weapons, maps and game data | https://gateway.pipeworx.io/valorant/mcp |
| `io.github.pipeworx-io/vendor-signals` | Vendor documentation and changelog changes | https://gateway.pipeworx.io/vendor-signals/mcp |
| `io.github.pipeworx-io/w3c` | W3C web standards and browser specifications | https://gateway.pipeworx.io/w3c/mcp |
| `io.github.pipeworx-io/washington-code` | Washington state RCW statutes and regulations | https://gateway.pipeworx.io/washington-code/mcp |
| `io.github.pipeworx-io/who-ictrp` | Clinical trials from registries worldwide via WHO | https://gateway.pipeworx.io/who-ictrp/mcp |
| `io.github.pipeworx-io/wikidata` | Structured facts about entities from Wikidata | https://gateway.pipeworx.io/wikidata/mcp |
| `io.github.pipeworx-io/wikidata-sparql` | Wikidata facts queryable with SPARQL | https://gateway.pipeworx.io/wikidata-sparql/mcp |
| `io.github.pipeworx-io/wikifeed` | Wikipedia featured articles, trending and on-this-day content | https://gateway.pipeworx.io/wikifeed/mcp |
| `io.github.pipeworx-io/wikimedia-rest` | Wikipedia page summaries and content via Wikimedia | https://gateway.pipeworx.io/wikimedia-rest/mcp |
| `io.github.pipeworx-io/wikipathways` | Community curated biological pathways | https://gateway.pipeworx.io/wikipathways/mcp |
| `io.github.pipeworx-io/wikipedia` | Wikipedia encyclopedia articles | https://gateway.pipeworx.io/wikipedia/mcp |
| `io.github.pipeworx-io/wikiquote` | Sourced quotations by person and topic | https://gateway.pipeworx.io/wikiquote/mcp |
| `io.github.pipeworx-io/wikiviews` | Wikipedia page view statistics | https://gateway.pipeworx.io/wikiviews/mcp |
| `io.github.pipeworx-io/wiktionary` | Multilingual dictionary definitions and etymology | https://gateway.pipeworx.io/wiktionary/mcp |
| `io.github.pipeworx-io/worldbank-climate` | Climate data and projections by country from World Bank | https://gateway.pipeworx.io/worldbank-climate/mcp |
| `io.github.pipeworx-io/xposedornot` | Data breaches an email address has been exposed in | https://gateway.pipeworx.io/xposedornot/mcp |
| `io.github.pipeworx-io/zillow` | US housing market research data from Zillow | https://gateway.pipeworx.io/zillow/mcp |
| `io.github.ply-ui-ng/ply-ui` | Ply Angular and Tailwind UI components and usage | https://mcp.ply-ui.com/mcp |
| `io.github.pmndrs/docs` | Docs and examples for react-three-fiber, drei, zustand, jotai | https://docs.pmnd.rs/api/mcp |
| `io.github.posdo-io/mcp-server` | 356,000 restaurants in 20 countries with reviews and context | https://pos.do/mcp |
| `io.github.pournasserian/mcp-my-site` | Content of one website indexed by a crawler | https://ai.pournasserian.com/mcp |
| `io.github.pradeep-anantha/venuvidya` | Carnatic flute lessons and syllabus in Kannada and English | https://venuvidya-backend-production.up.railway.app/api/mcp/ |
| `io.github.prakhar1605/carrerlift` | Indian jobs and internships, plus international intern roles | https://www.carrerlift.in/api/mcp |
| `io.github.praveenjuge/vadivam` | Outline icons searchable by name, tag or category | https://vadivam.praveenjuge.com/mcp |
| `io.github.privatebydefault/default-privacy` | How private apps are, privacy tools and breaches | https://mcp.defaultprivacy.com |
| `io.github.privatelawattorneys/wiki-private-law` | Sourced legal answers on private law and bank cases | https://wiki.private.law/mcp |
| `io.github.proa-web/docs` | Proa Rust framework documentation | https://proa.so/mcp |
| `io.github.psinglap/websearch-api-eval` | Benchmark results comparing You.com, Tavily, Exa and Parallel search APIs | https://websearch-api-eval.psberkeleymba.workers.dev/mcp |
| `io.github.QAInsights/jmeter-docs` | Apache JMeter documentation, properties, scripting recipes and error fixes | https://docs.jmeter.ai/api/mcp |
| `io.github.QDThead/signal-lab` | Catalog of free market, macro, weather, news and OSINT data sources | https://signal-lab-jet.vercel.app/api/mcp |
| `io.github.quotewise/mcp` | 600K quotes searchable by meaning, with attribution checks | https://mcp.quotewise.io/ |
| `io.github.rabyavalla/lifestyle-medicine-knowledge` | ACLM lifestyle medicine guidance on diet, exercise and health | https://web-production-ae61.up.railway.app/mcp/lifestyle-medicine-knowledge |
| `io.github.rainbow686/china-export-rebate-mcp` | China export tax rebate rates by HS code | https://china-export-rebate-mcp.rainbow686.workers.dev/mcp |
| `io.github.rarasAI/raras` | Brazilian rare disease knowledge graph in Portuguese | https://raras.org/api/mcp |
| `io.github.rasitakyol/aicoolies` | Catalog of AI and developer tools | https://aicoolies.com/mcp |
| `io.github.ray999/knowledge-graph` | Directory of AI tools, models and agents with community feedback | https://kg.zhiyong.dev/mcp |
| `io.github.RayceRossum/getregisters` | NDIS pricing, care and licensing rules with official citations and register previews | https://getregisters.com/api/v1/mcp |
| `io.github.re-fagiano/bloodyhopes-campfire` | Historical ballads, lyrics and critical research corpus | https://bloodyhopes.com/mcp |
| `io.github.realist99/dolfdarts-mcp` | Rules, scoring and strategy for 200+ dart games | https://dolfdarts.com/mcp/mcp |
| `io.github.realmint-io/mcp` | Tokenized real-world assets scores and listings across chains | https://mcp.realmint.io/mcp |
| `io.github.reesehammer/umbra-mcp` | Umbra open SAR satellite imagery archive | https://api.umbra-py.space/mcp |
| `io.github.revolist/revogrid-mcp` | RevoGrid data grid documentation and usage knowledge | https://mcp.rv-grid.com |
| `io.github.revolist/revogrid-mcp-pro` | RevoGrid DataGrid docs, examples, features and migration notes | https://mcp.rv-grid.com/pro |
| `io.github.rezearcher/jobs-mcp-server` | Live open job postings across company applicant tracking systems | https://assetfactory-jobs-x402.sigrunner.workers.dev/mcp |
| `io.github.rico-c/youshow-pte` | PTE Academic question types, samples, format and score requirements | https://pte.youshowedu.com/api/mcp |
| `io.github.rizwanqsf-sketch/promptbase-marketplace` | AI prompt products listed on PromptBase.art | https://promptbase.art/mcp |
| `io.github.robertoyanguas-ops/arxiv-digest-mcp` | ArXiv AI, computer science and math papers | https://arxiv-digest-72343955726.us-central1.run.app/mcp/arxiv-digest |
| `io.github.robertoyanguas-ops/serp-extract-mcp` | Live web and news search results | https://serp-extract-72343955726.us-central1.run.app/mcp/serp-extract |
| `io.github.robit-man/mapsource` | OpenStreetMap places, elevation, and geographic data | https://api.mapsource.io/mcp |
| `io.github.romulusfoundry/grantsonar` | Open US federal, state, and foundation grant opportunities | https://grantsonar.com/api/mcp |
| `io.github.RRGU26/bankregpulse-mcp-server` | US banking regulation news, digests and comment deadlines | https://lexregpulse.com/mcp |
| `io.github.rt1966/showmestepbystep` | 409 step-by-step how-to tutorials | https://www.showmestepbystep.com/api/mcp |
| `io.github.Rupesh7128/cofounderbase` | Evidence-checked AI automation agencies by need, tool, country and budget | https://cofounderbase.com/api/mcp/ |
| `io.github.RustamIsmail/healthy-aging-atlas` | Evidence-ranked supplement research by health goal, with citations | https://healthyagingatlas.com/api/mcp/ |
| `io.github.saagpatel/portfolio-mcp` | Saagar Patel's essays, book chapters, field notes, and projects | https://mcp.saagarpatel.dev/mcp |
| `io.github.sacrosaunt/redra` | Current class-action settlements with official source links | https://mcp.redra.ai/mcp |
| `io.github.Sagar27888/google-maps-mcp-server` | Business names, addresses, phones, ratings and hours from Google Maps | https://google-maps-mcp-server.vercel.app/mcp |
| `io.github.sam1siam/ruagentic-directory` | Directory of MCP servers, clients and AI agents | https://ruagentic.com/mcp |
| `io.github.sandeepkelvadi/marketing-skills-directory` | 340+ marketing and SEO skills for Claude Code | https://marketingskills.directory/wp-json/mkt/v1/mcp |
| `io.github.Santurce-Software-LLC/birds-of-puerto-rico` | Puerto Rico bird species guide entries and families | https://birdsofpuertorico.com/mcp |
| `io.github.sarthakjain004/headstart` | 466k tech jobs from company career sites and hiring trends | https://imposeidon-headstart-search.hf.space/mcp |
| `io.github.scraping-api-plans/web-data-plan-finder` | Pricing and conditions of scraping, search, and other API plans | https://plans.intoperson.com/mcp |
| `io.github.seanmeverett/evergences` | Evergences memos, site content, API guides and public agent memories | https://evergences.com/api/mcp/ |
| `io.github.sellrock-de/steamwebapi` | Steam Market API docs, schemas, products and games | https://mcp.steamwebapi.com/mcp |
| `io.github.servicewindowapp/servicewindow` | Southwest Florida food truck listings | https://krmfxedkxoyzkeqnijcd.supabase.co/functions/v1/mcp |
| `io.github.SFHAJJI/lex` | Luxembourg and EU law texts, with historical versions by date | https://law.soufien.lu/mcp |
| `io.github.sha-net/community-board` | Local community listings, classifieds, services and events | https://mcp.shavitnetzer.com/mcp |
| `io.github.shanethelion/glazing-mcp` | Commercial glass and glazing codes, performance data, product equivalents | https://glazing-mcp.glazingkb.workers.dev/mcp |
| `io.github.shawmena-dotcom/creative-commons-images` | Openly licensed and public domain images with credit lines | https://commonkite.cybermax-tools.workers.dev/mcp |
| `io.github.shibley/aisotools` | 3,000+ AI tools to search and compare | https://aisotools.com/api/mcp |
| `io.github.ShirishChinch/agentexchange` | Questions and answers written by AI agents on technical problems | https://yapperium.pages.dev/mcp |
| `io.github.Shuaigle/roomnology-forum` | Taiwanese Traditional Chinese community forum articles and comments | https://api.roomnology.com/mcp |
| `io.github.sigaihealth/cancer-support-hub` | Free cancer support resources across Washington State | https://cancersupport.sig.ai/api/mcp |
| `io.github.simms2/pressbox-news-wire` | Published press releases and newsrooms with sources | https://pressbox.com/mcp |
| `io.github.sina158/spectre-markets` | NQ and ES futures gamma levels and session price paths | https://spectre.markets/mcp/ |
| `io.github.singularitystudiosdev/askagent` | Verbatim error messages with root causes and fixes | https://askagent.dev/mcp |
| `io.github.sitebox/kids-stay` | Japanese hotels verified for kid-friendly conditions and facilities | https://mcp.kidsstay.workers.dev/mcp |
| `io.github.sitegpt/sitegpt-docs` | SiteGPT setup, features, API reference and troubleshooting | https://sitegpt.ai/docs/mcp |
| `io.github.sksareen/smartipedia-mcp` | Smartipedia AI-native open encyclopedia articles | https://smartipedia.com/mcp |
| `io.github.skylight-9/fixlore` | Agent-shared verified fixes for errors and troubleshooting problems | https://fix.mimxo.com/mcp |
| `io.github.SlambertDK/shelfatlas-catalog` | Danish grocery offers, prices, stores and products by EAN | https://api.shelfatlas.com/api/v1/mcp |
| `io.github.slshults/gpra-chord-charts` | Guitar chord diagrams for 12,708 chord names | https://mcp.guitarpracticeroutine.com/mcp |
| `io.github.slshults/shakespeare-monologues` | Shakespeare monologues, plays, paraphrases and summaries | https://mcp.shakespeare-monologues.org/mcp |
| `io.github.smukh/agent-arena` | On-chain ERC-8004 AI agent registry and reputation across chains | https://agentarena.site/api/mcp |
| `io.github.SoapyRED/freightutils` | Freight reference data: ADR dangerous goods, airlines, airports, HS codes, UN/LOCODE | https://www.freightutils.com/api/mcp |
| `io.github.sonpiaz/openaffiliate-mcp` | Affiliate programs and commission details | https://openaffiliate.dev/api/mcp |
| `io.github.Spacemandomains/library-mcp` | Catalog of 25,000+ MCP servers across registries | https://librarymcp.vercel.app/api/mcp |
| `io.github.Spacemandomains/mcp-registry-search` | Every MCP server listed in the official Model Context Protocol registry | https://mcpregistrysearchwilfredleejr.vercel.app/api/mcp |
| `io.github.Sparkflights-com/sparkflights` | Verified flight fares by city, month, cabin and price | https://www.sparkflights.com/mcp/search |
| `io.github.speak-able/schoolorder-catalog` | AI and edtech subscriptions Korean schools can buy, with prices | https://schoolorder.kr/mcp |
| `io.github.spikinglabs/symbola` | Software build packs with design decisions and build steps | https://symbola.sh/mcp |
| `io.github.spree/ecommerce-docs` | Spree Commerce developer docs for headless ecommerce | https://spreecommerce.org/docs/mcp |
| `io.github.Srikarmk/keystone` | What arXiv papers build on, dispute and assume, from LaTeX source | https://keystone-research.vercel.app/api/mcp |
| `io.github.stableotto/scrubshifts` | US nursing and allied-health job listings | https://scrubshifts.com/mcp |
| `io.github.Steven3265/homechecker-guides` | Australian homebuyer guides and sourced property purchase checklists | https://mcp.homechecker.com.au/mcp |
| `io.github.StonesofCreation/stackswap` | About 400 B2B go-to-market software tools: costs, vendors and overlaps | https://stackswap.ai/api/mcp |
| `io.github.StraightLineGolfPro/straight-line-golf-pro-mcp` | Straight Line Golf Pro public coaching pages and resources | https://straight-line-golf-pro-mcp.vercel.app/mcp |
| `io.github.StroybatPing/aicatalog` | Directory of thousands of AI tools with details and categories | https://aicatalog.com.ua/api/v1/mcp |
| `io.github.SunRainSnow/labtestsuperstore` | US lab test catalog, collection sites and reference range context | https://labtestsuperstore-mcp.vercel.app/api/mcp |
| `io.github.Superfast-Robotics/robot-skill-hub` | Robot code, skills and version-specific findings for robotics tasks | https://api.superfastrobotics.com/mcp |
| `io.github.superlowburn/agentrank` | MCP servers, agent tools, and skills ranked by maintenance signals | https://agentrank-ai.com/mcp |
| `io.github.sustany/casemagic` | US federal court cases, dockets, judges, filings, and deadlines | https://casemagic.ai/mcp |
| `io.github.svenkatreddy/ramayana-mcp` | Valmiki Ramayana verses in four languages | https://ramayana-mcp.vercel.app/api/mcp |
| `io.github.Swervie/swervie` | Cross-retailer product specs, scores, live prices and buy links | https://us-central1-swervie-prod.cloudfunctions.net/mcp |
| `io.github.tbalcinha/culturelib-discover` | French cultural events, venues, and ticket prices across resellers | https://www.culturelib.fr/api/mcp/mcp |
| `io.github.tbrajkovic/fixatia-property-search` | European real estate auction properties by country, price, ROI | https://mcp.fixatia.com/api/mcp |
| `io.github.team-earth/datagraph` | Urban locality knowledge graph for civic problem-solving | https://api.datagraph.city/mcp |
| `io.github.teamhandyapps-oss/postlaunchkit` | Reviewed free tools and product launch directories | https://postlaunchkit.com/mcp |
| `io.github.TensorsWillFlow/verbaterm` | Citation-checked reviews of public company policies and terms | https://verbaterm.com/mcp |
| `io.github.tettertotter/fundinglandscape` | Open US grants, federal contracts and foundations | https://fundinglandscape.com/api/mcp |
| `io.github.thaohienhomes/pho-research-tools` | Scientific papers, evidence, datasets, and reference verification via PubMed, OpenAlex | https://mcp.pho.chat/mcp |
| `io.github.thechancerylaneproject/tclp-mcp` | Climate-aligned contract clauses from Chancery Lane Project | https://mcp.chancerylaneproject.org/mcp |
| `io.github.theguysaccount/3ndgam3` | Public research communities, agent activity, and discussion threads | https://3ndgam3.org/api/mcp |
| `io.github.theguysaccount/charitology` | Published charity research, nonprofit benefits and sources | https://os.charitology.org/mcp |
| `io.github.theguysaccount/impactline` | Enacted public laws and their implementation evidence | https://app.impactline.org/api/mcp |
| `io.github.theguysaccount/landosaur` | Public land listings with source-linked prices and evidence | https://landosaur.com/mcp |
| `io.github.theguysaccount/realrep` | Public civic records and World Bank indicators with citations | https://app.realrep.org/api/mcp |
| `io.github.theguysaccount/swissmote` | Published Swissmote job openings | https://api.swissmote.com/v2/api/public/mcp |
| `io.github.theguysaccount/unredactus` | Public document metadata and snapshot provenance | https://unredactus.com/api/mcp |
| `io.github.theindianappguy/gita-mahabharata-mcp` | Bhagavad Gita verses and Mahabharata passages in Sanskrit and English | https://dharma-mcp.iag.workers.dev/mcp |
| `io.github.theluckystrike/ip-lookup` | Ownership and network details for IP addresses | https://ip-lookup.zovo.one/mcp |
| `io.github.theluckystrike/lei-lookup` | Legal Entity Identifier records and renewal dates | https://lei-lookup.zovo.one/mcp |
| `io.github.theluckystrike/npi-lookup` | US healthcare provider NPI registry records | https://npi-lookup.zovo.one/mcp |
| `io.github.theluckystrike/ofac-screening` | OFAC sanctions list entries and name screening | https://ofac-screening.zovo.one/mcp |
| `io.github.TheRundown/documentation` | Official TheRundown sports data API documentation | https://docs.therundown.io/mcp |
| `io.github.thiazzz/maker-machines-atlas` | Maker machine research, comparisons and buying guidance | https://makermachinesatlas.com/mcp |
| `io.github.thiazzz/smart-glasses-atlas` | Smart glasses specifications, comparisons, and regional retailer links | https://smartglassesatlas.com/mcp |
| `io.github.thinksuitesolution-coder/visibilityai` | Businesses worldwide by category and city, with AI-visibility data | https://www.visibilityai.in/api/mcp |
| `io.github.thunderbid/socketlist-mcp` | Directory of 800+ open-source MCP servers with install configs | https://socketlist.pages.dev/mcp |
| `io.github.timescale/pg-aiguide` | PostgreSQL documentation and best practices | https://mcp.tigerdata.com/docs |
| `io.github.tinh2/skills-hub` | Catalog of AI agent skills with details and instructions | https://api.skills-hub.ai/mcp |
| `io.github.tintun2602/veldora` | Norwegian companies, tenders, addresses, laws and exchange rates | https://veldora.no/mcp |
| `io.github.tinyprocessing/hirelog` | Hiring processes, ATS quirks and red flags by company | https://hirelog.dev/mcp |
| `io.github.tiptreesystems/lacuna-research-mcp` | ML and AI papers, research directions, authors, and hypotheses | https://lacuna.tiptreesystems.com/api/mcp |
| `io.github.tireniajilore/nycfoodie` | Editorial NYC restaurant recommendations, guides and ratings | https://nycfoodie-production.up.railway.app/mcp |
| `io.github.togo-framework/togo` | ToGO Go and React framework docs and plugins | https://mcp.to-go.dev/mcp |
| `io.github.TonyChen56/paperbanana-prompts` | Research figure prompt templates from PaperBanana | https://paperbanana-prompts-mcp.873217126.workers.dev/mcp |
| `io.github.TravelType/travel-poi` | Global cities, countries and travel points of interest | https://mcp.traveltype.app |
| `io.github.tresor4k/leavesheet-certified-payroll` | Davis-Bacon prevailing wage determinations and certified payroll rules | https://app.tabletemplates.com/api/mcp |
| `io.github.trip2g/trip2g` | Markdown notes folder served with search and sourced answers | https://trip2g.com/_system/mcp |
| `io.github.troothllc/trooth-network` | Company trust profiles and disclosed facts | https://api.trooth.co/public/mcp |
| `io.github.troyhunt/hibp` | Data breach exposure for emails, domains and passwords | https://haveibeenpwned.com/mcp |
| `io.github.trustcarinfo/plate-lookup` | Ukrainian license plate vehicle registry data and reviews | https://trustcar.info/mcp |
| `io.github.u00dxk2/agentic-directory` | Directory of agentic AI tools with comparisons | https://agentic.ai/mcp |
| `io.github.ukmgranger/agent-commons` | Agent-shared reusable findings and open research questions | https://agent-commons.martin-granger-44f.workers.dev/mcp |
| `io.github.UnityNodes/blobpedia` | Celestia proposals, docs, forum threads and whitepapers | https://blobpedia.org/mcp |
| `io.github.UnityNodes/canton-ccpedia` | Canton Network proposals, docs, forum threads and whitepapers | https://ccpedia.xyz/mcp |
| `io.github.upstash/context7` | Up-to-date library and framework documentation | https://mcp.context7.com/mcp |
| `io.github.usliberty/joint-genesis-mcp` | Physician reviewed research on joint pain and osteoarthritis | https://mcp.usliberty.com/mcp |
| `io.github.vanshulgoyal101/ctx` | GitHub repository code and documentation site passages | https://ctx.vanshul.com/mcp |
| `io.github.veritylabsai/rattlewatch` | US CPSC and FDA product recalls with citations | https://rattlewatch.rattled.ca/mcp |
| `io.github.vhspace/agentbase` | Shared knowledge base contributed by AI agents | https://mcp.agentbase.tools/mcp |
| `io.github.vicentesurraco/offpeak` | US jobs filtered by commute, pay and seniority | https://offpeak.fyi/mcp |
| `io.github.voidly-ai/voidly-hosted` | Global internet censorship index, country status, and incidents | https://api.voidly.ai/mcp |
| `io.github.Vonage/vonage-documentation-mcp` | Vonage API documentation, SDKs, tutorials and troubleshooting | https://documentation-mcp.vonage.dev/mcp |
| `io.github.Vultax/vultax-research` | Published crypto and prediction-market studies and datasets | https://vultax.com/vi-mcp |
| `io.github.wdfdaivd/anclum` | MCP servers, agent skills, open-source AI projects and AI tools | https://anclum.com/mcp |
| `io.github.wellknownmcp/ia-asso` | 1.26M active French associations from the official RNA registry | https://ia-asso.fr/api/mcp |
| `io.github.wescorp/grandpasai` | Research articles on age reversal, robotics, AI, and space | https://grandpasai.com/mcp |
| `io.github.Witzelfitz/regiobrett` | Events, courses and local offers in Eastern Switzerland | https://regiobrett.ch/api/mcp |
| `io.github.wjabrac/xomni-market` | AI capabilities on AWS Marketplace and the MCP Registry | https://xomnimarket.com/mcp |
| `io.github.worklittle/jobs` | Millions of job openings by role, place, pay, and visa | https://mcp.worklittle.com/ |
| `io.github.worklore/worklore` | Worklore stories and skill capability tiers | https://worklore.dev/mcp |
| `io.github.workopia/workopia-mcp` | Millions of live jobs from company career pages in 90 countries | https://workopia.io/api/mcp-jobs |
| `io.github.wulfkaal/corpus` | Scholarly papers and hash-verifiable claims from one author's corpus | https://corpus.openstanding.org/mcp |
| `io.github.wvdsh/wavedash` | Wavedash documentation for building and publishing browser games | https://mcp.wavedash.com/mcp |
| `io.github.wwwnlab/rest-area` | Questions and answers on a forum for AI agents | https://rest-area-six.vercel.app/mcp |
| `io.github.wywy-llc/gas-library-hub` | Google Apps Script libraries with AI-generated summaries | https://appscripthub.com/api/mcp |
| `io.github.xiaoba-dev/atlaxy` | AI products, models, agents, and organizations with explainable scores | https://api.atlaxy.ai/mcp |
| `io.github.XLSV777/7maps` | Directory of MCP servers with status, tool risk and tool search | https://7it.co.il/7maps/mcp?via=registry |
| `io.github.xtrustinfo/company-lookup` | Ukrainian companies, contacts and registry details | https://xtrust.info/mcp |
| `io.github.xyzzylabs/tc39-mcp` | ECMAScript ECMA-262 and ECMA-402 spec clauses, grammar, and TC39 proposals | https://mcp.xyzzylabs.ai/tc39/mcp |
| `io.github.xyzzylabs/wasm-mcp` | WebAssembly specification: instructions, types, sections, proposals | https://mcp.xyzzylabs.ai/wasm/mcp |
| `io.github.yadasa/afrotech-guide` | AfroTech 2026 events, sessions, jobs, and attendees | https://afrotech.guide/mcp |
| `io.github.Yarmoluk/ckg-agentforce` | Salesforce AgentForce concepts, prerequisites and Einstein Trust Layer | https://ckg-agentforce.onrender.com/mcp |
| `io.github.Yarmoluk/ckg-nvidia-ai` | NVIDIA AI concepts across 20 domains with source provenance | https://ckg-nvidia-ai.onrender.com/mcp |
| `io.github.Yarmoluk/ckg-nvidia-nemoclaw` | NVIDIA NemoClaw concepts and prerequisites from a knowledge graph | https://ckg-nvidia-nemoclaw.onrender.com/mcp |
| `io.github.yc-droid/fundscout` | Indian mutual fund schemes, latest AMFI NAVs, and returns | https://fundscout.salesup.workers.dev/mcp |
| `io.github.yc-droid/grantscout` | Open and upcoming US federal grant opportunities from Grants.gov | https://grantscout.salesup.workers.dev/mcp |
| `io.github.YGao2005/scholar-feed-mcp` | CS/AI/ML papers, citations, authors and full text | https://mcp.scholarfeed.org/mcp?src=mcp-registry |
| `io.github.yhay81/public-data-catalog` | Japanese open government data from e-Gov portal and statistics dashboards | https://public-data-catalog-mcp.yusuke8h.workers.dev/mcp |
| `io.github.yonatangross/orchestkit` | OrchestKit documentation | https://orchestkit.dev/api/mcp |
| `io.github.YourLifewithAI/arcology-knowledge-node` | Engineering knowledge for building a mile-high arcology city | https://arcology-mcp.fly.dev/mcp |
| `io.github.zachhhhh/agentatlas` | Agent setup answers, MCP config for 15 clients, trending repos | https://agentatlas.dev/api/mcp |
| `io.github.zation/agent-radar` | Rated AI tools with recommendations and explanations | https://agent-radar.zation1.workers.dev/api/mcp |
| `io.github.zaxarovcom/thisispaper` | Curated architecture, design, photography, and art projects | https://www.thisispaper.com/intelligence/api/mcp |
| `io.github.zeit-dev/canton-projects` | Canton Network ecosystem projects and categories | https://canton.wiki/mcp |
| `io.github.zeit-dev/hoodl2-projects` | Robinhood Chain ecosystem projects and categories | https://hoodl2.com/mcp |
| `io.github.zeit-dev/perps-projects` | Perpetuals ecosystem projects and categories | https://perps.ai/mcp |
| `io.github.zeit-dev/pmwisdom-projects` | Prediction market projects directory | https://pmwisdom.com/mcp |
| `io.github.zeit-dev/tempoatlas-projects` | Tempo blockchain ecosystem projects and categories | https://tempoatlas.net/mcp |
| `io.github.zeroatflops/flopsindex-mcp` | GPU rental reference prices for spot, on-demand, and DePIN compute | https://app.flopsindex.com/mcp |
| `io.github.zzn199216/worldrole` | Remote and overseas job listings with eligibility checks | https://mcp.worldrole.work/mcp |
| `io.griddo/ax-docs` | Griddo backoffice documentation for content authors | https://ax.mcp.griddo.io/mcp |
| `io.growthvector/mcp` | SEO, GEO, ads, and email marketing guides, glossary, and prompts | https://growthvector.io/mcp |
| `io.imagekit/devtools` | ImageKit developer documentation and transformations | https://devtools-mcp.imagekit.io/mcp |
| `io.insourcia/insourcia` | French company financials, directors, ownership, M&A and insolvency | https://mcp.insourcia.io/mcp |
| `io.jobsbase/jobs` | Builder job listings where one person owns engineering, product, QA | https://jobsbase.io/mcp |
| `io.jsonpad/docs` | JSONPad docs, API, SDK and CLI references | https://mcp.jsonpad.io/docs |
| `io.launchpadhq/launchpad-hq` | Sourced facts on AI tools, pricing and free alternatives | https://www.launchpadhq.io/mcp |
| `io.lexlint/lexlint` | Jurisdiction-specific laws governing software, with citations | https://mcp.lexlint.io/mcp |
| `io.mammoth/docs` | Mammoth Analytics documentation | https://mammoth.io/docs/mcp/ |
| `io.mcp-marketplace/search` | 4,000+ security-scanned MCP servers | https://mcp-marketplace.io/api/mcp/mcp |
| `io.mcprating/search` | MCP servers with test results, required keys, tools and token cost | https://mcprating.io/mcp/ |
| `io.mediawork/mediawork` | Post-production and distribution vendors directory | https://mcp.mediawork.io/mcp |
| `io.memorysync/docs` | MemorySync integration documentation | https://docs.memorysync.io/mcp |
| `io.motcheck/mot` | UK vehicle details and MOT history from DVSA data | https://motcheck.io/mcp |
| `io.motomarks/mcp` | Car brand logos and automotive brand data | https://motomarks.io/api/mcp |
| `io.nightbreak/forge` | Nightbreak Minecraft plugin wiki, source code, and config schemas | https://forge.nightbreak.io/mcp |
| `io.openvidu/docs` | Official OpenVidu documentation by version, with changelog and pricing | https://docs-mcp.openvidu.io/mcp |
| `io.philidor/defi-vaults` | 700+ DeFi vaults with risk scores and protocol analysis | https://mcp.philidor.io/api/mcp |
| `io.printpal/printpal` | 3D printing models, troubleshooting wiki, and build guides | https://printpal.io/mcp |
| `io.protoperfect/labs` | Protoperfect Labs research papers, documentation, and glossary | https://protoperfect.io/api/mcp |
| `io.publicapis/directory` | 1,500+ public APIs with docs, auth and free-tier info | https://publicapis.io/mcp |
| `io.pxl8/records` | Verified fighter records and fight cards | https://api.pxl8.io/sports-data/mcp |
| `io.qt.qt-docs-mcp/qt-documentation` | Qt 5 and Qt 6 framework and product documentation | https://qt-docs-mcp.qt.io/mcp |
| `io.seaworthy/mcp` | Disability insurance facts, carriers, riders, and specialty coverage guides | https://mcp.seaworthy.io/mcp |
| `io.sigmaprep/worksheets` | Free printable math worksheets from pre-algebra to calculus | https://www.sigmaprep.io/api/mcp |
| `io.stobox/intelligence-graph` | RWA tokenization, security tokens, regulation and standards | https://mcp.stobox.io/mcp |
| `io.stockmap/stockmap` | US stock outlook calls, sector reads and crypto market conditions | https://stockmap.io/mcp |
| `io.theparse/parse` | Tiered cited public research record with source passages and open questions | https://theparse.io/mcp |
| `io.tooloracle/law` | US, EU and UK case law, Federal Register, SEC filings and bills | https://tooloracle.io/law/mcp/ |
| `io.tooloracle/researchoracle` | Scientific papers, arXiv preprints, authors and DOI metadata | https://tooloracle.io/news2/mcp/ |
| `io.tracetail/tracetail` | TraceTail browser fingerprinting docs, pricing, and integration code | https://tracetail.io/mcp |
| `io.untax/untax` | County property assessment records and official VA facilities and forms | https://untax.io/api/v1/mcp |
| `io.usefulapi/clinicaltrialsgov` | ClinicalTrials.gov registered studies, sites and outcomes | https://clinicaltrialsgov.usefulapi.io/mcp |
| `io.usefulapi/dailymed` | FDA drug labels, NDCs, and packaging from DailyMed | https://dailymed.usefulapi.io/mcp |
| `io.usefulapi/knowledgeowl` | A company's KnowledgeOwl knowledge-base articles, glossary, and snippets | https://knowledgeowl.usefulapi.io/mcp |
| `io.usefulapi/nppes-npi-registry` | US healthcare providers and organizations by NPI | https://nppes-npi-registry.usefulapi.io/mcp |
| `io.usefulapi/openfda` | openFDA drug, device, food and adverse event data | https://openfda.usefulapi.io/mcp |
| `io.usefulapi/peopledatalabs` | People, company, and job posting profiles from People Data Labs | https://peopledatalabs.usefulapi.io/mcp |
| `io.usefulapi/rxnorm` | Drug names, ingredients and interactions from RxNorm | https://rxnorm.usefulapi.io/mcp |
| `io.usefulapi/zenserp` | Google web, news, image and shopping search results | https://zenserp.usefulapi.io/mcp |
| `io.uxjobs/jobs` | Live UX and product design job listings with salary statistics | https://mcp.uxjobs.io/mcp |
| `io.vascue/public-knowledge-search` | Vascue public docs on healthcare operations, insurance claims and booking | https://www.vascue.io/mcp/search |
| `io.vectree/diagrams` | Interactive concept diagrams explaining how things work | https://vectree.io/mcp |
| `io.viseon/semantic-intelligence` | VISEON products, services, people, FAQs and articles as a knowledge graph | https://viseon.io/mcp |
| `io.whatic/datasheets` | IC datasheet specs, parametric part search and price tiers | https://whatic.io/mcp |
| `ir.bijack/loadboard` | Active public freight loads and loadboard halls on Bijack | https://mcp.bijack.ir/mcp |
| `it.asapdevs/site` | ASAPDevs software house offers, case studies, blog and pricing | https://asapdevs.it/api/mcp |
| `it.giornatamondiale/world-days` | Italian world and international days with dates and sources | https://giornatamondiale.it/mcp |
| `it.matricedeldestino/matrice-del-destino` | Destiny matrix guides and calculators from an Italian site | https://matricedeldestino.it/mcp |
| `it.occasioni/bandi` | Italian public grants and incentives for businesses with deadlines | https://occasioni.it/mcp |
| `it.taxcompass/taxcompass` | Italian tax rules from primary sources with citations | https://api.taxcompass.it/mcp |
| `jobs.aitrainers/search` | Open paid AI training jobs from many platforms | https://aitrainers.jobs/mcp |
| `jobs.aitraining/ai-training-jobs` | Open AI training jobs and advertised hourly pay by work type | https://aitraining.jobs/api/mcp |
| `jobs.robottraining/robot-training-jobs` | Open robot training jobs and hourly pay by work type | https://robottraining.jobs/api/mcp |
| `jobs.superintelligence/frontier-ai` | Open frontier AI lab roles and hiring organizations | https://superintelligence.jobs/mcp |
| `jp.afdb/mcp` | Japanese point-site reward offers, conditions and yen values | https://mcp.afdb.jp/mcp |
| `jp.co.roundup-inc/knowledge` | Japanese SME web marketing insights, Q&A, and podcast excerpts | https://roundup-knowledge-mcp.bitter-sea-955b.workers.dev/mcp |
| `ke.co.firmledger/firmledger` | Verified company directory records, categories and countries | https://mcp.firmledger.co.ke/mcp |
| `kr.lifelaw/kr-law` | Korean statutes, case law, administrative rules and legal reference figures | https://mcp.lifelaw.kr/mcp |
| `land.moss/alpha-mcp` | Korean crypto and macro media analysis, daily briefs and market data | https://alpha.moss.land/api/mcp |
| `law.ukimmigration/uk-immigration-tools` | UK visa going rates, sponsor licences, fees, and right to work | https://www.ukimmigration.law/api/mcp/ |
| `legal.loupe/citation-lookup` | Verification of US legal citations and case names | https://loupe.legal/mcp-public |
| `live.alpic.linkup-company-resea-2df3e8e8/Linkup-Company-Research` | Company profiles, products, financials, funding and leadership from web research | https://linkup-company-resea-2df3e8e8.alpic.live |
| `live.max4/max4live` | Max for Live devices for Ableton Live | https://mcp.max4.live/mcp |
| `live.tarenraider/taren-raider` | Taren Raider stream status, schedule, VODs and merch | https://tarenraider.live/mcp |
| `living.heidi/stays` | heidi.living furnished monthly stays in Los Angeles and FAQs | https://heidi.living/mcp |
| `lk.postage/postage` | Sri Lanka Post rates, COD fees, post offices and prohibited items | https://postage.lk/mcp |
| `ls.ip/ipls-ip-lookup-service` | IP geolocation, ASN, ISP and DNS records | https://ip.ls/mcp |
| `lt.atviri-teises-aktai/lithuanian-law` | Lithuanian laws article by article with versions and definitions | https://atviri-teises-aktai.lt/mcp |
| `lt.gov.dataportal.guides/docs` | Lithuanian Data Portal user guide and Data API documentation | https://guides.dataportal.gov.lt/api/mcp |
| `lu.chathome/chathome` | Luxembourg property listings, prices and commune market data | https://chathome.lu/api/mcp |
| `lv.panembrivdienu/mcp` | Latvian public holidays, working days and annual leave rules | https://panembrivdienu.lv/mcp |
| `makeup.pro/mcp` | Directory of makeup artists, salons, schools and brands worldwide | https://pro.makeup/api/mcp |
| `market.payapi/marketplace` | Catalog of paid x402 APIs with prices and categories | https://payapi.market/mcp |
| `market.plati.mcp/digimarket` | plati.market digital goods catalogue with product and seller details | https://mcp.plati.market/mcp |
| `markets.iamai/marketplace` | Listings of AI agents, apps, prompts and templates for sale | https://iamai.markets/mcp |
| `md.mostlyright/datasets` | Open reproducible Parquet datasets with schemas and sample rows | https://mostlyright.md/api/mcp |
| `me.freehire/freehire` | IT job postings, employers, salary and job market statistics | https://freehire.me/api/v1/mcp |
| `me.gaborharsanyi/knowledge` | Gabor Harsanyi's professional expertise, credentials, and published knowledge | https://mcp.gaborharsanyi.me/mcp |
| `me.ryanlindsey/ryanlindsey-me` | Ryan Lindsey's resume, case studies and published writing | https://mcp.ryanlindsey.me/mcp |
| `media.thecoop/the-coop` | iGaming articles, supplier profiles, events and payment capabilities | https://thecoop.media/mcp |
| `net.balford/ask` | Metal stamping, deep drawing and design-for-manufacturing engineering answers | https://balford.net/ask/mcp |
| `net.gamedev/mcp` | GameDev.net forums, tutorials, postmortems, game industry news and shader projects | https://gamedev.net/mcp/ |
| `net.genebe/genebe-mcp` | Human genetic variant classification, ACMG criteria, genes and consequences | https://mcp.genebe.net/v1/mcp |
| `net.haldata/mcp-dir` | Japanese directory of retail and e-commerce MCP servers with recipes | https://mcp-dir-search-bqaj3tfejq-an.a.run.app/mcp |
| `net.homeschooltools/curriculum` | Homeschool curricula details, comparisons and reviews | https://homeschooltools.net/mcp |
| `net.k4tech/docs` | Medius control protocol, device behavior and Rust library documentation | https://medius.k4tech.net/mcp |
| `net.myopl/pickleball-public-knowledge` | Official 2026 USA Pickleball rules, ratings, courts and help articles | https://api.myopl.net/mcp |
| `net.onlinewebdirectory/registry` | How websites treat AI agents: bot walls, robots rules, llms.txt | https://onlinewebdirectory.net/mcp |
| `net.particular/particular-docs-mcp` | NServiceBus and Particular Service Platform documentation | https://docs.particular.net/mcp |
| `net.rafsoft/faktura-vat` | Faktura VAT invoicing software knowledge base and Polish KSeF e-invoicing | https://www.rafsoft.net/api/mcp/ |
| `net.seaready/seaready` | SIRE 2.0 inspection questions, PSC checklists and vetting deadlines | https://seaready.net/mcp |
| `net.softhills/mcp` | Softhills 3D/2D visualization SDK docs, APIs and code examples | https://ai.softhills.net/mcp |
| `net.somantic/immobiliensuche` | German property listings and address value estimates | https://www.somantic.net/api/mcp/ |
| `net.tradebasis/automotive-appraisal` | US VIN decoding and dealer research on used car finance | https://tradebasis.net/mcp |
| `net.umbhost/umbhost-kb-mcp` | UmbHost help articles on Umbraco hosting, DNS, email and SSL | https://kb.umbhost.net/mcp |
| `net.vaguslab/research` | Vagus nerve stimulation research passages and consumer device comparison | https://vaguslab.net/mcp |
| `net.vareen/vaia` | vareen.net products, technical data and comparisons | https://vareen.net/a/mPBZZ1Sg9UDKK1_O/mcp |
| `network.aiden/aiden-mcp` | AI agents on Robinhood Chain: identity, feedback and trust scores | https://mcp.aiden.network/mcp |
| `network.caper/caper-wiki` | Caper wiki and DAO knowledge base on Radix | https://caper.network/api/mcp |
| `network.fmcg/fmcg-network` | USDA food nutrients, FDA recalls and EU food and cosmetics labelling rules | https://mcp.fmcg.network/mcp |
| `network.wellknown/wellknown` | Index of AI agents and MCP servers with liveness and capabilities | https://wellknown.network/mcp |
| `news.agingresearch/agingresearch-news` | Aging research papers, trials, claims about drugs and genes | https://agingresearch.news/api/mcp |
| `news.asha/asha-news` | Source-backed news archive with Palestine and conflict coverage | https://asha.news/api/v1/mcp |
| `news.hottub/hottub-news` | Worldwide news headlines and story clusters across outlets and languages | https://hottub.news/mcp |
| `news.pollar/pollar-news` | Independent European news, explainers, daily briefs and storylines | https://mcp.pollar.news/mcp |
| `nl.boekenbase/catalogus` | Dutch book catalog with ISBN metadata and new releases | https://boekenbase.nl/mcp |
| `nl.intermediair.www/jobs` | Dutch job postings on Intermediair | https://www.intermediair.nl/mcp |
| `nl.kentekenkompas/vehicle-knowledge` | Dutch vehicle models, comparisons, terminology and cited sources | https://api.kentekenkompas.nl/mcp |
| `nl.marketingburos/marketingburos` | Dutch marketing agencies by specialism, city and cases | https://mcp.marketingburos.nl/mcp |
| `nl.nationalevacaturebank.www/jobs` | Dutch job postings on Nationale Vacaturebank | https://www.nationalevacaturebank.nl/mcp |
| `no.cantara/wiki` | Norwegian open-source community wiki articles from 2008 to 2022 | https://mcp.cantara.no/mcp |
| `no.kollegia/jobbsok` | Norwegian job listings, salaries and employers | https://kollegia.no/mcp |
| `no.kulturbase/catalogue` | Playable Nordic cultural programmes and recordings | https://kulturbase.no/mcp |
| `now.carejobs/healthcare-jobs` | US healthcare job openings, posted pay and employers | https://carejobs.now/api/mcp |
| `one.asel.agents/public-folder` | Cited findings and open requests shared by agents | https://agents.asel.one/mcp |
| `online.meal-planner/public-recipes` | Free dinner recipes searchable by ingredient | https://www.meal-planner.online/wp-json/ksl-mp/v1/mcp-public |
| `online.pandus/accessibility` | WCAG 2.2 and axe-core accessibility rule explanations | https://pandus.online/mcp |
| `online.sasame/research` | SaSame public website knowledge and open outcome demands | https://live-vps.sasame.online/public-mcp |
| `online.waply/public` | Waply WhatsApp for Kommo docs, guides, plans, and message pricing | https://waply.online/mcp |
| `org.agentpub/papers` | AI-authored research papers with peer review | https://mcp.agentpub.org/mcp/ |
| `org.alaskajobs/board` | Alaska public-sector jobs, salaries and state pay schedule | https://alaskajobs.org/mcp |
| `org.americandefault/research` | US household financial distress indicators by county and nationally | https://mcp.americandefault.org/mcp |
| `org.aquaview/aquaview-mcp` | Global oceanographic and environmental datasets and observations | https://mcp.aquaview.org/mcp |
| `org.askcerebrum/cerebrum` | Scientific literature answers with citations and trending science news | https://askcerebrum.org/mcp |
| `org.belgium-art/guide-and-transfer` | Belgian places, culture and sourced travel answers | https://belgium-art.org/wp-json/belgium-art-agent/v1/mcp |
| `org.bibooks/bibooks` | Free bilingual audiobooks with parallel text for language learners | https://bibooks.org/mcp |
| `org.biketherail/trails` | US rail-trails, trailheads, facts and closures | https://biketherail.org/mcp |
| `org.billcommons/bill-commons` | US state bills full text, sponsors, votes and legislative history | https://mcp.billcommons.org/mcp |
| `org.brainkb/brainkb` | Neuroscience knowledge graphs | https://mcp.brainkb.org/mcp |
| `org.breakwire/breakwire` | API and SDK breaking changes, deprecations, advisories, and error fixes | https://breakwire.org/mcp |
| `org.btcdecoded/intelligence` | Cited Bitcoin development and governance discussion record | https://mcp.btcdecoded.org/mcp |
| `org.bull-run/bullrun` | Global stocks, UCITS ETF costs and overlap, company news and macro | https://mcp.bull-run.org/mcp |
| `org.californiabitcoin/agent-commerce` | Bitcoin knowledge, topics, and sourced answers | https://californiabitcoin.org/mcp?source=official-mcp-registry |
| `org.casimo/mcp` | US casino terms, observed changes, and source-backed facts | https://casimo.org/mcp |
| `org.celo/docs-mcp` | Celo blockchain developer documentation | https://docs.celo.org/mcp |
| `org.citizenofnowhere.rankings/global-metro-power-rankings` | Rankings and profiles of 4,300 world metros across sixteen dimensions | https://rankings.citizenofnowhere.org/api/mcp |
| `org.davisstirling/davisstirling` | California HOA law: Davis-Stirling Act text and court decisions | https://davisstirling.org/mcp |
| `org.dictionaryofml/dictionary` | Machine learning term definitions and cross-references | https://dictionaryofml.org/mcp |
| `org.edufeed/nope-mcp` | German open educational resources with open licenses | https://mcp.edufeed.org/mcp |
| `org.everroad/dealers` | Utah franchise car dealer hours, fees, services, and state fee law | https://everroad.org/mcp |
| `org.fairappraisers/mcp` | Public registry of FAIR appraisers by location and specialty | https://mcp.fairappraisers.org/mcp |
| `org.imqueue/mcp` | Official @imqueue documentation, packages, and release status | https://mcp.imqueue.org/mcp |
| `org.japanlaw/japanese-law` | Japanese statutes with English translations, provisions, and amendments | https://japanlaw.org/mcp |
| `org.jobopportunitiesapi/mcp` | Live employer-direct job postings, hiring signals, and market statistics | https://api.jobopportunitiesapi.org/mcp |
| `org.kampyeri/mcp-server` | Verified campsites and glamping in Turkey | https://kampyeri.org/mcp |
| `org.licitaia/licitaciones` | Recent Spanish public tenders with official source links | https://api.licitaia.org/api/mcp/public |
| `org.llmref/llmref` | Version-pinned software documentation with semantic search | https://api.llmref.org/v1/mcp |
| `org.machupicchu/wonders-mcp` | UNESCO heritage travel destinations and editorial guides | https://www.machupicchu.org/wp-json/wonders-mcp/v1/jsonrpc |
| `org.memoryapi/ai` | AI and machine learning research papers from arXiv, DBLP, HuggingFace | https://ai.memoryapi.org/mcp |
| `org.memoryapi/clinical` | ClinicalTrials.gov clinical trials and statistics | https://clinical.memoryapi.org/mcp |
| `org.memoryapi/food` | USDA food nutrition data and macros | https://food.memoryapi.org/mcp |
| `org.memoryapi/legal` | US federal court opinions and company litigation history | https://legal.memoryapi.org/mcp |
| `org.memoryapi/patent` | USPTO patents and company patent portfolios | https://patent.memoryapi.org/mcp |
| `org.memoryapi/research` | PubMed and arXiv papers with Crossref citations | https://research.memoryapi.org/mcp |
| `org.nyuengelberg/corpus` | IP and innovation law scholarship from NYU's Engelberg Center | https://corpus.nyuengelberg.org/mcp |
| `org.openindianalaw/indiana-code` | Indiana Code statutes and appellate cases | https://mcp.openindianalaw.org/mcp |
| `org.opennih/opennih` | NIH grants 1985-2026 by topic, investigator, institution and funding trends | https://mcp.opennih.org/mcp |
| `org.oravan/mcp` | US Congress bills in plain language and representative lookup | https://oravan.org/api/mcp/mcp |
| `org.pinnacleblooms/ask` | Child development milestones, warning signs, and ICF code references | https://ask-mcp.pinnacleblooms.org/mcp |
| `org.projectnoosphere/noosphere` | Versioned how-tos and findings shared by AI agents | https://projectnoosphere.org/mcp |
| `org.remoteimpact/jobs` | Remote jobs at impact organizations by area, country and pay | https://remoteimpact.org/mcp/ |
| `org.roadtag/road-tag` | Community-reported accessibility road barriers in Taiwan | https://roadtag.org/api/mcp-public |
| `org.rrmacademy/library` | Peer-reviewed articles on restorative reproductive medicine | https://mcp.rrmacademy.org/mcp |
| `org.scoutee/scoutee` | European public procurement tenders and CPV codes | https://scoutee.org/api/mcp/public |
| `org.sophiacommons/directory` | Waldorf schools, biodynamic farms, Camphill communities and anthroposophical events | https://sophiacommons.org/mcp |
| `org.tansolutions.railcrossingatlas/crossings` | US railroad crossings, equipment, train activity and road traffic | https://railcrossingatlas.tansolutions.org/mcp |
| `org.thewaterhub/site` | The Water Hub water dataset with search and statistics | https://thewaterhub.org/mcp |
| `org.thewileyrule/public` | 7-OH and kratom research, test results, FDA actions, and state laws | https://thewileyrule.org/mcp |
| `org.tickets4pets/events` | US live events, ticket price index and city event listings | https://tickets4pets.org/mcp |
| `org.toolwork/toolwork` | MCP servers, APIs, CLIs, and skills with scores and comparisons | https://mcp.toolwork.org/mcp |
| `org.totto/javabin-archieve` | Origins of javaBin and JavaZone Norwegian Java community, 1998 to 2007 | https://mcp-javabin-archieve.fly.dev/mcp |
| `org.totto/knowledge` | Thor Henning Hetland's signed knowledge web on software topics | https://mcp.totto.org/mcp |
| `org.ukrfish.sk/sudnokontrol` | Ukrainian ship registry vessel records and statistics | https://api.sk.ukrfish.org/mcp |
| `org.uscodex/uscodex` | US Code, CFR, public laws, bills, and executive orders | https://uscodex.org/mcp |
| `org.verifiedhandles/verified-handles` | Official social media accounts and identifiers of people and organisations | https://verifiedhandles.org/mcp |
| `org.vicp-registry/vicp-registry` | US vaccine court VICP decisions, statistics, and attorneys | https://vicp-registry.org/mcp |
| `org.videohistoryproject/research` | Experimental video history records, sources, and citations | https://www.videohistoryproject.org/mcp |
| `org.wikibrand/wikibrand` | Brand logos, colors, typefaces and tone of voice from brand websites | https://wikibrand.org/api/mcp |
| `org.wikiprompt/mcp` | Curated AI prompts by model, style and type | https://mcp.wikiprompt.org/mcp |
| `page.afterimage/afterimage` | Stored readable copies of public web pages | https://afterimage.page/mcp |
| `pe.iw.around/businesses` | Local businesses in Israel with prices, services, and contacts | https://around.iw.pe/mcp |
| `pl.agentrynku/gpw` | Warsaw Stock Exchange prices, financial ratios, dividends, and earnings calendar | https://agentrynku.pl/api/mcp |
| `pl.numertel/numertel` | Polish phone number reputation, spam, scam domains and official numbers | https://numertel.pl/api/mcp |
| `pl.sladami-roberta/maklowicz` | Restaurants and attractions from Robert Maklowicz travel episodes | https://www.sladami-roberta.pl/api/mcp |
| `pl.spokojnierodzice/spokojnie` | Polish answers on normal child development for ages 0-36 months | https://spokojnie-mcp.vercel.app/api/mcp |
| `pl.supplemental/foodlaw` | EU and Polish food supplement law, health claims and novel foods | https://mcp.supplemental.pl/mcp |
| `pl.vanauto/campers` | Camper and rental listings with specs and prices | https://mcp.vanauto.pl/mcp |
| `pro.appboard/appboard` | Community-ranked software products, alternatives, and trending launches | https://api.appboard.pro/api/mcp |
| `pro.dsgvo/dsgvo-pro` | German and EU digital law statutes including GDPR and AI Act | https://dsgvo.pro/api/mcp |
| `pro.investormatch/investor-match-public` | Venture capital investor directory and fundraising guides | https://investormatch.pro/mcp/public |
| `pro.laspi/directory` | Directory of owner-confirmed small businesses | https://laspi.pro/api/v1/mcp/directory |
| `realestate.rak/catalog` | Off-plan property projects, developers and areas in Ras Al Khaimah | https://www.rak.realestate/mcp |
| `ro.autoid/autoid-support` | AutoID product catalog, specifications and technical support | https://mcp.autoid.ro/mcp |
| `rocks.dreamland/help` | DreamLand MUD help articles, items, news and online players | https://dreamland.rocks/mcp/help |
| `rocks.iching/hexagram-mcp` | I Ching 64 hexagrams and eight trigrams | https://mcp.iching.rocks/mcp |
| `rs.ferritin/rustdoc` | Rust standard library and crates.io crate documentation | https://ferritin.rs/mcp |
| `rs.heade/lookup` | Domain, IP and AS hosting, DNS, registration, email and TLS data | https://heade.rs/mcp |
| `rs.malinica/classifieds` | Serbian classified listings by category and location | https://api.malinica.rs/mcp |
| `ru.krasoft/zakupki` | Russian public procurement tenders, contracts and market data | https://zakupki.krasoft.ru/api/mcp |
| `ru.sexpreparat/mcp` | Articles, research and reader Q&A on sex and health | https://sexpreparat.ru/api/mcp |
| `ru.wwhois/whois-mcp` | WHOIS and RDAP domain registration data and IP geolocation | https://wwhois.ru/backend/mcp |
| `sa.daall/mnaqasat` | Saudi government tenders, agencies, winners and market reports | https://mnaqasat.daall.sa/mcp |
| `sale.finda/findasale` | Yard sales, auctions, estate sales and items listed for sale | https://mcp.finda.sale/mcp |
| `science.pith/pith` | Reviews, claims and flaws of arXiv papers | https://pith.science/mcp |
| `se.helsama/helsama` | Hemp and CBD knowledge base, products and open lab data | https://helsama.se/mcp |
| `sg.evaa.beacon/beacon` | Beacon by EVAA offers and articles on AI search visibility | https://beacon.evaa.sg/mcp |
| `sg.homejourney/listings` | Singapore property listings and guides | https://ai-apps.homejourney.sg/mcp/public |
| `sh.alchemylab.horizon/briefing` | AI news and AI regulation across EU, US, UK and Asia | https://horizon.alchemylab.sh/api/mcp |
| `sh.clearhouse/clearhouse` | Index of 100K MCP, A2A and x402 agent services | https://mcp.clearhouse.sh/mcp |
| `sh.financier/financier-docs` | Financier developer documentation | https://financier.sh/mcp/docs |
| `sh.knowngood/knowngood` | Websites where agents can act, with verified capability reports | https://knowngood.sh/mcp |
| `sh.seoskills/catalog` | Catalog of SEO agent skills | https://seoskills.sh/api/mcp |
| `sh.stipple/stipple-tenders` | Australian and New Zealand government tenders, awards and buyer signals | https://www.stipple.sh/mcp-tenders |
| `sh.tibia/tibiawiki-mcp` | Tibia game creatures, items, NPCs, quests, spells and houses | https://mcp.tibia.sh/wiki |
| `sh.watermelon/ui` | Free React, Tailwind and shadcn UI components with source | https://mcp.watermelon.sh/mcp |
| `si.digitalgarden/notes` | Alicia's notes on Houdini, Three.js, OpenUSD, and AI workflows | https://mcp.digitalgarden.si/mcp |
| `si.melb/data` | Melbourne public holidays, small business AI help, events, and local answers | https://data.melb.si/mcp |
| `si.socialswarm/directory` | GitHub projects welcoming AI agent contributions | https://socialswarm.si/mcp |
| `si.thinkhard/prompt-tools` | Work prompt templates, prompt patterns, and AI term definitions | https://thinkhard.si/mcp |
| `site.aefact/aefact` | Korean law changes, Bank of Korea figures and government news | https://aefact.site/mcp |
| `site.ayushrai.life/docs` | Public documentation pages on life.ayushrai.site | https://life.ayushrai.site/mcp/docs |
| `site.ayushrai.life/product` | Ayush Rai's public profile, projects and contact info | https://life.ayushrai.site/mcp/product |
| `site.chatgpt.aqua-orbit-4010.common-agent-commons/common` | Agent insights, open research questions, and reproducible findings | https://common-agent-commons.aqua-orbit-4010.chatgpt.site/api/mcp |
| `site.chatgpt.lorh89.the-knowledge-commons/evidence` | Source-linked evidence for MCP troubleshooting and public research | https://the-knowledge-commons.lorh89.chatgpt.site/api/agent/mcp |
| `site.chatgpt.sarath0210.shekkizh-agent-exchange/agent-exchange` | Tools and hosted agents by task with documentation | https://shekkizh-agent-exchange.sarath0210.chatgpt.site/api/mcp |
| `site.chatgpt.unamed.othernet-reunion/othernet` | La Réunion information with cited sources | https://othernet-reunion.unamed.chatgpt.site/api/mcp |
| `site.failegal/fai-legal` | Pakistani case law, statutes and legal drafting templates | https://failegal.site/mcp |
| `site.star365/hq` | Web, GitHub, YouTube and Reddit search plus live page reading | https://mcp.star365.site/mcp |
| `sk.autoisto/used-cars` | Used cars for sale in Slovakia with typical asking prices | https://www.autoisto.sk/mcp |
| `so.anteroom/anteroom` | Frontier AI vendor commitments, safety frameworks, and AI regulatory provisions | https://mcp.anteroom.so/mcp |
| `so.coreloop/directory` | Business directory with profiles, services and opening hours | https://coreloop.so/api/mcp/coreloop-directory |
| `so.falcon/frontier-reference` | Frontier design terms, file formats, companies, and design jobs | https://falcon.so/api/mcp |
| `space.hf.hoyant-su-agentic-rl/agentic-rl` | Agentic reinforcement learning papers, credit assignment methods and CLI benchmark tasks | https://hoyant-su-agentic-rl.hf.space/gradio_api/mcp/ |
| `space.monon/additive-atlas` | Food additive regulations in Japan, the EU, and the US | https://api.additiveatlas.monon.space/mcp |
| `space.spontanno/events` | Concerts, theatre and standup events in Russian cities | https://spontanno.space/mcp |
| `stream.aidata/site-search` | AI Data Stream documentation, blog, changelog, and pricing | https://aidata.stream/mcp |
| `studio.ghosty/docs` | Ghosty Studio documentation and OpenAPI specification | https://www.ghosty.studio/mcp/docs |
| `study.vela/corpus` | Cited literary passages on human experience, emotions and themes | https://vela.study/mcp |
| `swiss.openhelvetia/gateway` | Swiss federal law from Fedlex and political linked data with sources | https://mcp.openhelvetia.swiss/mcp |
| `tc.mcp/mcp-tc` | Directory of MCP servers with install commands and tools | https://mcp.tc/mcp |
| `team.leanscale/gtm-knowledge` | Go-to-market operations playbooks, benchmarks, case studies, and podcast episodes | https://mcp.leanscale.team/mcp |
| `tech.ace-bl/site-mcp` | Public pages and products of the Ace website | https://ace-bl.tech/mcp |
| `tech.geosensor.atlas/absence-index` | Measured rates of web services lacking machine-readable capabilities | https://atlas.geosensor.tech/mcp |
| `tech.machinepulse/machinepulse` | MCP ecosystem stats, package download trends, and GitHub trending | https://machinepulse.tech/mcp |
| `tech.michaelbarber/site-mcp` | Public pages of the BL Sports website | https://michaelbarber.tech/mcp |
| `tech.progeofde/vps-deals` | Cheap VPS plan prices and providers compared | https://progeofde.tech/mcp |
| `tech.saasoffers/deals` | Verified startup deals, discounts and credits on SaaS tools | https://saasoffers.tech/api/mcp |
| `tech.tailor/mcp` | Tailor Platform documentation | https://mcp.tailor.tech/ |
| `tech.tresbien/drupal-code-query` | Drupal core API changes, contrib module usage and upgrade data | https://mcp.tresbien.tech/mcp |
| `tech.ydb-qdrant.pets/codex-pets-ydb-qdrant` | Community Codex pet packs and install instructions | https://pets.ydb-qdrant.tech/mcp |
| `today.lmk/commerce` | Cross-merchant product prices, price history, and deals | https://lmk.today/api/ucp/mcp |
| `today.nyangi/oneul-nyangi` | Real cat photos, profiles, breeds and cat care references | https://nyangi.today/mcp |
| `tools.grokbot/connectors` | Grok Bot connectors, install methods, and test status | https://mcp.grokbot.tools/mcp |
| `tools.i-gaming/igaming-data` | iGaming slot specs, RTP, providers, regulators, news and jobs | https://mcp.i-gaming.tools/mcp |
| `top.skillaria/skillaria` | AI, DevOps, Linux and Git courses and guides | https://skillaria.top/mcp |
| `top.toolboxes/ai-tools-directory` | Curated AI tools by industry, use case, and pricing tier | https://ai-tools-mcp.toolboxes.top/mcp |
| `top.verseworks/verseworks` | Chinese web novels, chapters and world-building codex | https://verseworks.top/mcp |
| `tr.com.kariwood.www/catalog` | Kariwood plywood product specifications and technical documents | https://www.kariwood.com.tr/mcp |
| `tube.binge/bingetube` | Short vertical drama series with recommendations | https://binge.tube/mcp |
| `tv.guidedoc/documentary-database` | Documentary films, filmmakers, topics, and articles | https://guidedoc.tv/mcp |
| `tw.org.legaltech/taiwan-law` | Taiwan court judgments, statutes, constitutional interpretations, with official sources | https://legaltech.org.tw/mcp |
| `ua.org.chertov/chertov` | Chertov and Vorobyov physics problems with worked solutions | https://www.chertov.org.ua/mcp |
| `uk.co.cruisify/cruise-search` | Cruises sold in the UK with itineraries, sailings and prices | https://www.cruisify.co.uk/mcp |
| `uk.co.herstack/herstack` | UK women's midlife health guidance with PubMed evidence | https://herstack.co.uk/api/mcp |
| `uk.co.manchestertonight/whats-on` | Manchester gigs, club nights, theatre, events, and venues | https://manchestertonight.co.uk/mcp |
| `uk.co.opengrant/opengrant` | UK grant schemes, funders, deadlines and eligibility | https://opengrant.co.uk/mcp |
| `uk.co.remedybridge/housing-repair-tools` | UK tenant rights on repairs, damp, Awaab's Law and complaint deadlines | https://remedybridge.co.uk/mcp/ |
| `uk.co.vettedhome/property-guides` | UK guides to property problems and home energy decisions | https://vettedhome.co.uk/mcp |
| `uk.dumaguete/places` | Places with categories and coordinates from OpenStreetMap | https://dumaguete.uk/mcp |
| `uk.energynorth/journal` | London electrical safety, EICR and EV charger guides | https://energynorth.uk/api/mcp |
| `uk.thaidata/mcp` | UK Thai restaurant hygiene ratings and market statistics | https://thaidata.uk/mcp |
| `us.buildability/mcp` | US address-level zoning, flood zones, permitting and buildability | https://buildability.us/api/mcp |
| `us.corpuslaw/corpus-legal` | US federal, state and municipal law from official sources | https://corpuslaw.us/api/mcp |
| `us.govtube/govtube` | What US officials said on camera, with transcripts and timestamps | https://api.govtube.us/mcp |
| `us.recalert/mcp` | US product recalls from CPSC, FDA, NHTSA and FSIS | https://ajlswjtsikbnpicienyu.supabase.co/functions/v1/mcp |
| `us.unfreeze/atlas` | Graded research studies on middle managers and organizational change | https://unfreeze.us/mcp |
| `uz.b2bmarket/marketplace` | Wholesale products, services, suppliers and prices in Uzbekistan | https://b2bmarket.uz/mcp |
| `uz.pactum/legal` | Uzbekistan law articles and legal services | https://pactum.uz/mcp |
| `vc.unicornscreener/unicorn-screener` | Startup scores, analysis, and public research memos | https://unicornscreener.vc/api/mcp |
| `video.refs/refs` | Analyzed launch and product videos with blueprints and formulas | https://refs.video/mcp |
| `wedding.latido/latido` | Hungarian wedding vendors, venues, budgets and planning checklist | https://latido.wedding/mcp |
| `wiki.agenticweb/probe` | Agentic web standards, glossary terms, and specification changes | https://agenticweb.wiki/mcp |
| `wiki.apologetics/apologetics-wiki` | Bible verses, Greek and Hebrew word studies, Christian apologetics articles | https://apologetics.wiki/mcp |
| `wiki.radix/radix-wiki` | Radix DLT community wiki | https://radix.wiki/api/mcp |
| `wiki.rust/rust-wiki` | Rust game items, skin prices, loot tables, and servers | https://rust.wiki/mcp |
| `wiki.swarmindex/boards` | Boards where AI agents talk to each other, with status and rules | https://swarmindex.wiki/mcp |
| `wiki.wallstreet/canon` | Finance term definitions, reference tables and deterministic formulas | https://canon.wallstreet.wiki/mcp |
| `wiki.wowdb/mcp` | WoW Forever items, recipes, abilities, and quests | https://wowdb.wiki/api/mcp |
| `wine.beyond/beyond-wine` | No and low alcohol specialty beverages, producers, and people | https://beyond.wine/mcp |
| `wine.spillthe.www/wineries` | 20,000 wineries worldwide with regions, hours and tasting fees | https://www.spillthe.wine/mcp |
| `work.aitpm/knowledge` | AI, architecture, governance, and technical product management articles | https://mcp.aitpm.work/mcp |
| `work.aitrainer/jobs` | Open AI training and RLHF jobs with pay statistics | https://aitrainer.work/mcp |
| `work.resumebooster/jobs` | Job postings pulled from employers' hiring systems | https://bwhdazbotpblihdxcmho.supabase.co/functions/v1/agent-mcp |
| `world.wheelofheaven.mcp/corpus` | Comparative mythology encyclopedia, primary texts and datasets | https://mcp.wheelofheaven.world/mcp |
| `ws.overflo/overflows` | CVEs, CISA KEV, EPSS and vulnerable or malicious open-source packages | https://mcp.overflo.ws/mcp |
| `xyz.agoreum/agoreum-public` | Directory of AI agents and services with reputation | https://agoreum.xyz/api/v1/mcp/public |
| `xyz.bd5d/bd5d-archive` | Early BrainDrops releases, artists, holdings, and editorial research | https://bd5d.xyz/mcp |
| `xyz.bizclaw/business-directory` | Company directory with profiles and categories | https://bizclaw.xyz/mcp |
| `xyz.darksearch/search` | Full-text search of web pages published on IPFS | https://www.darksearch.xyz/mcp |
| `xyz.krimskrams/fcc-license-search` | FCC radio licenses by company, call sign and status changes | https://fcc-license-search.krimskrams.xyz/mcp |
| `xyz.krimskrams/grant-search` | US federal grants and EU funding opportunities | https://grant-search.krimskrams.xyz/mcp |
| `xyz.loadbay/loadbay` | Catalog of open-source AI agent harnesses, MCP servers and SDKs | https://loadbay.xyz/api/mcp |
| `xyz.x402helper/mcp` | Catalog of paid x402 API endpoints searchable by task | https://x402helper.xyz/mcp |
| `za.co.getlawed/sa-law` | Official South African legal texts and case citation checks | https://getlawed.co.za/api/mcp/law |
| `za.co.netbrainis/catalogue` | Netbrain products: JVM tooling, ML models, compliance APIs | https://www.netbrainis.co.za/mcp |
| `za.co.theahg/ahg-archives` | Archival catalogue records, fonds and authority records | https://mcp.theahg.co.za/public/mcp |
<!-- list:end -->

## Run it yourself

```bash
npm install
npm run data   # check servers and rebuild data/servers.json and this list
npm test
```

Labeling new servers needs `ANTHROPIC_API_KEY`. Without it, servers that are already labeled are still checked and listed.

## License

MIT
