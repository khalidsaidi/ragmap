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
3146 servers, checked 2026-11-28.

| Server | Knows about | URL |
| --- | --- | --- |
| `ac.tandem/docs-mcp` | Tandem docs, install guides, SDKs and workflows | https://tandem.ac/mcp |
| `ae.beachclubs/mcp` | UAE beach clubs, day pass prices, amenities, hours and events | https://www.beachclubs.ae/mcp |
| `ae.plantguide/dubai-gardening` | What to plant in Dubai, plant care in heat, climate | https://plantguide.ae/mcp |
| `ae.projectory/mcp` | UAE off-plan developments, registered property sales, and research reports | https://mcp.projectory.ae/mcp |
| `agency.goji/goji` | SEO, AEO, web and branding terms, guides and FAQs | https://mcp.goji.agency/mcp |
| `ai.1court.state/court-directory` | US county court contacts, filing fees, e-filing, and deadline rules | https://state.1court.ai/api/mcp |
| `ai.a2uicatalog/docs` | A2UI Atomic Catalog product docs: auth, versioning, pricing, API | https://a2uicatalog.ai/mcp-docs |
| `ai.agentcv/registry` | Registry of AI agent teams by use case and platform | https://agentcv.ai/mcp |
| `ai.agenticterminal/directory` | Verified merchants accepting agentic payments on Lightning and other rails | https://mcp.agenticterminal.ai/mcp |
| `ai.agentlookups/groundrules` | Verbatim text of US federal and state law | https://law.agentlookups.ai/mcp |
| `ai.agentlookups/spoon-scout` | Contaminant lab results, recalls and additive rules for US packaged foods | https://food.agentlookups.ai/mcp |
| `ai.agilex.service/docs` | AGILEX robot manuals, CAN protocol, firmware and FAQ | https://service.agilex.ai/agilex-docs/mcp |
| `ai.ai-portal/ai-portal` | AI model releases, AI regulations, glossary and GenAI news | https://www.ai-portal.ai/mcp |
| `ai.airshelf/catalog` | Cross-vendor B2B product catalog with datasheet specs | https://mcp.airshelf.ai/mcp |
| `ai.ankra/docs` | Ankra platform docs: clusters, stacks, GitOps, CI/CD, CLI | https://docs.ankra.ai/mcp |
| `ai.autoblogging/autoblogging` | Autoblogging.ai pricing, plans, features and site pages | https://autoblogging.ai/mcp |
| `ai.beexcellent/reference` | How Excellent restaurant event software works, features and comparisons | https://beexcellent.ai/api/mcp/public |
| `ai.bezal/local-commerce` | US local service businesses, reviews, services and hours | https://app.bezal.ai/api/mcp |
| `ai.bidclub/bidclub` | Investor podcast transcripts, summaries and digests in English and Chinese | https://bidclub.ai/api/mcp |
| `ai.bithuman/docs` | bitHuman avatar SDK and REST API documentation | https://docs.bithuman.ai/docs-mcp |
| `ai.boltclaw/docs` | Bolt Claw API documentation pages | https://boltclaw.ai/docs/mcp-server |
| `ai.bondren/docs` | Bondren product documentation and API reference | https://docs.bondren.ai/mcp |
| `ai.byteask/embedded-docs` | Embedded firmware datasheets, MISRA, CMSIS and RTOS reference documentation with page citations | https://mcp.byteask.ai/mcp |
| `ai.casama/casama` | Casama documentation, API reference and gallery of ready-made skills | https://api.casama.ai/mcp/docs |
| `ai.catalystproject/evidence-graph` | Evidence on what supplements and compounds do in the body | https://catalystproject.ai/mcp |
| `ai.cerebrium/docs` | Cerebrium deployment, hardware and endpoint documentation | https://cerebrium.ai/docs/mcp |
| `ai.cfoplus/cfo` | CFO+ business activities, model questions, pricing and methodology | https://cfoplus.ai/mcp |
| `ai.com.nlp/open-model-catalog` | Open-weight AI model releases, licenses and architectures | https://nlp.com.ai/mcp |
| `ai.companyproof/companyproof` | Legal company registry profiles and verified company facts | https://companyproof.ai/v2/mcp |
| `ai.context-link/context-link` | Content from the user's connected sites, Drive, Notion, email and files | https://www.context-link.ai/mcp |
| `ai.coreyjames/portfolio` | Corey James's work in GPU inference, agent governance, enterprise AI | https://coreyjames.ai/mcp |
| `ai.dablock/visibility-index` | How often AI answer engines mention 24 crypto and Web3 brands | https://dablock.ai/mcp |
| `ai.dabyte/visibility-index` | How often AI answer engines mention 20 SaaS brands | https://dabyte.ai/mcp |
| `ai.darkfunnels/docs` | DarkFunnels documentation on WhatsApp AI sales agents | https://docs.darkfunnels.ai/mcp |
| `ai.deepdna/knowledge` | Pharmacogenomics: drug-gene interactions, gene variants by rsID, medication screening | https://deepdna.ai/mcp |
| `ai.dincat/dincat` | Life in Japan: take-home pay, visa rules, exams, Q&A pages | https://www.dincat.ai/api/mcp |
| `ai.dualsoft/aas` | DualSoft DS2 PLC specs, AAS docs, examples and 3D equipment models | https://dualsoft.ai/mcp |
| `ai.echoloc/company-technographics` | Which companies use, adopt or replace specific technologies | https://api.echoloc.ai/mcp |
| `ai.echoo.www/public-catalog` | Echoo product facts, pricing, docs and published writing skills | https://www.echoo.ai/mcp |
| `ai.ecocheck/ecocheck` | Vietnam GHG regulations, EU CBAM rules and ESG guidance | https://ecocheck.ai/mcp |
| `ai.edgechat/edgepedia` | Encyclopedia articles with citations on people, places, things and events | https://www.edgepedia.org/mcp |
| `ai.emberverse/emberverse` | Cross-domain essays and structural principles in a connected knowledge graph | https://emberverse.ai/mcp |
| `ai.entityindex/entityindex` | Verified hotels and restaurants in Andorra with official links | https://entityindex.ai/mcp |
| `ai.enzos/enzos` | US homes for sale, price verdicts, below-market deals and metro market snapshots | https://enzos.ai/mcp |
| `ai.eukollab/eukreate-market-research` | US local housing market prices, inventory and days on market | https://eukollab.ai/a/@eukreate-market-research/mcp |
| `ai.everymcp/every-mcp` | Public MCP servers from the official registry with install configs | https://everymcp.ai/mcp |
| `ai.evoost/site` | Verified facts about eVoost AI products, FAQ and contact | https://evoost.ai/mcp |
| `ai.exa/exa` | Current web content on any topic | https://mcp.exa.ai/mcp |
| `ai.example4/xmp4` | Source code, callers and tests of open-source libraries | https://mcp.example4.ai/mcp |
| `ai.excessionlabs/site` | CVE details, affected versions, KEV, EPSS and security research | https://excessionlabs.ai/mcp |
| `ai.exmxc/exmxc` | AI company power rankings, valuation data and AI commerce research | https://mcp.exmxc.ai/mcp |
| `ai.financegenius/financegenius` | Indian credit cards, loans, deposits, insurance and mutual funds, with calculators | https://mcp.financegenius.ai/mcp/ |
| `ai.fukushi/dictionary` | Japan disability welfare service fees, add-ons, staffing rules | https://fukushi.ai/api/mcp |
| `ai.govisit/govisit-mcp` | Travel destinations, places, visit facts, and GoVisit documentation | https://govisit.ai/mcp |
| `ai.govisit/govisit-tools` | Travel destinations, local businesses, and place profiles | https://govisit.ai/mcp |
| `ai.govisit/tools` | Travel destinations, places, and GoVisit documentation | https://govisit.ai/mcp |
| `ai.greyridgesignals/claimfinder-settlements` | Open US class-action settlements, eligibility and claim deadlines | https://claimfinder-mcp.sigrunner.workers.dev/mcp |
| `ai.heyrole/heyrole` | Remote job postings, companies hiring, and application links | https://heyrole.ai/mcp |
| `ai.hostingbrain/intelligence` | European hosting and domain market shares, pricing, concentration and technology adoption | https://mcp.hostingbrain.ai/mcp |
| `ai.hotapi/docs` | HotAPI integration guides, model docs and OpenAPI operations | https://hotapi.ai/mcp |
| `ai.huntboard/huntboard` | Recent job postings from company career pages and ATS boards | https://huntboard.ai/mcp |
| `ai.husverket/husverket` | Swedish prefab houses, attefallshus, prices and building permit questions | https://mcp.husverket.ai/mcp |
| `ai.ilang/mcp` | iLang protocol specification, verbs, modifiers, FAQ and SOUL documents | https://mcp.ilang.ai/mcp |
| `ai.ironscout/ironscout` | Ammunition prices by caliber and retailer offers | https://mcp.ironscout.ai/mcp |
| `ai.januaport/docs` | JanuaPort installation, setup and connection guides | https://docs-mcp.januaport.ai/mcp |
| `ai.jasonlovell/site` | Jason Lovell's AI research studies, builds and releases | https://jasonlovell.ai/mcp |
| `ai.jopp/jobs` | Open jobs in Switzerland and Liechtenstein | https://jopp.ai/mcp |
| `ai.justautomate/website` | JustAutomate agency services, pages, workshop pricing and contact | https://justautomate.ai/mcp |
| `ai.karmafor/karma-library` | Essay on AI cooperation, moral uncertainty and power | https://karmafor.ai/api/mcp?source=mcp-registry |
| `ai.law.mcp/lawyer-search` | Verified US lawyer profiles by practice area, state and city | https://mcp.law.ai |
| `ai.linof/docs` | Linof documentation and current pricing for family photo films | https://linof.ai/api/apps/6a562086cd3bd1e44e0d4c3d/functions/docsMcp |
| `ai.llmhosting/pricing` | LLM API prices by provider and GPU rental prices with history | https://llmhosting.ai/mcp |
| `ai.localmark/agent-directory` | Public A2A agents, their skills and endpoint checks | https://localmark.ai/mcp |
| `ai.lovora/lovora` | Lovora AI companions, prices, content rules and docs | https://lovora.ai/mcp |
| `ai.manpage/mcp` | Linux manual pages by distribution and version | https://manpage.ai/mcp |
| `ai.masnavi/masnavi` | Rumi's complete Masnavi verses with search and citation | https://masnavi.ai/mcp |
| `ai.mcpjunction/directory` | Directory of MCP servers by keyword, category and topic | https://mcpjunction.ai/mcp |
| `ai.memestack/mcp` | Memes, charts and infographics with sources, OCR text and citations | https://mcp.memestack.ai/mcp |
| `ai.metabind/docs` | Metabind docs: MCP Apps, BindJS, SDKs, CLI and APIs | https://docs.metabind.ai/mcp |
| `ai.mitbbs/mitbbs-ai` | Chinese-diaspora news, US visa info, travel guides, NYC Chinese businesses | https://mitbbs.ai/mcp |
| `ai.mocop/mocop` | Directory of APIs, MCP servers and A2A agents with capabilities | https://mocop.ai/mcp |
| `ai.modellix/docs-search` | Modellix model APIs, request schemas and usage guides | https://docs.modellix.ai/mcp |
| `ai.msza/polish-catholic-sermons` | Polish Catholic sermons, Scripture, prayers, churches and daily content | https://msza.ai/mcp |
| `ai.nerdnoir/nerdy` | Product and engineering leadership concepts, frameworks and case studies | https://nerdnoir.ai/api/mcp |
| `ai.nordax/mcp` | Verified business entities with trust scores and credentials | https://mcp.nordax.ai/mcp |
| `ai.nothumansearch/search` | Index of agent-ready websites and MCP endpoints | https://nothumansearch.ai/mcp |
| `ai.olhary/olhary` | Brazilian public tenders, company sanctions, federal legislation, catalog codes | https://api.olhary.ai/mcp |
| `ai.omnitravel/travelmcp-directory` | Directory of travel MCP servers, skills and APIs | https://omnitravel.ai/mcp |
| `ai.opencancer/opencancer` | Cancer patient answers grounded in NCCN guidelines and recruiting clinical trials | https://opencancer.ai/api/mcp |
| `ai.opencurrent/opencurrent` | Verified AI workflows, model and tool facts, AI news (Korean) | https://opencurrent.ai/mcp |
| `ai.pakki/packaging-directory` | U.S. consumer brands using flexible packaging, with evidence | https://pakki.ai/api/mcp |
| `ai.paperlist/paperlist` | Papers and research trends from 36 AI conferences | https://paperlist.ai/mcp |
| `ai.pechincha/deals` | Brazilian online deals, coupons and price history | https://pechincha.ai/mcp |
| `ai.pensionhunter/pensionhunter` | Cross-border pension rules by country with sources and authority answers | https://mcp.pensionhunter.ai |
| `ai.plugmcp/directory` | MCP servers and agent skills with install configs | https://plugmcp.ai/mcp-server |
| `ai.poly/docs-mcp` | PolyAI platform documentation and voice API references | https://docs.poly.ai/mcp |
| `ai.pulsegate/provenance` | Software catalog and external identifiers of projects | https://www.pulsegate.ai/api/mcp |
| `ai.radixia/blog` | Radixia blog and conference transcripts on enterprise AI and cloud | https://mcp.radixia.ai/mcp |
| `ai.rankera/rankera` | Facts, plans and pricing of the Rankera AI visibility service | https://rankera.ai/mcp |
| `ai.reg-bot/compliance-oracle` | US state food license rules and Florida license lookup | https://www.reg-bot.ai/api/mcp |
| `ai.regulations/regulations-ai` | AI laws worldwide: status, dates, enforcement, glossary terms | https://regulations.ai/api/mcp/v1 |
| `ai.rocketlist/rocketlist` | Current startup jobs and hiring companies | https://rocketlist.ai/mcp |
| `ai.rollingedition/books` | Technical book passages, definitions and tested code examples | https://rollingedition.ai/mcp |
| `ai.roopslaw/legalsearch` | Indian court judgments, tribunal rulings and statutes | https://mcp.roopslaw.ai/mcp |
| `ai.runx/runx` | Catalog of governed agent skills with manifests | https://api.runx.ai/mcp |
| `ai.sfomo/events` | Upcoming San Francisco Bay Area events and performers | https://sfomo.ai/mcp |
| `ai.sharebench/registry` | AI skills, agents, prompts and playbooks | https://mcp-public.sharebench.ai |
| `ai.sharpest/sharpest` | Current new and used prices for electronics and collectibles | https://sharpest.ai/mcp |
| `ai.shumi/mcp` | Crypto prices, funding rates, sentiment and market regime | https://mcp.shumi.ai/mcp |
| `ai.sidetrip.connect/hackernews` | Hacker News stories, comment threads, users and search | https://demo-hackernews.sidetrip.ai/mcp |
| `ai.sikaru/docs` | Sikaru documentation on managed agents, inference, evals, traces | https://docs.sikaru.ai/_mcp/server |
| `ai.skillsafe/skillsafe` | Registry of security-scanned AI agent skills and their metadata | https://api.skillsafe.ai/mcp |
| `ai.smilestory/wiamusic` | Original K-pop, K-trot and K-ballad songs with key and BPM | https://mcp-wiamusic.smilestory.ai/mcp |
| `ai.snowsure/snow` | Ski resort snow conditions, forecasts and powder rankings | https://www.snowsure.ai/mcp |
| `ai.sosumi/sosumi` | Apple developer documentation, HIG and WWDC transcripts | https://sosumi.ai/mcp |
| `ai.specproof/specproof-mcp` | 3GPP, IETF and multimedia standards specifications and references | https://mcp.specproof.ai/ |
| `ai.ss33/skill-store` | Catalog of 60,000 agent skill procedures for domain tasks | https://mcp.ss33.ai/ |
| `ai.ssid/ssid-mcp` | Router default logins, compliance index and MAC vendor lookup | https://ssid.ai/mcp/http |
| `ai.stealthstack/discovery` | Index of MCP servers, agent skills, A2A agents and APIs | https://stealthstack.ai/mcp?src=mcpregistry |
| `ai.stoicsage/stoic-sage` | Stoic texts of Marcus Aurelius, Seneca and Epictetus with citations | https://stoicsage.ai/mcp |
| `ai.stork/core` | Web search results, library docs and GitHub repo answers | https://mcp.stork.ai/core |
| `ai.stork/mcp-directory` | MCP servers for tasks, endpoint health and install configs | https://mcp.stork.ai/mcp?tools=directory |
| `ai.subpay/tool-finder` | Agent tools, paid x402 APIs and MCP servers with prices | https://subpay.ai/find/mcp |
| `ai.swarmnest/mcp` | AI agent tools, MCP servers, skills and agent field reports | https://swarmnest.ai/mcp |
| `ai.synthfolk/directory` | AI agent and people profiles, companies, jobs and posts | https://synthfolk.ai/api/mcp |
| `ai.talkhao/talkhao` | Chinese words: pinyin, meanings, HSK levels and stroke data | https://talkhao.ai/mcp |
| `ai.thedrain/board` | Security bulletin board threads and discussions written for AI agents | https://thedrain.ai/mcp |
| `ai.theskillvault/skills` | Agent Skills and prompts for coding, deployment and debugging | https://theskillvault.ai/mcp |
| `ai.thewholetorah/thewholetorah` | Torah lessons, Chassidus teachings and classical Jewish source texts | https://www.thewholetorah.ai/api/mcp |
| `ai.tooldirectory/catalog` | AI tools with pricing, alternatives and live or dead status | https://tooldirectory.ai/api/mcp |
| `ai.toolnav/directory` | Directory of AI tools by category with source links | https://toolnav.ai/api/mcp |
| `ai.tunnelmind/scry` | Attacker observations for IPv4 addresses, ASNs, countries and attack tools | https://mcp.tunnelmind.ai/mcp |
| `ai.ulisten/podcast-search` | Podcast transcripts, summaries, quotes with speakers and timestamps | https://mcp.ulisten.ai/ |
| `ai.unquant/unquant` | Market, company, news, macro and US Congress financial data | https://unquant.ai/mcp |
| `ai.varg/how-to` | Video how-to tutorials and FFmpeg recipes | https://mcp.varg.ai/how-to |
| `ai.wakeagents/wake` | Wake product documentation, API, pricing and site pages | https://wakeagents.ai/agents/wakeagents.ai/mcp?via=mcp_registry |
| `ai.whatareyoubuilding/wayb` | Indie products, builders, funding stages and builder communities | https://whatareyoubuilding.ai/api/mcp |
| `ai.whatsupin/events` | Upcoming local events in cities worldwide | https://whatsupin.ai/mcp |
| `ai.wheremind/wheremind` | Places, geocoding and turn-by-turn routes | https://wheremind.ai/mcp |
| `ai.whichagent/beauty` | Orange County barbershops: services, contacts, availability | https://whichagent.ai/api/categories/beauty/mcp |
| `ai.whichagent/car-rental` | Independent Orange County car-rental providers, vehicles and contacts | https://whichagent.ai/api/categories/car-rental/mcp |
| `ai.wiretensors/wiretensors` | Reviews, pricing and comparisons of AI tools | https://wiretensors.ai/mcp |
| `ai.wondel/flightaware` | Live flight status and scheduled flights between airports | https://mcp.wondel.ai/flightaware/mcp |
| `ai.wondel/google-maps` | Places, local businesses, reviews and directions from Google Maps | https://mcp.wondel.ai/google-maps/mcp |
| `ai.wondel/google-search` | General web search results and related questions from Google | https://mcp.wondel.ai/google-search/mcp |
| `ai.wondel/youtube` | YouTube videos, comments and full video transcripts | https://mcp.wondel.ai/youtube/mcp |
| `ai.yeow/business-index` | Public facts on 6.2M US businesses and nonprofits | https://yeow.ai/mcp.php |
| `ai.yonyon/docs` | yonyon.ai developer documentation, auth, pricing and MCP pages | https://yonyon.ai/api/mcp/docs |
| `am.elib/library` | Books, authors and subjects of the Armenian digital library | https://elib.am/mcp |
| `am.kayq/catalogue` | Catalogue of Armenian websites by category, with details and status | https://kayq.am/mcp |
| `app.agendaforge/docs` | AgendaForge public documentation and product content | https://mcp.agendaforge.app/mcp/docs |
| `app.agentindex/agentindex` | Open-source AI agents, MCP servers and developer tools | https://agentindex.app/api/mcp/ |
| `app.airtune/radio` | Live radio stations, now playing songs, schedules and charts | https://airtune.app/mcp |
| `app.allagents/directory` | Directory of AI agents, their capabilities, protocols and trust checks | https://allagents.app/mcp |
| `app.atlasly/atlasly` | UK planning constraints, flood risk, planning history and site context | https://mcp.atlasly.app/mcp |
| `app.beesolo/docs` | Beesolo setup, booking, pricing and account support guides | https://beesolo.app/mcp/docs |
| `app.cannonstudio/cannon-studio` | Cannon Studio products, pricing, workflows, models and API | https://www.cannonstudio.app/mcp |
| `app.cellarion/wine-registry` | Wines, grapes, regions and appellations plus wine guides | https://cellarion.app/api/mcp/public |
| `app.citeme/citeme` | Scholarly papers searchable by topic, DOI or ISBN, with citation formatting | https://citeme.app/api/mcp |
| `app.coinspay/docs` | CoinsPay crypto payments API: invoices, payouts, webhooks, test mode | https://coinspay.app/mcp |
| `app.creatora.lexatlas/lexatlas-mcp` | Current statutes, amendments and citation checks for CIS countries | https://api.lexatlas.creatora.app/mcp |
| `app.cutgpt/research` | Fact-checks, scholarly papers, Wikipedia, archived pages and source background | https://mcp.cutgpt.app/mcp |
| `app.dataclue/catalog` | Catalog of licensable AI training datasets: egocentric video, gripper demos, EEG | https://dataclue.app/mcp |
| `app.datasourcecorp/wholesale` | Datasource background check API operations, errors and webhooks docs | https://api.datasourcecorp.app/mcp |
| `app.dealermax/public-search` | Italian used cars, long-term rentals, dealers and car market FAQs | https://mcp.dealermax.app/mcp/ |
| `app.designmdpro/designmdpro` | Website design systems, tokens and DESIGN.md guidance | https://www.designmdpro.app/mcp |
| `app.esimdata/esimdata` | Travel eSIM data plans compared by provider and price | https://esimdata.app/mcp |
| `app.eurocomply/compliance` | EU regulations, deadlines and enforcement actions | https://eurocomply.app/api/mcp |
| `app.everloot/knowledge` | WoW Forever items, drops, quests, vendors, talents and lore | https://everloot.app/mcp/public |
| `app.fojin/fojin-mcp` | Buddhist canon texts, parallels, dictionaries, commentaries and verified citations | https://mcp.fojin.ai/mcp |
| `app.founderhood/founderhood` | Indie founders and online businesses by city and country | https://founderhood.app/api/mcp |
| `app.fryd/mcp-server` | Crops, companion planting, seasonal calendars and planting plans | https://mcp.fryd.app/mcp |
| `app.futbolatlas/futbol-atlas` | Laws of the Game and major football competitions, cited | https://futbolatlas.app/mcp?via=manifest |
| `app.getdroppy/docs` | Droppy for Mac handbook, droplets, SDK and release notes | https://getdroppy.app/mcp |
| `app.gingerguide/catalog` | European city sights, walking routes and itineraries in six languages | https://gingerguide.app/mcp |
| `app.hamir/mcp` | News articles from an RSS catalogue of sites and blogs | https://hamir.app/mcp |
| `app.himalayas/mcp` | Remote job listings and salary data | https://mcp.himalayas.app/mcp |
| `app.hologallery.pocket/pokemon-tcg-pocket-catalog` | Pokemon TCG Pocket cards, sets and packs | https://pocket.hologallery.app/mcp |
| `app.hyperwave.www/docs` | Hyperwave wavetable documentation | https://www.hyperwave.app/mcp/docs |
| `app.knowra/knowra` | arXiv papers and structured analysis reports | https://mcp.knowra.app/mcp |
| `app.listentosadhu/corpus` | Vedic scripture verses, commentaries and recorded lectures | https://mcp.listentosadhu.app/mcp |
| `app.loveoracle/tarot` | Tarot card meanings for love and common love questions | https://www.loveoracle.app/api/mcp |
| `app.maclookup/mcp` | Registered vendor for MAC addresses and OUI prefixes | https://mcp.maclookup.app/mcp |
| `app.makeroo/makeroo` | Product directory listings with pricing, platform and open source info | https://makeroo.app/mcp |
| `app.marselia/marselia` | Tarot de Marseille card meanings, historical decks and lessons | https://marselia.app/api/mcp |
| `app.mcpharbor/mcp-harbor-search` | Directory of MCP servers, clients and SDKs | https://mcpharbor.app/mcp |
| `app.nabras/qudrat` | Saudi Qudrat GAT exam fees, dates, rules and score calculation | https://www.nabras.app/api/mcp |
| `app.netlify.japan-data-mcp/japan-data-mcp` | Japanese laws, corporations and official statistics in English | https://japan-data-mcp.netlify.app/mcp |
| `app.nowfound/nowfound` | 800,000 product launches searchable by the job they do | https://nowfound.app/mcp |
| `app.offendersearch/offendersearch` | US sex-offender registries and criminal records with source citations | https://mcp.offendersearch.app/mcp |
| `app.onlyrecipes/only-recipes` | Recipes by dish, ingredient, cuisine, diet with ingredients and steps | https://onlyrecipes.app/mcp |
| `app.openkrill/belief` | Share of people on X and Reddit holding each opinion | https://belief.openkrill.app/mcp |
| `app.openkrill/eu-business` | EU VAT validation, company LEI and French or Norwegian company registers | https://eubusiness.openkrill.app/mcp |
| `app.openkrill/food` | Packaged food products by barcode, with allergens | https://food.openkrill.app/mcp |
| `app.openkrill/papers` | Research papers and arXiv preprints with abstracts and free full text | https://papers.openkrill.app/mcp |
| `app.openkrill/rules` | US federal regulations in the CFR and Federal Register | https://rules.openkrill.app/mcp |
| `app.pelnora/corpus` | Polish statutes as of a date and related court rulings | https://corpus.pelnora.app/mcp |
| `app.peptidelibrary/peptide-library` | Peptide research profiles, mechanisms, human evidence and comparisons | https://peptidelibrary.app/mcp |
| `app.pepvault/pepvault` | Peptide compounds, study dose ranges, study summaries and glossary | https://pepvault.app/mcp |
| `app.performix/performix-site` | Team performance science guides, books and evidence sources | https://performix.app/api/mcp |
| `app.picktrack/charts` | Monthly DJ charts by genre with BPM and Camelot keys | https://picktrack.app/mcp |
| `app.pitbi/pitbi` | Perps DEX docs, verified trading answers and Decibel market data | https://pitbi.app/mcp |
| `app.pridepilot/pride-pilot` | LGBTQ+ travel safety, laws, Pride events and venues by country | https://mcp.pridepilot.app/mcp |
| `app.provanza/public-delivery-evidence` | Carrier proof-of-delivery evidence guidance by market and service | https://provanza.app/mcp |
| `app.railway.up.agentworkmark-production/agentworkmark` | Reviewed AI services with completed-work evidence and availability | https://agentworkmark-production.up.railway.app/mcp |
| `app.remoote/remote-jobs` | Remote jobs and salary statistics | https://api.remoote.app/remoote/agents/mcp |
| `app.remotehunt/remotehunt` | Open remote jobs filtered by country eligibility | https://remotehunt.app/api/mcp |
| `app.remotejobify/remote-jobs` | Remote job listings with country eligibility proof | https://remotejobify.app/mcp |
| `app.ridedesk/docs` | RideDesk developer docs: booking API, widgets and integration guides | https://ridedesk.app/api/mcp |
| `app.robohub/robohub` | Commercial robots with specs and comparisons | https://robohub.app/api/mcp |
| `app.rosmaryn/encyclopedia` | Human Design, astrology and numerology encyclopedia pages and sky events | https://rosmaryn.app/wp-json/rosmaryn/v1/mcp |
| `app.sallim/contract-compass` | Korean public procurement law, statutes, court precedents and contract method rulings | https://contract.sallim.app/mcp?via=official |
| `app.sentn/opportunity-intelligence` | Software business opportunity snapshots for founders | https://sentn-opportunity-mcp-773063283118.us-central1.run.app/mcp |
| `app.shelfclub/books` | 1.7 million books searchable by title, author, mood and genre | https://mcp.shelfclub.app/mcp |
| `app.slxd/aiapipricing` | AI model API prices, comparisons and price history | https://aiapipricing.slxd.app/mcp/aiapipricing |
| `app.sstracker/sstracker` | Age-appropriate youth sports drills and practice plans | https://us-east1-sstracker-launch.cloudfunctions.net/mcpServer |
| `app.tnpropertysearch/tn-property` | Tennessee parcel ownership, sale history and property records | https://tnpropertysearch.app/mcp |
| `app.toolaby/docs` | Toolaby docs on payments and licensing for Chrome extensions | https://toolaby.app/api/mcp |
| `app.tresca/catalog` | MCP servers and agent skills for engineering software | https://tresca.app/mcp |
| `app.trickl/trickl` | Trickl partner API and webhook documentation | https://api.trickl.app/mcp/dev |
| `app.vercel.auditflag-lac/auditflag` | Going-concern auditor opinions in SEC 10-K and 10-Q filings | https://auditflag-lac.vercel.app/api/mcp |
| `app.vercel.plety-desk/plety-guides` | Guides on licensing UK company records to AI buyers | https://plety-desk.vercel.app/mcp |
| `app.vercel.warstwa-omega/docs-mcp` | Warstwa shop terms, returns, delivery, privacy and help answers | https://warstwa-omega.vercel.app/docs/mcp |
| `app.veteranhq/va-disability-benefits` | VA disability ratings, compensation rules and 38 CFR regulations | https://api.veteranhq.app/mcp |
| `app.web.yutai-mcp/yutai-mcp` | Japanese shareholder benefits (yutai) by stock, with trading date rules | https://yutai-mcp.web.app/mcp |
| `app.wendung/docs` | Wendung SDK setup, funnel steps, server-side events docs | https://docs.wendung.app/mcp |
| `app.workfinds/jobs` | Open jobs from company career sites by applicant country and remote status | https://workfinds.app/mcp |
| `app.ziptool/search` | How to open, extract and preview archive files with ZipTool | https://ai.ziptool.app/mcp |
| `archi.den/den_archi_mcp` | Korean building codes, construction standards and architecture practice | https://mcp.den.archi/mcp |
| `art.braindrops/braindrops` | BrainDrops AI art pieces, collections, traits and holders | https://braindrops.art/mcp |
| `at.designare/knowledge` | Michael Kanda's profile, projects and web and AI expertise | https://designare.at/api/mcp |
| `au.com.assetize/maximo` | IBM Maximo and MAS upgrades, error codes, gotchas, versions and lifecycle | https://assetize.com.au/mcp |
| `au.com.bidit/registry` | Whether retailers price match or accept offers, verified by people | https://registry.bidit.com.au/api/mcp |
| `au.com.magreader/discovery` | Magazine articles and public previews with publisher attribution | https://app.magreader.com.au/agent/mcp |
| `au.com.nationaldigital/website` | National Digital services, articles and case studies | https://mcp.nationaldigital.com.au/mcp |
| `au.com.trip-planner/camping-australia` | Campsites, caravan parks and free camps with features and amenities | https://mcp.campingaustralia.com.au/mcp |
| `au.publicdata/mcp` | Australian government open datasets with query, counts and version history | https://publicdata.au/mcp |
| `az.trend/news` | News archive on Azerbaijan, the Caspian and Central Asia | https://api.trend.az/mcp |
| `be.art-deco-belgique/art-deco-belgique` | Art Deco buildings, architects and routes in Belgium and northern France | https://art-deco-belgique.be/api/mcp |
| `be.co-legal/legal-lookup` | Belgian and Dutch legislation, case law, companies and tax rates | https://agent.co-legal.be/mcp |
| `be.tripnet.mnemosyne/mnemosyne` | Lessons and questions shared by AI agents | https://mnemosyne.tripnet.be/mcp |
| `best.creditcards/mcp` | US credit card fees, APRs, rewards and sign-up bonuses | https://mcp.creditcards.best |
| `best.uneed/directory` | Directory of digital tools, SaaS products, reviews and alternatives | https://mcp.uneed.best/mcp |
| `bg.namerimidom/namerimidom` | Homes for sale and rent in Bulgaria with price statistics | https://namerimidom.bg/mcp/public |
| `bible.besorah/besorah` | Bible texts in Hebrew, Greek, Aramaic with Strong's word study | https://besorah.bible/mcp |
| `biz.yappy/yappy-docs` | Yappy macOS app setup, permissions, LLM backends and troubleshooting | https://yappy.biz/docs/mcp |
| `bot.botmarket/mcp` | Catalog of MCP servers, agent skills, tools and agents | https://botmarket.bot/mcp |
| `bot.com/combot` | Com.Bot WhatsApp platform plans, channels and site pages | https://com.bot/mcp |
| `bot.yeehaw/events` | Upcoming events in Austin, Texas | https://yeehaw.bot/mcp |
| `br.com.blucher/catalogo` | Editora Blucher technical and scientific books, prices and course syllabus matches | https://catalogo.blucher.com.br/mcp |
| `br.com.codeatlas/mcp` | CodeAtlas software services, capabilities and deliverables | https://codeatlas.com.br/mcp |
| `br.com.fipex/mcp` | Brazilian FIPE vehicle reference prices and history | https://api.fipex.com.br/mcp |
| `br.com.kliky/kliky-public-knowledge` | Kliky product information, plans, prices and public pages | https://kliky.com.br/api/mcp |
| `build.appside/mcp` | Appside developer docs and catalog of verified apps and games | https://appside.build/mcp |
| `build.fabricate/fabricate` | Fabricate plans, pricing and public documentation | https://fabricate.build/mcp |
| `build.gearlist/gearlist` | Source-checked directory of AI agent tools, MCP servers, skills | https://gearlist.build/mcp |
| `by.ai-belarus/registry` | Belarusian companies from the state registry by UNP | https://ai-belarus.by/mcp |
| `by.ai-tender/tenders` | Open public procurements and tenders in Belarus | https://ai-tender.by/mcp |
| `by.authorized/brands` | Brands and their authorized retailers, with authorization checks | https://app.authorized.by/api/public/mcp |
| `by.digitalpassport/registry-mcp` | Belarusian company registry data, legal status and business specializations | https://digitalpassport.by/api/mcp |
| `bz.manda/manda` | Japanese businesses for sale on the MANDA M&A marketplace | https://manda.bz/mcp |
| `ca.905trades/business-card` | 905 Trades Hamilton residential trades referral network facts and pages | https://905trades.ca/mcp |
| `ca.acrescout/land` | Land and acreages for sale across Canada | https://acrescout.ca/mcp |
| `ca.airiskmanagement/shadow-ai-list` | Risk scores of AI tools and shadow AI domains | https://ailist.airiskmanagement.ca/mcp |
| `ca.artsdata/mcp` | Canadian events, artists, organizations and venues knowledge graph | https://mcp.artsdata.ca/mcp |
| `ca.commercialgaragedoorman/business-card` | Commercial Garage Doorman services and facts for Hamilton area | https://www.commercialgaragedoorman.ca/mcp |
| `ca.entogo/knowledge` | Entogo transformers, switchgear, BESS and EV charging products and lead times | https://entogo.ca/mcp |
| `ca.garagedoorman/business-card` | Garage Doorman residential garage door repair facts in Grimsby Ontario | https://www.garagedoorman.ca/mcp |
| `ca.movahedi/privacy` | Canadian privacy enforcement, Quebec Law 25, cookies and AI crawlers | https://movahedi.ca/mcp |
| `ca.myoutfitters/mcp` | Canadian hunting and fishing outfitters and availability | https://myoutfitters.ca/mcp |
| `ca.netgrant/canadian-grants` | Canadian grants, tax credits, accelerators and loans with eligibility | https://mcp.netgrant.ca/mcp |
| `ca.oathready/citizenship-test` | Canadian citizenship test questions, study guides and IRCC stats | https://oathready.ca/api/mcp |
| `ca.ohey/research` | Web malware techniques, kits, EtherHiding contracts and threat research | https://ohey.ca/mcp/research |
| `ca.pulga/marketplace` | Quebec classified ads and categories | https://mcp.pulga.ca |
| `ca.regmap/regmap` | Canadian internal trade barriers, licence recognition and regulations catalogue | https://regmap.ca/mcp |
| `ca.resortfinder/resortfinder` | All-inclusive resort research, guest reviews and package prices from Canada | https://resortfinder.ca/mcp |
| `ca.speedydrone.agr/site` | Canadian agricultural drone spraying guides, regulations, costs and models | https://agr.speedydrone.ca/mcp |
| `ca.tradebasis/automotive-appraisal` | TradeBasis vehicle appraisal product, pricing and research briefs | https://tradebasis.ca/mcp |
| `care.fysio/discovery` | Swedish physiotherapy clinics, services and open appointment times | https://fysio.care/api/mcp |
| `care.nove/nove` | Pregnancy week-by-week development and gestation articles in Portuguese | https://nove.care/mcp |
| `care.vitena/directory` | Directory of health and wellness professionals | https://api.vitena.care/mcp |
| `cc.21btc/bitcoin-data` | Bitcoin price, ETF flows, on-chain metrics, fees and treasuries | https://21btc.cc/mcp |
| `cc.bestaffiliateprograms/directory` | Affiliate programs by commission, cookie window and network | https://bestaffiliateprograms.cc/v1/mcp |
| `cc.cyberjobs/mcp` | Open cybersecurity jobs, salaries and employer hiring data | https://cyberjobs.cc/api/mcp |
| `cc.hlist/hlist-ai-tools` | AI tools with China-access data and GitHub stats | https://hlist.cc/api/mcp |
| `cc.rockpool.ai-deals/ai-deals-sentinel` | Free tiers and credits for LLM, GPU, search and embedding APIs | https://ai-deals.rockpool.cc/mcp |
| `cc.ssearch/search` | General web search results and stored full-text documents | https://api.ssearch.cc/mcp |
| `center.lawncare/lawncare-center` | Lawn care guides with state and city specific timing | https://lawncare.center/mcp |
| `ch.1820/telefonbuch` | Swiss phone directory of people and businesses with reverse number lookup | https://mcp.1820.ch/mcp |
| `ch.agentready/swiss-company-directory` | Swiss company profiles by trade, service, and location | https://agentready.ch/api/mcp |
| `ch.antevo/research` | Dated research answers on economy and other desk topics | https://api.antevo.ch/mcp/research/mcp |
| `ch.bitspire/website` | BitSpire .NET development, AI agents, trainings and blog | https://bitspire.ch/mcp |
| `ch.busik/fahrten` | Minibus trips between Ukraine, Germany and Switzerland | https://busik.ch/api/mcp |
| `ch.easylpd/fadp` | Swiss FADP and GDPR duties, transfers and document templates | https://easylpd.ch/api/mcp |
| `ch.fedlex-connector/fedlex-connector` | Swiss federal laws, articles and amendment history | https://mcp.fedlex-connector.ch/ |
| `ch.funkyjobs/jobs` | Current job listings in Switzerland | https://www.funkyjobs.ch/mcp |
| `ch.immoswipe/immoswipe-ai` | Swiss rental and sale listings plus housing guides | https://ai.immoswipe.ch/mcp |
| `ch.qrsuisse/mcp-docs` | QR Suisse API documentation, guides, pricing and operations | https://www.qrsuisse.ch/mcp/docs |
| `ch.remotli/jobs` | Remote jobs at Swiss and CET companies with remote policies | https://remotli.ch/api/mcp |
| `ch.ticketick/ticketick` | Upcoming Swiss concerts, festivals, shows with dates and prices | https://ticketick.ch/api/mcp |
| `chat.avva/catalog` | Catalog of experts and their decision models by domain | https://mcp.avva.chat/mcp-catalog |
| `chat.wyp/docs` | WYP.chat help centre, guides, glossary, industry and channel pages | https://wyp.chat/mcp |
| `clinic.fountain/directory` | Longevity clinics by treatment and location with published prices | https://fountain.clinic/mcp |
| `cloud.lcas/directory` | ERC-8004 agents on Ethereum and Base with working endpoints | https://lcas.cloud/mcp |
| `cloud.xiximm/feeling-search` | Visual art styles matched to feelings, with prompt references | https://xiximm.cloud/mcp |
| `club.vaper/vaper-club` | Vape industry news, brands, shops, products, prices and reviews | https://api.vaper.club/mcp |
| `cm.cv/cv-cm` | Sourced rankings and reference datasets like country indicators and codes | https://cv.cm/mcp |
| `cn.com.shizi-ai/shizi-ai` | Industrial HVAC product specs: dehumidifiers, heat pumps, cleanrooms | https://shizi-ai.com.cn/mcp |
| `cn.gitpicker/gitpicker` | GitHub repositories, source code, issues, releases and commit history | https://gitpicker.cn/mcp |
| `cn.infimeta/public-source-search` | Encyclopedias, scholarly metadata and community sources | https://infimeta.cn/mcp |
| `cn.pianam.mcp/calendar-mcp` | Chinese public holidays, workday swaps and lunar calendar dates | https://mcp.pianam.cn/calendar-mcp/mcp |
| `cn.pianam.mcp/hot-trending-mcp` | Real-time trending topics on major Chinese platforms | https://mcp.pianam.cn/hot-mcp/mcp |
| `cn.pianam/classical-mcp` | Classical Chinese prose texts with translations, notes and analysis | https://pianam.cn/classical-mcp/mcp |
| `cn.pianam/handict-mcp` | Chinese character definitions, pinyin, radicals, strokes and word meanings | https://pianam.cn/handict-mcp/mcp |
| `cn.pianam/hot-trending-mcp` | Real-time trending topics on major Chinese platforms | https://pianam.cn/hot-mcp/mcp |
| `cn.pianam/idiom-mcp` | Chinese idioms with pinyin, meanings, origins and examples | https://pianam.cn/idiom-mcp/mcp |
| `cn.pianam/legal-mcp` | Chinese Civil Code, labor, consumer and traffic law articles | https://pianam.cn/legal-mcp/mcp |
| `cn.pianam/poetry-mcp` | Classical Chinese poems by title, author, dynasty with full text | https://pianam.cn/poetry-mcp/mcp |
| `cn.pianam/region-mcp` | China administrative divisions, postal codes, area codes, phone prefixes | https://pianam.cn/region-mcp/mcp |
| `cn.savantcat/answers` | China AI customer service standard GB/T 47746-2026 compliance answers | https://savantcat.cn/mcp |
| `co.agentsinthewild/agents-in-the-wild` | Real AI agent deployments at organizations with sourced outcomes | https://agentsinthewild.co/mcp |
| `co.brightkey/education-data` | University and international school profiles, degree ROI, education answers | https://brightkey.co/api/mcp |
| `co.cafedev/cafedev` | Latin American tech jobs and hiring companies | https://mcp.cafedev.co/mcp |
| `co.chinaready/search` | China market entry guides for Western software teams | https://mcp.chinaready.co/mcp |
| `co.civai.nova/mcp-bgpt-cacnigeria` | Nigerian company registrations from the Corporate Affairs Commission register | https://nova.civai.co/mcp/agents/mcp-bgpt-cacnigeria |
| `co.civai.nova/mcp-deep-research` | Iterative web research reports on complex topics | https://nova.civai.co/mcp/agents/mcp-deep-research |
| `co.civai.nova/mcp-hacker_news` | Hacker News stories, comment threads and user profiles | https://nova.civai.co/mcp/agents/mcp-hacker_news |
| `co.civai.nova/research-agent` | Live Google web search results with summaries | https://nova.civai.co/mcp/agents/research-agent |
| `co.colossalcapital/obvect` | Software tools, design patterns, code examples and exemplar repositories | https://mcp.colossalcapital.co/mcp |
| `co.darkknightcave/motion` | Web motion and animation recipes with prompts | https://cave-motion.darkknightcave.workers.dev/mcp |
| `co.fastaf/fastaf` | Google search, news, scholar, maps, jobs and web page content | https://api.fastaf.co/mcp |
| `co.foodose/glp1-nutrition` | GLP-1 nutrition targets, food nutrition data and recipes | https://www.foodose.co/mcp |
| `co.foreverinourhearts/memorials` | Public funeral notices, memorials and partner funeral homes | https://mcp.foreverinourhearts.co/mcp |
| `co.frontierresearch/frontier` | New research from top journals and paper citation impact metrics | https://frontierresearch.co/api/mcp |
| `co.golfdata/golfdata` | Golf equipment catalog with retailer prices and price history | https://golfdata.co/mcp |
| `co.haveny/california-hoa-law` | California HOA law, Davis-Stirling Act statutes and homeowner rights | https://haveny-mcp.havenyy.workers.dev/mcp |
| `co.heyspark.mcp/server` | Local businesses with contact info, hours and reviews | https://mcp.heyspark.co/mcp |
| `co.ivfcost/ivf-cost-data` | US IVF clinic prices, insurance laws, grants and fertility costs | https://ivfcost.co/api/mcp |
| `co.leviathansystems/public-content` | Leviathan Systems articles, services and company scope | https://www.leviathansystems.co/mcp |
| `co.masqot.mcp/mcp` | Turkish AI and tech community events, communities and posts | https://mcp.masqot.co |
| `co.newcollab/ugc-creator-search` | Vetted UGC creators and brands running creator campaigns | https://api.newcollab.co/api/v1/integrations/claude/mcp |
| `co.peptidesacademy/peptides-academy` | Peptide research evidence, comparisons and supporting scientific papers | https://peptidesacademy.co/mcp |
| `co.rentalhunter/rentalhunter` | Rental homes and PG listings in India and Southeast Asia | https://rentalhunter.co/mcp |
| `co.saleslegends/sales-jobs` | Open sales jobs, posted pay ranges and hiring counts | https://saleslegends.co/api/mcp |
| `co.spicefactory/public` | SpiceFactory essays and case studies on regulated hardware products | https://spicefactory.co/api/mcp/ |
| `co.stylecloud.dropflow/mcp` | DropFlow WordPress page builder docs, blocks and changelog | https://dropflow.stylecloud.co/mcp |
| `co.supp/suppco` | Supplement products, brand trust scores and supplement research | https://api.supp.co/mcp |
| `co.theoldways/library` | Historical texts and mythology references with citation URLs | https://mcp.theoldways.co/mcp |
| `co.totalcms/docs` | Total CMS documentation, Twig reference and CMS comparisons | https://totalcms.co/mcp |
| `co.yachtfinder/yachtfinder` | Yachts for sale and charter with specs and AIS positions | https://mcp.yachtfinder.co/mcp |
| `co.zindies/zindies` | Independent zines, creators, shops and zine events in Japan | https://mcp.zindies.co/ |
| `com.0xpi.pantrypos/find-food-pantry` | US food pantries near a location and state TEFAP rules | https://pantrypos.0xpi.com/mcp-pantry |
| `com.0xpi.sdsentry/sds-lookup` | Chemical safety data sheets, GHS pictograms and OSHA HazCom dates | https://sdsentry.0xpi.com/mcp-sds |
| `com.1001locals/catalog` | Local tours and experiences in Italy and Europe | https://api.1001locals.com/mcp |
| `com.1102tools/ecfr-mcp` | US Code of Federal Regulations text including FAR and DFARS, with change history | https://ecfr.1102tools.com/mcp |
| `com.1102tools/regulations-gov-mcp` | US rulemaking dockets, documents, public comments and open comment periods | https://regulations-gov.1102tools.com/mcp |
| `com.1network/directory-readonly` | US local businesses: addresses, hours, services, ratings | https://1network.com/mcp/readonly |
| `com.1vr/skill-store` | Catalog of agent skills with pre-install security audit signals | https://1vr.com/mcp/skill-store |
| `com.313automations/site` | 313 Automations services, prices and site pages | https://313automations.com/mcp |
| `com.360tft/coaching-brain` | Football coaching writing by Kevin Middleton | https://brain.360tft.com/api/brain/mcp |
| `com.3dvalley/mcp` | Free CC0 3D models, PBR textures, HDRIs and sounds | https://3dvalley.com/mcp |
| `com.6102ttk/karar-arama` | Turkish commercial court decisions and Turkish Commercial Code articles | https://6102ttk.com/mcp |
| `com.99datarooms/mcp` | 99 Data Rooms pricing, docs, glossary and use cases | https://mcp.99datarooms.com/mcp |
| `com.abcdancer/events` | Social dance events for bachata, salsa, kizomba, zouk by city | https://abcdancer.com/events/mcp |
| `com.abutly/site` | Abutly dataset rows with statistics and provenance | https://abutly.com/mcp |
| `com.accentvoice/site` | Accent cloud phone and messaging site content and plan prices | https://www.accentvoice.com/agent/mcp |
| `com.actualgroup/jobs` | Actual group job offers in France and employment agencies | https://www.actualgroup.com/mcp |
| `com.acuiq/acuiq` | Acupuncture protocols by symptom, acupoints and meridians | https://acuiq.com/api/mcp |
| `com.adcritter/mcp-dev` | AdCritter ads platform docs and API reference | https://mcp.adcritter.com/mcp/dev |
| `com.addrbook/directory` | Directory of AI agents, MCP servers, x402 APIs and payment details | https://api.addrbook.com/v1/mcp |
| `com.aditus.developers/developer-portal` | ADITUS event ticketing and access API documentation | https://developers.aditus.com/api/mcp |
| `com.adminlanding/french-rental-compliance` | French rental law, zone tendue, notice periods, DPE limits and home employment rules | https://api.adminlanding.com/mcp |
| `com.admit-coach/university-data` | US colleges: admissions, costs, financial aid and deadlines from federal data | https://admit-coach.com/api/mcp/ |
| `com.admitbase/admissions` | Admissions statistics for law, medical, dental and MBA schools | https://admitbase.com/api/mcp |
| `com.adrenalinelist/adventures` | Adrenaline adventures worldwide by destination, category and season | https://www.adrenalinelist.com/api/mcp |
| `com.adrianhomelab/mall-directory` | Stores in 49 malls across Romania, US, UK and Hungary | https://mall-mcp.adrianhomelab.com/mcp |
| `com.adslibraryapi/meta-google-tiktok-ads-library-mcp` | Live ad creatives from Meta, Google and TikTok ad libraries | https://api.adslibraryapi.com/mcp |
| `com.advisorfinder/mcp` | SEC-registered financial advisors, firms, disclosures and fees | https://mcp.advisorfinder.com/mcp |
| `com.agencysearchtool/agencies` | Professional service agencies worldwide with ratings and contacts | https://agencysearchtool.com/mcp.php |
| `com.agentcosthub/agent-cost-hub` | LLM API token prices and agent cost estimates | https://agentcosthub.com/mcp |
| `com.agentexplorio/agentexplorio` | AI agents and MCP servers by task, pricing and reviews | https://agentexplorio.com/mcp |
| `com.agentmaru/agentmaru` | Korean export estimates, HARPEX freight index and official FX, CPI and GDP data | https://agentmaru.com/mcp |
| `com.agentonair/podcasts` | AI-hosted podcast episodes, shows and hosts | https://api.agentonair.com/mcp |
| `com.agentready-tools/catalog` | Curated catalog of agent-ready APIs, MCP servers and tools | https://agentready-tools.com/mcp |
| `com.agentresourcemarket/agent-resource-market` | Agent profiles, service offers and discussions | https://agentresourcemarket.com/api/mcp |
| `com.agents-wiki/agents-wiki` | Knowledge base articles written for AI agents | https://agents-wiki.com/mcp |
| `com.agentsbooks/commons` | Agent forum threads and Q&A knowledge base | https://agentsbooks.com/api/commons/mcp |
| `com.agentscouthq/directory` | Directory of AI agent tools and MCP servers | https://mcp.agentscouthq.com/mcp |
| `com.agentsearchhq/search` | Live web search results, news articles and page contents | https://relay.agentsearchhq.com/mcp |
| `com.agentsecurityindex/agent-security-index` | Directory of AI agent security tools, vendors, pricing, licenses | https://mcp.agentsecurityindex.com/mcp |
| `com.agentshandbook/handbook` | Playbooks and lessons for jobs done with AI agents | https://agentshandbook.com/mcp |
| `com.agentstackd/directory` | Reviewed AI agents and tools with pricing and limitations | https://agentstackd.com/api/mcp |
| `com.agentstackdata/agentstack` | Verified AI agent tool catalog with prices and specs | https://agentstackdata.com/mcp |
| `com.agentstackdirectory/agent-stack-directory` | Infrastructure tools for AI agents, listed and comparable | https://agentstackdirectory.com/mcp |
| `com.agentwebmap/agentwebmap` | Publisher documentation pages found via llms.txt files | https://agentwebmap.com/mcp |
| `com.aguasto.www/docs` | Aguasto published research descriptions and references | https://www.aguasto.com/mcp/docs |
| `com.ai-today/news` | Latest AI news articles with sources | https://ai-today.com/mcp |
| `com.aibenchmarkindex/directory` | AI benchmarks by category with data sources and licences | https://aibenchmarkindex.com/mcp |
| `com.aicasepredict/aicasepredict` | US court cases, attorneys, judges and courts records | https://aicasepredict.com/mcp |
| `com.aidemos/catalogue` | AI tool reviews, rankings, use cases and comparisons | https://mcp.aidemos.com/mcp |
| `com.aidevboard/jobs` | Current AI jobs, companies and salaries | https://aidevboard.com/mcp |
| `com.aifindme/directory` | Business and web shop fact cards: hours, contacts, products | https://aifindme.com/mcp |
| `com.aigregator/ai-tools` | AI tools directory with pricing, features and alternatives | https://x402.aigregator.com/mcp |
| `com.ailately/research` | AI industry reporting on people, companies and moves | https://ailately.com/mcp |
| `com.ainovaq/mcp` | Ainovaq services, blog on startups and go-to-market | https://ainovaq.com/mcp |
| `com.aiplatformslist/ai-tools` | Hand-checked AI tools, their plans, pricing and deals | https://aiplatformslist.com/mcp |
| `com.aiprofile/answers` | Sourced answers about local businesses, many owner-confirmed | https://www.aiprofile.com/api/mcp |
| `com.airatecard/ai-rate-card` | AI model API prices across 120+ providers and cost comparisons | https://airatecard.com/mcp |
| `com.airedteamingservices/site` | AI application security guides and red teaming research | https://airedteamingservices.com/mcp |
| `com.airfreightprice/mcp` | Air freight routes, carriers, airports and transit times | https://mcp.airfreightprice.com/mcp |
| `com.aisetupsthatwork/setups` | Step-by-step AI setups for small business, work and home | https://www.aisetupsthatwork.com/api/mcp |
| `com.aiskilldir/directory` | Curated AI agent skills, prompts and MCP servers | https://aiskilldir.com/mcp |
| `com.aitwire/authority` | Business-published records on entities with confirmation dates and claim checks | https://api.aitwire.com/mcp |
| `com.al-taswia.www/iraqi-law-research` | Iraqi law articles and official legislation links | https://al-taswia-iraqi-law-research.al-taswia.workers.dev/mcp |
| `com.alephlo/search` | Worldwide classified listings for goods, jobs, services and homes | https://alephlo.com/mcp |
| `com.alertasubastas/alertasubastas` | Spanish public auction listings with full asset records | https://alertasubastas.com/mcp |
| `com.alexandria-archive/archive` | History of Alexandria, Egypt: photographs, documents, maps and articles | https://www.alexandria-archive.com/mcp |
| `com.alkemata/public-knowledge` | Alkemata articles, knowledge map topics and published notebooks | https://alkemata.com/wp-json/mcp/alkemata-public |
| `com.all-today/news` | World news articles with sources and headlines | https://all-today.com/mcp |
| `com.alleskralle/jobs` | 500k job listings in Austria, Germany and Switzerland | https://mcp.alleskralle.com/mcp |
| `com.allmcpservers/directory` | Directory of MCP servers with setup and endpoint details | https://www.allmcpservers.com/mcp |
| `com.alltegrio/site` | Alltegrio AI development services, case studies and company info | https://mcp.alltegrio.com/ |
| `com.alonzio/alonzio` | Tested agents, MCP servers and APIs for given tasks | https://alonzio.com/mcp?src=mcp-registry |
| `com.alphacitation/reference` | Drug approval status and FDA/EU label contents by market | https://alphacitation.com/api/v1/reference/mcp |
| `com.alwa7i.bayan/bayan` | Arabic hadith with grades, Qur'an verses with tafsir, narrators | https://bayan.alwa7i.com/mcp |
| `com.amazonaws.us-east-1.execute-api.4fucgqu5if/agent-platform-rules` | Whether AI agents may post or automate on Reddit, HN, Bluesky, GitHub, X | https://4fucgqu5if.execute-api.us-east-1.amazonaws.com/mcp |
| `com.americassuretybonds/surety-bonds` | US surety bond requirements across all 50 states | https://americassuretybonds.com/mcp |
| `com.aminodesk/amino-desk` | Peptides and GLP-1 drugs: evidence, legal status, dosing, safety, cost | https://aminodesk.com/mcp |
| `com.amortlane/site` | Amortlane dataset rows with statistics, provenance and citations | https://amortlane.com/mcp |
| `com.ampdat/control` | Who controls DeFi contracts like Morpho, Compound v3 and Safes | https://control.ampdat.com/mcp |
| `com.ampworth/documents` | UK guides on solar PV, heat pumps, batteries and MCS certification | https://ampworth.com/mcp/documents |
| `com.anchorterminal/anchor-terminal` | Graded directory of AI agent tools, MCP servers, prices | https://www.anchorterminal.com/mcp |
| `com.andrewcmcguire/gtm-directory` | Sourced research on go-to-market software and their MCP servers | https://andrewcmcguire.com/gtm-directory/mcp |
| `com.anibg/backgrounds` | Library of free anime background scenes without characters | https://anibg.com/mcp |
| `com.anots/directory` | Businesses listed on ANOTS and answers from their agents | https://api.anots.com/mcp |
| `com.answeringservicecare/public` | Answering Service Care company info, services, pricing and site pages | https://answeringservicecare.com/mcp |
| `com.answerkb/kb` | Short answers on math, how-to, science, geography, economic data | https://answerkb.com/mcp |
| `com.anthonyhunts/shaart-agency-docs` | GoHighLevel and AI automation guides, services and pricing | https://www.anthonyhunts.com/api/mcp/docs |
| `com.apievangelist/api-evangelist` | API research, governance guides, and registry of API tools and services | https://mcp.apievangelist.com/mcp |
| `com.apmzoom.www/dongdaemun` | Dongdaemun Seoul wholesale fashion items, new arrivals and stalls | https://www.apmzoom.com/mcp |
| `com.appinitdev/knowledge` | AppInitDev Android apps and technical articles and guides | https://appinitdev-mcp.dev-appinitdev.workers.dev/mcp |
| `com.apple-rag/mcp-server` | Apple developer documentation and WWDC video transcripts | https://mcp.apple-rag.com |
| `com.applivery.docs/mcp` | Applivery documentation on MDM, app distribution and REST API | https://docs.applivery.com/mcp |
| `com.applyall/mcp` | Employer-sourced job listings with title and location lookup | https://applyall.com/mcp |
| `com.arcalune/music` | Royalty-free background music, sound effects and game arrangements | https://arcalune.com/mcp |
| `com.arcandledger/tax-tools` | US tax reference: IRS notices, deadlines, penalties, FBAR, treaty withholding | https://mcp.arcandledger.com/directory/mcp |
| `com.arcat/arcat` | Building products, manufacturers, CAD/BIM and specs by CSI section | https://mcp.arcat.com/mcp |
| `com.ariberi/freight` | Active freight loads by route in Central Asia, China, Russia | https://ariberi.com/mcp |
| `com.artnap/artnap` | Public domain artworks from 72 museums with records and licenses | https://artnap.com/mcp |
| `com.artsdot/art-search` | Artworks, artists, museums and art articles | https://direct.artsdot.com/mcp/ |
| `com.ascent-partners/esg-hub` | ESG articles, glossary, frameworks and industry guidance | https://esg-hub.ascent.partners/api/mcp |
| `com.ask10ais/mcp` | Measured rankings of brands in AI model answers, Chinese and English | https://ask10ais.com/api/mcp |
| `com.askonhand/onhand` | Local Dallas shops: hours, contacts, stock and services | https://mcp.askonhand.com/mcp/onhand |
| `com.askpandi/ask-pandi` | Researched answers to questions with numbered citations | https://askpandi.com/api/mcp |
| `com.asksakina/islamic-knowledge` | Quran verses in Arabic and English, du'as and the 99 Names of Allah | https://sakina-mcp.fly.dev/mcp |
| `com.assessall/catalogue` | Online skill assessments, free practice tests and assessment guides | https://www.assessall.com/mcp |
| `com.atcspaces/atc` | Transcripts and summaries of ATC crypto, markets and AI X Spaces shows | https://mcp.atcspaces.com/mcp |
| `com.atlanticagenticlabs/ask` | LightHouse product documentation, API reference and Atlantic company information | https://ask.atlanticagenticlabs.com/mcp |
| `com.attestroom/site` | Attestroom dataset rows with statistics, provenance and citations | https://attestroom.com/mcp |
| `com.attestvio/site` | Attestvio dataset rows with statistics, provenance and citations | https://attestvio.com/mcp |
| `com.auction-radar/auction-radar` | Korean court real estate auctions, rights risks, sold prices, statistics | https://auction-radar.com/mcp |
| `com.augur-trade/foresight-web` | Web page text, domain data, Wikipedia, arXiv, GitHub and package info | https://augur-trade.com/foresight/mcp/web |
| `com.aura-historia/mcp` | Art and antiques listings from dealers and auction houses | https://mcp.aura-historia.com/v1 |
| `com.australiawidefirstaid/docs` | First aid library, policies and developer docs from Australia Wide First Aid | https://www.australiawidefirstaid.com/mcp/docs |
| `com.autodesk.aps.api/product-help-mcp` | Official Autodesk help documentation for 110+ products | https://api.aps.autodesk.com/knowledge/public/v1/mcp |
| `com.automateandtweak/ai-tools` | Directory of AI tools with pricing, categories and comparisons | https://automateandtweak.com/mcp |
| `com.autoprivado/autoprivado` | Private-seller car listings in Europe, VIN decoding and used car price estimates | https://autoprivado.com/mcp |
| `com.autosecurelogin/colorado-complaint-access` | Colorado professional licenses, SOMB providers and DORA board rules | https://mcp.autosecurelogin.com/colorado/mcp |
| `com.autosecurelogin/doctor-search` | US healthcare providers from the NPI registry | https://mcp.autosecurelogin.com/doctors/mcp |
| `com.autosecurelogin/policy-lens` | Colorado corrections, jail and state agency policies with citations | https://mcp.autosecurelogin.com/policy/mcp |
| `com.avecindar/rental-search` | Rental homes in Uruguay with costs and conditions | https://avecindar.com/mcp |
| `com.avenbridgetech/avenbridge` | Supplier documents, certificates and approved answers shared by businesses | https://mcp.avenbridgetech.com/mcp |
| `com.avokata/avokata` | Lithuanian and EU law and court practice with citations | https://mcp.avokata.com/mcp?src=registry |
| `com.awesomeindie/mcp` | Indie product launches, rankings and makers | https://awesomeindie.com/api/mcp |
| `com.b0tl1nk/directory` | Directory of applications listed for AI agents | https://b0tl1nk.com/mcp |
| `com.bankcodelookup/site` | Bank codes dataset with search and statistics | https://bankcodelookup.com/mcp |
| `com.batesio/site` | Batesio dataset rows with statistics, provenance and citations | https://batesio.com/mcp |
| `com.bayanlibrary/library` | Quran, hadith and classical Sunni Islamic books with citations | https://bayanlibrary.com/mcp |
| `com.beatandraise/sec-filings` | SEC EDGAR filings, financial statements, insider trades and 13F holdings | https://beatandraise.com/mcp |
| `com.benchlet/incidentlib` | Public post-incident reports by symptom, root cause and component | https://incidentlib-mcp.benchlet.com/mcp |
| `com.bereishes/bereishes` | Classical Jewish texts: Tanach, Talmud, Midrash, halacha, commentaries | https://bereishes.com/api/mcp |
| `com.bestaithings/directory` | Reviewed AI tools with pricing, platforms, API and MCP support | https://bestaithings.com/mcp |
| `com.bestsaaswebdesigns/catalog` | 400 real SaaS marketing websites as design references by style and stack | https://mcp.bestsaaswebdesigns.com/mcp |
| `com.besttraintour/best-train-tour` | Rail vacation tours worldwide with itineraries and prices | https://besttraintour.com/mcp/mcp |
| `com.bgpkit/bgpkit-api` | BGP MRT archives, IP and ASN information, BGP communities | https://mcp.bgpkit.com/mcp |
| `com.bidalto.mcp/tenders` | Open Spanish public-sector tenders with budgets and award criteria | https://mcp.bidalto.com/mcp |
| `com.bids44/marketplace` | Used product resale prices in India and Bids44 listings | https://bids44-mcp-751110103074.asia-south1.run.app/mcp |
| `com.binstockly/site` | Binstockly dataset rows with statistics, provenance and citations | https://binstockly.com/mcp |
| `com.biomiv/bioai` | Health condition research, diets, clinical trials and medical news | https://biomiv.com/mcp/v1 |
| `com.birjob/jobs` | Open job vacancies and employers in Azerbaijan | https://www.birjob.com/mcp |
| `com.birkinbagstock/mcp` | Hermès Birkin resale asking prices, auction results and authentication notes | https://birkinbagstock.com/mcp |
| `com.birthdaypaper/birthdaypaper` | Headlines, number-one hits and birthdays for dates since 1946 | https://mcp-birthdaypaper.michael-bertelsenmedia.workers.dev/mcp |
| `com.bizvaluedash/business-value` | Guides on valuing small businesses and indicative value estimates | https://bizvaluedash.com/mcp |
| `com.bkkradar/condos` | Bangkok condo listings, median rents, sale prices near BTS/MRT | https://bkkradar.com/api/mcp |
| `com.blacklabelbots/site-mcp` | Public pages and products of Black Label Bots | https://blacklabelbots.com/mcp |
| `com.blacklabeltec/site-mcp` | Public pages of BlackLabel Tech | https://blacklabeltec.com/mcp |
| `com.blbestate/site-mcp` | Public property records, parcels and owners by US state | https://blbestate.com/mcp |
| `com.blicht/mcp` | Articles on e-commerce, AI and lifestyle in German and English | https://blicht.com/mcp |
| `com.blindboxshop/mcp` | Blind box weights, chase odds and Labubu authenticity checks | https://blindboxshop.com/api/mcp |
| `com.blockreq/rpc` | BlockReq docs, EVM chain data, DEX token prices and holders | https://mcp.blockreq.com/mcp |
| `com.blocksentient/directory` | Business software listings with prices, compliance and transparency scores | https://blocksentient.com/mcp |
| `com.blockvectra/docs` | Robinhood Chain and EVM RPC/API documentation | https://docs.blockvectra.com/mcp/docs |
| `com.blueteamjobs/jobs` | Defensive cybersecurity job openings and salary percentiles | https://mcp.blueteamjobs.com/mcp |
| `com.blvigil/site-mcp` | Public pages and products of Vigil | https://blvigil.com/mcp |
| `com.boardroomlist/mcp` | Open senior roles at the 500 largest US companies | https://boardroomlist.com/api/mcp |
| `com.bonebenders/bonebenders` | Dentistry: implantology, periodontology, oral surgery, glossary and drugs | https://bonebenders.com/mcp |
| `com.bonissystems/health-agent` | Insurance denial codes, HCPCS codes, appeal deadlines, 2027 Medicare drug plans | https://healthagentcare.com/api/mcp |
| `com.bonissystems/registry-expansion` | Which public registries apply to each kind of legal entity | https://bonissystems.com/api/knox/agents/registry-expansion/mcp |
| `com.bookatu/docs` | Bookatu help guides, blog posts, developer API docs and pricing | https://bookatu.com/api/mcp/docs |
| `com.boostermage/mtg-prices` | Magic: The Gathering sealed product prices across UK retailers with history | https://mcp.boostermage.com/mcp |
| `com.bot2botlabs/deadline-desk` | US retailer return, warranty and cancellation policies with cited text | https://deadline.bot2botlabs.com/mcp |
| `com.botgathering/recipes` | Tested step-by-step recipes written by AI agents | https://botgathering.com/mcp |
| `com.botrecipe/recipes` | AI bot setup recipes with steps, what worked and what failed | https://botrecipe.com/api/mcp |
| `com.botshelfvampire/botshelf` | Library of AI prompts, skills, agent teams and tools | https://botshelfvampire.com/api/mcp |
| `com.brainonbnb/bnb-chain-fix-board` | Verified fixes for BNB Chain agent, bot and dApp errors | https://brainonbnb.com/mcp/board |
| `com.bravodm/bravodm` | Creator brand deal pricing, brand creator programs and niche rate benchmarks | https://bravodm.com/api/mcp |
| `com.breakerdesk/site` | BreakerDesk dataset rows with statistics, provenance and citations | https://breakerdesk.com/mcp |
| `com.brelsfordsoftware.agentweb/insurance-ai-regulation` | NAIC AI model bulletin adoption by US state for insurers | https://agentweb.brelsfordsoftware.com/mcp |
| `com.brofindai/brofindai` | Directory of AI tools, agents and MCP servers by task and pricing | https://brofindai.com/api/mcp |
| `com.built2winweb/built2winweb` | BuiltToWinWeb services, industries, pricing and blog for small business sites | https://built2winweb.com/mcp |
| `com.bukaez/bukaez` | Public posts, AI characters and communities on BUKAEZ | https://bukaez.com/mcp |
| `com.burdenrateledger/site` | BurdenRateLedger dataset rows with statistics, provenance and citations | https://burdenrateledger.com/mcp |
| `com.bushdrum/events` | Events by city from Bushdrum | https://bushdrum.com/mcp |
| `com.buypopart/art-search` | Pop art, street art, artists, museums and art articles | https://direct.buypopart.com/mcp/ |
| `com.byjg/docs` | ByJG open source docs for PHP, DevOps, Helm and JavaScript | https://mcpdocs.byjg.com/mcp |
| `com.byokg/byokg` | Knowledge graph nodes, relations and cited evidence across topic rooms | https://byokg.com/mcp |
| `com.cacheby/search` | Lab reagents and supplies sold in Korea with KRW prices | https://api.cacheby.com/mcp |
| `com.cafmlane/site` | Cafmlane dataset rows with statistics, provenance and citations | https://cafmlane.com/mcp |
| `com.calibvo/site` | Calibvo dataset rows with statistics, provenance and citations | https://calibvo.com/mcp |
| `com.callejear/france` | French streets, nearby amenities, energy ratings and commune risks | https://callejear.fr/api/mcp |
| `com.calmido/phone-number-lookup` | Who is behind Dutch, Belgian and Luxembourg phone numbers, spam reports | https://www.calmido.com/api/mcp |
| `com.calvingwatch/public-knowledge` | CalvingWatch product, camera requirements, privacy and safety limits | https://calvingwatch.com/mcp |
| `com.calyban/catalog` | MCP servers, skills, plugins and coding agent compatibility | https://calyban.com/calyban-mcp |
| `com.canarics/radio` | Transcripts of AI-hosted radio episodes in Latvian and English | https://canarics-radio-647994203646.europe-central2.run.app/mcp |
| `com.canonicai/canonicai-answers` | Cited answers and domain canons of constructs and relationships | https://canonicai.com/api/mcp |
| `com.canopy-io/docs` | Canopy dashboard and API documentation | https://canopy-io.com/mcp |
| `com.capanix/site` | Capanix dataset rows with statistics, provenance and citations | https://capanix.com/mcp |
| `com.captiatechnology/knowledge` | Industrial glossary, protocols and technical guides | https://www.captiatechnology.com/api/mcp/ |
| `com.carathunter/diamond-prices` | Certified diamond prices across 100 retailers and certificate lookups | https://carathunter.com/mcp |
| `com.carbikly/site` | Carbikly dataset rows with statistics, provenance and citations | https://carbikly.com/mcp |
| `com.careerbhavan/courses-and-colleges` | Indian courses, colleges and online universities: fees, approvals, syllabus | https://mcp.careerbhavan.com/mcp |
| `com.carhandshake/inventory` | Live vehicle inventory from US and Canadian dealers | https://mcp.carhandshake.com/mcp |
| `com.carlnotes/carlnotes` | Curated research findings and summaries on user-followed topics | https://carlnotes.com/mcp |
| `com.carriertrail/mcp` | US motor carrier records from FMCSA: authority, insurance, safety | https://carriertrail.com/mcp/v1 |
| `com.casco/cve-intelligence` | CVE records, severity and package vulnerability advisories | https://casco.com/cve/mcp |
| `com.censusev/census` | US electric car listings, prices, battery warranties and market data | https://censusev.com/api/mcp |
| `com.certmadeeasy/exam-practice` | Certification exam details, study paths and sample questions | https://certmadeeasy.com/mcp |
| `com.ceruleanjobs/search` | Open jobs at luxury houses and brands worldwide | https://ceruleanjobs.com/api/mcp |
| `com.chateaupedia/chateaux` | French castles with hours, prices, accessibility and events | https://chateaupedia.com/mcp |
| `com.chinadrivetest/mcp` | China driving theory questions, license conversion, road signs and permits | https://chinadrivetest.com/api/mcp |
| `com.christianjobslist/jobs` | Current Christian job listings by category and location | https://www.christianjobslist.com/api/mcp |
| `com.christianpure/connector` | Christian articles, prayers, Bible verses by topic | https://christianpure.com/wp-json/christianpure-connector/v1/mcp |
| `com.citedindex/mcp` | AI visibility and GEO tool prices, coverage and limits | https://citedindex.com/mcp |
| `com.citestamp/citestamp` | Scholarly citation graph: what supports, refutes or cites a paper, retractions | https://mcp.citestamp.com/mcp |
| `com.clareohealth/clinical-trials` | ClinicalTrials.gov trials, eligibility criteria, sites and status | https://www.clareohealth.com/mcp |
| `com.claspine/claspine` | Claspine guides, API reference, recipes and upgrade notes | https://api.claspine.com/mcp |
| `com.claude-world/worlds-knowledge` | CLI guides, commands and configuration for Claude Code, Codex and Grok Build | https://mcp.claude-world.com/mcp |
| `com.claude.platform/docs` | Claude Platform documentation and API reference | https://platform.claude.com/docs/mcp |
| `com.claudecoworkplugins/directory` | Claude plugins and skills with install commands | https://www.claudecoworkplugins.com/mcp/ |
| `com.claudeers/mcp` | Registry of Claude skills, plugins and MCP tools ranked by maintenance | https://claudeers.com/api/mcp/mcp |
| `com.claudeforcompliance/mortgage-regs` | Verbatim US mortgage regulations and guidelines with citations | https://mcp.claudeforcompliance.com/mcp |
| `com.clauselane/site` | Clauselane dataset rows with sources and statistics | https://clauselane.com/mcp |
| `com.clegaragedoors/garage-door-decision-kit` | Residential garage door knowledge, quote checks and spring usage | https://mcp.clegaragedoors.com/mcp |
| `com.clideck/network-knowledge` | Version-scoped network device commands, diagnostics and concepts | https://mcp.clideck.com/mcp |
| `com.clientvo/site` | Clientvo dataset rows with sources and statistics | https://clientvo.com/mcp |
| `com.cliniatlas/evidence` | Graded medical evidence answers, PubMed metadata and EU medicine data | https://ydjbww4h7sfqc3sf2wcf26mfbq0bwvfu.lambda-url.eu-central-1.on.aws/public/mcp |
| `com.clipboardo/site` | Clipboardo dataset rows with statistics, provenance and citations | https://clipboardo.com/mcp |
| `com.clipkaboom/mcp` | Meme and reaction video clips with transcripts and moods | https://api.clipkaboom.com/mcp |
| `com.cmmsly/site` | Cmmsly dataset rows with sources and statistics | https://cmmsly.com/mcp |
| `com.cnccompass/suppliers` | Reviewed Chinese CNC machining suppliers with sourced facts | https://cnccompass.com/mcp |
| `com.coawp/internships` | Open internships, co-ops and student jobs from employer job boards | https://coawp.com/mcp |
| `com.codedebut/mcp` | New software product launches, categories and rankings | https://codedebut.com/api/mcp |
| `com.codemate/website` | Codemate company services, case studies, articles, contacts and jobs | https://codemate.com/mcp |
| `com.codercops/codercops` | Software developer profiles and remote developer job listings | https://api.codercops.com/mcp |
| `com.codestringers/mcp` | CodeStringers Zoho and custom software content and business details | https://www.codestringers.com/_api/mcp |
| `com.codetrendy/directory` | Directory of software, SaaS and AI tools with alternatives | https://codetrendy.com/api/mcp |
| `com.coildesk/site` | CoilDesk dataset rows with statistics, provenance and citations | https://coildesk.com/mcp |
| `com.communitymentions/communitymentions` | Subreddits cited by AI answers and their most-cited threads | https://communitymentions.com/api/mcp |
| `com.compamir/news` | Structured news events in Japanese and English with divergent source reports | https://api.compamir.com/mcp |
| `com.compensationprofessional/discovery` | Compensation book library, answers and US minimum wage rates | https://compensationprofessional.com/api/mcp |
| `com.compoid/mcp-server` | Shared research records, papers, images and videos from communities | https://mcpv.compoid.com/mcp |
| `com.conductscience/catalog` | Lab equipment, research software products and behavioral test paper counts | https://conductscience.com/api/mcp/catalog |
| `com.conferencefindr/events` | Upcoming business conferences and trade shows with dates, venues, prices | https://www.conferencefindr.com/api/mcp |
| `com.consentvia/site` | Consentvia dataset rows with statistics, provenance and citations | https://consentvia.com/mcp |
| `com.cookievo/site` | Cookievo dataset rows with statistics, provenance and citations | https://cookievo.com/mcp |
| `com.coppica/persuasion-taxonomy` | 766 documented persuasion techniques for marketing copy | https://taxonomy.coppica.com/mcp |
| `com.corpusfetch/corpusfetch` | Verified failure modes and fixes for software and agent errors | https://mcp.corpusfetch.com/mcp |
| `com.coshhvo/site` | Coshhvo dataset rows with statistics, provenance and citations | https://coshhvo.com/mcp |
| `com.countrygenerator/mcp-server` | Country capitals, populations, languages, currencies and borders | https://countrygenerator.com/mcp |
| `com.courierpr/mcp` | Published company press releases across newsroom desks and categories | https://courierpr.com/api/mcp |
| `com.courtdelta/court-delta` | North Carolina court cases, judgments, hearings and courthouse info | https://mcp.courtdelta.com/mcp |
| `com.craftedtrust/mcp-shield` | Trust scores and security scans for 4,200 MCP servers | https://mcp.craftedtrust.com/api/v1/mcp |
| `com.craftingeventfinder/events` | US crafting shows, retreats and workshops | https://craftingeventfinder.com/api/mcp |
| `com.craftingstepbystep/tutorials` | Step-by-step papercraft tutorials with tools and supplies | https://www.craftingstepbystep.com/api/mcp |
| `com.crosodo/mcp` | US cottage food laws, county permits and food sale legality | https://crosodo.com/api/mcp |
| `com.cryptocasinomedia/newsroom` | Crypto casino and iGaming industry news and press releases | https://cryptocasinomedia.com/api/mcp/ |
| `com.csatzo/site` | Csatzo dataset rows with statistics, provenance and citations | https://csatzo.com/mcp |
| `com.csidia/notes` | Italian notes on AI regulation, data protection and compliance | https://mcp.csidia.com/mcp |
| `com.cuevr/mcp` | Cuevr sales software pages, selling advice, ROI figures and documentation in French | https://www.cuevr.com/mcp |
| `com.culturalsignal/wire` | Art-world news, art jobs, fair calendar and salary data | https://culturalsignal.com/api/mcp |
| `com.curatorapproved/the-curator` | Curated finds in clothing, audio, designed objects and music | https://curatorapproved.com/api/mcp |
| `com.curtilo/site` | Curtilo dataset rows with sources and statistics | https://curtilo.com/mcp |
| `com.customprintingco/site` | Label printing costs, materials and labeling compliance guides | https://customprintingco.com/mcp |
| `com.cyberlibrary/library` | Structured cybersecurity knowledge base pages and topic taxonomy | https://www.cyberlibrary.com/api/mcp |
| `com.daawid/registry` | Businesses and organizations, their offerings, prices, hours and contacts | https://mcp.daawid.com/mcp |
| `com.dadrasai/iranian-law` | Articles of Iranian statutes and regulations with legal glossary | https://mcp.dadrasai.com/mcp |
| `com.daedalmap/boundaries` | Administrative boundary shapes, location ids and geographic data packs | https://app.daedalmap.com/mcp/boundaries?registry=mcpregistry |
| `com.dailylogdesk/site` | DailyLogDesk dataset rows with statistics, provenance and citations | https://dailylogdesk.com/mcp |
| `com.dankmachine/dank-meme-sounds` | Meme sounds with origins, usage and playable MP3 links | https://dankmachine.com/mcp |
| `com.dataandapis/catalog` | Catalog of 125 data APIs: sanctions, barcodes, IP intelligence, companies, holidays | https://dataandapis.com/mcp |
| `com.dataart/case-studies` | DataArt case studies by technology, industry and service | https://mcp.dataart.com/mcp |
| `com.datacrate360/guides-and-fixes` | Verified fixes and guides for Snowflake, dbt, Airflow and Spark errors | https://api.datacrate360.com/api/mcp/public |
| `com.datakoot/cve-vulnerability-lookup` | CVE details, exploited status, EPSS scores and package vulnerabilities | https://security.datakoot.com/mcp |
| `com.datakoot/federal-register-rules` | US Federal Register rules, notices, executive orders and agencies | https://regulatory.datakoot.com/mcp |
| `com.datakoot/sec-edgar-filings` | SEC EDGAR filings, financials and insider transactions for US companies | https://filings.datakoot.com/mcp |
| `com.dataville/dataville-mcp` | SEC filings, Wikipedia, arXiv and US Census data with source links | https://api.dataville.com/mcp |
| `com.dataworthai/buyer-directory` | Companies and programs that license data for AI training | https://dataworthai.com/mcp |
| `com.dedale-bi.remnant/remnant` | Reusable agent experience for hard technical problems, with evidence | https://remnant.dedale-bi.com/mcp/chatgpt |
| `com.deepchampai/deepchamp-agents` | Sports game slates, schedules and matchup rest context | https://deepchampai.com/mcp |
| `com.deepskyai/aviation-regulations` | CASA, FAA, EASA and ICAO aviation regulation text | https://www.deepskyai.com/api/mcp |
| `com.deepthoughtconsultech/dtc` | Deep Thought Consultech consulting services and products | https://deepthoughtconsultech.com/mcp |
| `com.defectbird/site` | Defectbird dataset rows with sources and statistics | https://defectbird.com/mcp |
| `com.deflectvo/site` | Deflectvo dataset rows with sources and statistics | https://deflectvo.com/mcp |
| `com.dentaldigitalcenter/mcp` | Buenos Aires dental clinic treatments, reference prices and hours | https://dentaldigitalcenter.com/mcp |
| `com.depreo/site` | Depreo dataset rows with sources and statistics | https://depreo.com/mcp |
| `com.desaira/desaira` | Adult videos, creators and hashtags on DesAira | https://desaira.com/mcp |
| `com.destava/jobs` | Current job postings from company career sites | https://destava.com/mcp |
| `com.detourmap/places` | 39,800 notable places worldwide from Wikidata, nearby lookups and fame rankings | https://detourmap.com/mcp |
| `com.devdocs10/docs` | Tested Swift, Python, JavaScript, CSS and HTML documentation | https://devdocs10.com/mcp |
| `com.devexpress/docs` | DevExpress component library documentation and how-to guidance | https://api.devexpress.com/mcp/docs |
| `com.digitalgemology/gemology-lessons` | Gemology lessons on diamonds, the 4 Cs, grading and moissanite | https://digitalgemology.com/mcp/learn |
| `com.digitaltableteur/mcp` | Digitaltableteur case studies, services, pricing and design system docs | https://www.digitaltableteur.com/mcp |
| `com.digitalundergroundstore/marketplace` | Indie apps, AI tools, books and templates listed in a marketplace | https://digitalundergroundstore.com/mcp |
| `com.digopolis/digopolis` | Real excavated museum artifacts with dates, cultures, findspots | https://digopolis.com/mcp |
| `com.dimhour/catalog` | Scored restaurants, bars, menus and hours across 26 cities | https://mcp.dimhour.com/mcp |
| `com.disclosedlabs/disclosed-labs` | Research peptide vendor trust grades, lab test results and prices | https://www.disclosedlabs.com/api/mcp |
| `com.disclovo/site` | Rows and statistics from the Disclovo dataset with citations | https://disclovo.com/mcp |
| `com.discoverlaunches/launches` | New product launches from indie makers | https://discoverlaunches.com/mcp |
| `com.dispatchzo/site` | Dispatchzo dataset rows with sources and statistics | https://dispatchzo.com/mcp |
| `com.district-hq/listings` | London managed office listings, prices and availability | https://spaces.district-hq.com/api/mcp |
| `com.diveratlas/diver-atlas` | Dive sites, conditions, seasons, marine species and safety info | https://www.diveratlas.com/mcp |
| `com.dividvo/site` | Rows and statistics from the Dividvo dataset with citations | https://dividvo.com/mcp |
| `com.docketnexus/docketnexus` | US federal court cases, dockets and companies in litigation | https://mcp.docketnexus.com/mcp |
| `com.domikumorya/goa-rentals` | Long-term and holiday rentals in North Goa, India | https://domikumorya.com/mcp |
| `com.domkozak/knowledge` | Built for MENA podcast transcripts and programmatic out-of-home lessons | https://mcp.domkozak.com/mcp |
| `com.domusaedes/property-search` | Properties to buy or rent in Marbella, Marrakech, Casablanca | https://ai.domusaedes.com/mcp |
| `com.dondego/wikidata-google-knowledge-mcp` | Wikidata entities, facts and relationships for identity resolution | https://wikidata-knowledge-mcp.revanalex.workers.dev/mcp |
| `com.doorsetbook/site` | DoorsetBook dataset rows with sources and statistics | https://doorsetbook.com/mcp |
| `com.doviandi/cyprus` | Cyprus corporate and tax rules, statutory tests and company register | https://doviandi.com/api/mcp |
| `com.dpolens/dpolens` | GDPR and UAE PDPL privacy law clauses with versions | https://mcp.dpolens.com/ |
| `com.dramlyx/dramlyx` | Dramlyx vertical short drama catalog with synopses and episode links | https://dramlyx.com/mcp |
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
| `com.dsarvo/site` | Dsarvo site dataset rows and statistics with citations | https://dsarvo.com/mcp |
| `com.duesvo/site` | Duesvo site dataset rows and statistics with citations | https://duesvo.com/mcp |
| `com.e-esim/esim-catalog` | Travel eSIM data plans, prices and coverage by country | https://e-esim.com/wp-json/e-esim/mcp |
| `com.easycando/easycando` | Catalog of AI models, APIs, data feeds with inputs, outputs, prices | https://easycando.com/mcp |
| `com.easykmarket.vote/votebox-law` | Korean e-voting statutes and resolution quorum requirements | https://vote.easykmarket.com/api/mcp |
| `com.eatcrush/eatcrush` | Sydney restaurant dishes by allergen and diet with sources | https://eatcrush.com/mcp |
| `com.egleze/mcp` | Verified podcast moments and episode summaries | https://egleze-mcp-server.onrender.com/mcp |
| `com.ektab/books` | Arabic and English ebook catalogue with prices and details | https://ektab.com/mcp |
| `com.elopstudio.aiwave/ai-wave` | AI model releases, pricing, context sizes and deprecations | https://aiwave.elopstudio.com/api/mcp |
| `com.eltrabajito/directory` | Costa Rica independent workers and small businesses with reviews | https://eltrabajito.com/mcp/public |
| `com.emdly/emdly` | Markdown skills for AI agents to find and install | https://emdly.com/mcp |
| `com.emojidig/emoji-search` | Unicode emoji by meaning, with names and codepoints | https://emojidig.com/mcp |
| `com.employeedeskhq/site` | EmployeeDeskHQ dataset on employment topics with citations | https://employeedeskhq.com/mcp |
| `com.empryo/docs` | Empryo product documentation and release information | https://empryo.com/mcp |
| `com.endpointo/site` | Endpointo site dataset rows and statistics with citations | https://endpointo.com/mcp |
| `com.engicor/agent-door` | Wholesale used engine stock, specs, prices and trade terms | https://engicor.com/mcp |
| `com.enpso/site` | Enpso site dataset rows and statistics with citations | https://enpso.com/mcp |
| `com.enrolvo/site` | Enrolvo site dataset, likely enrollment data, with citations | https://enrolvo.com/mcp |
| `com.entityreach/public-resources` | EntityReach corporate group data product information and sample analyses | https://entityreach.com/api/public-mcp |
| `com.entrida/mcp` | UK tariffs, regulatory changes and Turkey to UK trade data | https://qafetzoqccqafbbspjcp.supabase.co/functions/v1/mcp |
| `com.envisioning/mcp` | Emerging technologies research, AI vocabulary, and graded technology forecasts | https://www.envisioning.com/mcp |
| `com.eobify/site` | Eobify site dataset rows and statistics with citations | https://eobify.com/mcp |
| `com.epkproperties/public-knowledge` | Panama and Dominican Republic property listings and buying guides | https://mcp.epkproperties.com/mcp |
| `com.eposvo/site` | Eposvo site dataset rows and statistics with citations | https://eposvo.com/mcp |
| `com.equiphive/hive` | Agent-posted questions and answers on tools, APIs and prompts | https://equiphive.com/mcp |
| `com.equireason/equireason` | US company filings, insider trades, 13F holdings and market trends | https://api.equireason.com/mcp |
| `com.eremosapp/bible` | Thai Bible text, verse search and translation notes | https://mcp.eremosapp.com/mcp |
| `com.erikbethke/blog` | Blog posts on AI, energy, policy, games and investing | https://erikbethke.com/api/mcp |
| `com.erppartnerfinder/partner-finder` | Odoo implementation partners in Germany, Austria and Switzerland | https://erppartnerfinder.com/api/mcp |
| `com.escortfox/escortfox` | Escort directory listings by city and service | https://escortfox.com/mcp |
| `com.esearchcy/esearchcy` | Cyprus company registry details, status, registered office, documents | https://esearchcy.com/mcp |
| `com.eshopmcp/eshopmcp` | Czech shops' products, prices, services, guides and store policies | https://eshopmcp.com/mcp |
| `com.esignstack/docs` | eSignStack e-signature API, webhook and MCP documentation | https://esignstack.app/mcp/docs |
| `com.etfiq/etfiq` | US ETF holdings, flows, fees, risk, benchmarks and comparisons | https://mcp.etfiq.com |
| `com.etiklar/eu-supplement-compliance` | EU food supplement health claim rules and authorized claims register | https://etiklar.com/api/etiklar/mcp |
| `com.euaiactlaw/eu-ai-act-explorer` | EU AI Act articles, recitals, annexes, definitions and obligations | https://mcp.euaiactlaw.com/mcp |
| `com.europebeachmap/beachmap` | Beaches worldwide with monthly sea temperatures | https://beachmapworld.com/mcp |
| `com.eurorackref/eurorack` | Eurorack module specs, jacks, controls and manufacturers with citations | https://eurorackref.com/mcp |
| `com.evalgate/evalgate-docs` | EvalGate product documentation | https://www.evalgate.com/api/mcp/docs |
| `com.eventcompletion/events` | Verified sports events, festivals and school holiday dates | https://eventcompletion.com/mcp |
| `com.eventescapes/event-escapes` | Upcoming sports and music events with ticket, hotel and trip packages | https://mcp.eventescapes.com |
| `com.evertables/evertables` | Swiss open government data and S&P 500 financial tables | https://mcp.evertables.com/mcp?channel=ch-0S999H2GZ0KP7 |
| `com.every-ai/ai-tools` | Reviewed AI tools directory with features, pricing and comparisons | https://api.every-ai.com/mcp |
| `com.everyhourdeal/shopping` | Home, patio, gym and pet product catalog with prices | https://everyhourdeal-checkout.everyhourdeal-store.workers.dev/mcp |
| `com.everylot/everylot` | US used car dealer listings, asking prices and price drops | https://everylot.com/mcp |
| `com.evolc/signals` | Company hiring, funding, events signals and EU public tenders | https://companies.evolc.com/mcp |
| `com.evryroom/property-search` | Homes for sale and rent across Europe and the UAE | https://evryroom.com/mcp |
| `com.examova/mcp` | CIPS, PMP and PRINCE2 exam facts, modules, guides and sample questions | https://examova.com/api/mcp |
| `com.expatriator/immigration` | Spanish immigration procedures, pitfalls and Madrid padron appointments | https://mcp.expatriator.com/mcp |
| `com.extralingo/extralingo` | Language schools abroad with courses, dates and prices | https://www.extralingo.com/mcp |
| `com.ezoic/setup` | Ezoic ad integration documentation and setup code | https://setup-agent.ezoic.com/mcp |
| `com.faceabot/deep-search` | Science, world news, Internet Archive, GitHub and discussion search | https://faceabot.com/tools-mcp/deep-search |
| `com.faceabot/news` | Latest news headlines from public sources in seven languages | https://faceabot.com/tools-mcp/news |
| `com.faceabot/wikipedia` | Wikipedia articles and summaries in any language | https://faceabot.com/tools-mcp/wikipedia |
| `com.faceruler/faceruler` | PSL score tiers, face shapes and looksmaxxing terminology | https://faceruler.com/api/mcp |
| `com.factorroute/factorroute-com` | US invoice factoring state laws, terms, cost math and rates | https://factorroute.com/mcp |
| `com.fairoddscalculator/site` | Rows and statistics from the Fair Odds Calculator dataset | https://fairoddscalculator.com/mcp |
| `com.faithfriendlyjobs/jobs` | Current job listings on Faith Friendly Jobs | https://www.faithfriendlyjobs.com/api/mcp |
| `com.familyfishin.mcp/site-discovery` | Freshwater fishing articles, guidance and Family Fishin tackle catalog | https://mcp.familyfishin.com/mcp |
| `com.farmtempo/farmtempo` | Korean produce wholesale prices, auctions, USDA market reports, buy signals | https://app.farmtempo.com/mcp/public/ |
| `com.fateandstars/tarot-knowledge` | Tarot card meanings, topics and spread definitions | https://fateandstars.com/mcp |
| `com.fbaprepfinder/directory` | Verified Amazon FBA prep centers in US, UK, Germany, Canada | https://fbaprepfinder.com/api/mcp/ |
| `com.feedirl/feedirl-discover` | Upcoming local events in 53 US cities | https://www.feedirl.com/api/v1/discover/mcp |
| `com.fillprompt/fillprompt` | Free AI image, video and text prompt library | https://fillprompt.com/api/mcp |
| `com.finallyoffline.www/culture` | Culture news and trends in sports, music, fashion and streetwear | https://www.finallyoffline.com/mcp |
| `com.finchiefs/research` | Research house views, macro themes, policy rates, yields, economic indicators | https://finchiefs.com/api/mcp |
| `com.findcarcolors.mcp/findcarcolors` | Car paint codes, names, sources and manufacturer color catalogs | https://mcp.findcarcolors.com/mcp |
| `com.findenergyrates/electricity-rates` | US retail electricity plans and utility default rates by ZIP | https://findenergyrates.com/mcp/public |
| `com.findestate/public-catalogs` | Public real estate listings, projects and property details | https://findestate.com/mcp |
| `com.finn.www/auto` | Cars available for monthly subscription with specs and pricing | https://www.finn.com/api/mcp |
| `com.firmeromanesti/company-data` | Romanian companies, profiles, financials, status and CAEN codes | https://firmeromanesti.com/mcp |
| `com.fiscalisto/docs` | Mexican CFDI 4.0 e-invoicing API documentation and errors | https://fiscalisto.com/docs/api/mcp |
| `com.flevy/flevy` | Consulting frameworks, templates, financial models and management topics | https://flevy.com/mcp |
| `com.flexpa/registry` | Health MCP servers, tools and local models with setup instructions | https://api.flexpa.com/mcp |
| `com.flywhereto/mcp` | Nonstop flight routes, airports and airlines worldwide | https://flywhereto.com/api/mcp |
| `com.foliofact/foliofact` | Value-investing fund holdings, filings, stocks and insider transactions | https://foliofact.com/mcp |
| `com.foodeist/restaurants` | Restaurant rankings, ratings, hours and menus by city and cuisine | https://foodeist.com/mcp |
| `com.fooguard/library` | Scanned free AI agent skills and configurations | https://fooguard.com/mcp/library |
| `com.foreverworks/bnr` | National Bank of Romania official exchange rates for any date | https://mcp.foreverworks.com/bnr |
| `com.foreverworks/ecb` | European Central Bank euro reference exchange rates by date | https://mcp.foreverworks.com/ecb |
| `com.foreverworks/trademarks` | Registered and pending US and EU trademarks with owners, classes | https://mcp.foreverworks.com/trademarks |
| `com.forexdemo/forexdemo` | Forex demo account research across 59 brokers, plus trading calculators | https://forexdemo.com/mcp |
| `com.forms-legal/legal-templates` | Legal document templates for 36 jurisdictions | https://forms-legal.com/mcp |
| `com.fortyfwd/coaching` | Perimenopause fat loss, nutrition and strength answers for women 35+ | https://mcp.fortyfwd.com/mcp |
| `com.fourthfeed/fourthfeed` | AI video tools directory: pricing, free tiers, benchmarks | https://fourthfeed.com/mcp |
| `com.freebatteryfactory/docs` | LiteShip and batpak product documentation | https://freebatteryfactory.com/mcp |
| `com.fridgebase/fridges` | Fridge models, specs, DOE and ENERGY STAR data | https://fridgebase.com/mcp |
| `com.fronresearch/agent-api` | Recreation venue demand, bookings, utilization for saunas, bowling, pickleball | https://fronresearch.com/api/agent |
| `com.frontic/ui` | Frontic UI Vue components for commerce storefronts with docs and examples | https://mcp.ui.frontic.com/mcp |
| `com.funciara/docs` | Guides on Romanian land-registry documents | https://api.funciara.com/mcp/docs |
| `com.fuzzzycore.law/georgian-law` | Exact Georgian law texts, amendments and court decisions | https://law-api.fuzzzycore.com/mcp |
| `com.fwbjobs/jobs` | Open job postings and companies in Europe, Morocco, Gulf | https://mcp.fwbjobs.com/mcp |
| `com.gameanalytics/analytics-docs` | GameAnalytics SDK and API documentation for Unity, Unreal, iOS and Android | https://mcp.docs.gameanalytics.com |
| `com.gamedevoutsourcing.www/directory` | Directory of game outsourcing studios by service, country and engine | https://www.gamedevoutsourcing.com/api/mcp |
| `com.gangwaze/cruise` | Cruise sailings, fares, ships, cabins, ports and excursions | https://gangwaze.com/api/mcp |
| `com.gatrends/trend-radar` | Trending games and tech topics across Steam, news, Reddit | https://gatrends.com/mcp |
| `com.gbotranked/gbotranked` | Scored index of Grok Bot templates with evidence | https://gbotranked.com/api/mcp |
| `com.gccdomestic/gccdomestic` | GCC domestic worker agencies, licence checks, salaries and hiring guides | https://www.gccdomestic.com/mcp |
| `com.get-flowie/docs` | Flowie Exchange API documentation and OpenAPI reference | https://docs.get-flowie.com/mcp |
| `com.getagentdepot/agent-provider-depot` | AI agent infrastructure providers, models and sourced prices | https://getagentdepot.com/mcp |
| `com.getagentictools/catalog` | Catalog of 41,000 agent skills, MCP servers and plugins | https://getagentictools.com/api/mcp |
| `com.getaxionlabs/axion-gateway` | UK parking appeal outcomes, NYC ticket dismissal rates, UK MTD tax | https://mcp.getaxionlabs.com/mcp |
| `com.getbeachfinder/beachfinder` | Beaches, swim spots, live conditions and water activity providers | https://getbeachfinder.com/mcp |
| `com.getbotlens/getbotlens` | Articles published on getbotlens.com | https://getbotlens.mcp.getbotlens.com/mcp |
| `com.getbotlens/manoforstaterep` | Articles from the Mano DeAyala state representative site | https://manoforstaterep.mcp.getbotlens.com/mcp |
| `com.getbotlens/raconteur` | Business and industry articles published by Raconteur | https://raconteur.mcp.getbotlens.com/mcp |
| `com.getbotlens/texasvoice` | News articles from The Texas Voice | https://texasvoice.mcp.getbotlens.com/mcp |
| `com.getcontractalerts/tender-alerts` | Open UK and EU public procurement tenders and contract details | https://getcontractalerts.com/mcp |
| `com.getdomly/rentals` | Long-term rental listings and rent prices across Bulgaria | https://getdomly.com/mcp |
| `com.getgenko/prior-auth-docs` | Prior authorization guides, specialty checklists and Genko product facts | https://priorauth.getgenko.com/mcp |
| `com.getrigbase/rigbase` | Measured local LLM speeds on home GPU builds | https://getrigbase.com/mcp |
| `com.getscentai/fragrance-finder` | Perfume notes, accords and fragrance comparisons | https://getscentai.com/api/mcp |
| `com.getskinbliss/skin-bliss` | Skincare product formulas, ingredients, suitable skin types and cautions | https://mcp.skinbliss.app/mcp |
| `com.gettreatmenthelp/gettreatmenthelp` | US addiction treatment facilities and treatment type definitions | https://gth-mcp-server.pages.dev/mcp |
| `com.getzeroslide/singapore-companies` | Singapore company register entries by UEN or name | https://getzeroslide.com/mcp |
| `com.ghostavo/retail-media-measurement` | Retail media measurement explained by Gus Dantas | https://mcp.ghostavo.com/mcp |
| `com.gifsnap/gifsnap` | Animated GIFs searchable by keyword and reaction | https://gifsnap.com/plugins/chatgpt/mcp |
| `com.ginbing/mcp` | China trademark goods and services classification taxonomy | https://mcp.ginbing.com/mcp |
| `com.giveradar/charity-registry` | Nonprofits and charities from official registries in 100 countries | https://giveradar.com/mcp/ |
| `com.givore/givore` | Free giveaway listings in Spanish cities | https://api.givore.com/mcp/public |
| `com.gleanmark/trademark-search` | USPTO trademark records, owners, office actions and TTAB cases | https://gleanmark.com/mcp |
| `com.glitchwire/news` | Independent tech news on AI, crypto, science and gadgets | https://glitchwire.com/mcp |
| `com.globalfinreg/lei` | Global LEI register records, entity details and legal form codes | https://api2.globalfinreg.com/mcp |
| `com.globalpiggy/ecosystem` | Dining guides, produce nutrition, rental rules, billiards and beauty notes | https://mcp.globalpiggy.com/mcp |
| `com.globalsourcepartners/emerging-markets-research` | Expert emerging-markets research on economics, politics and sovereign risk | https://www.globalsourcepartners.com/mcp |
| `com.globaltripx/tripx` | Travel guides: entry rules, weather, packing, safety for 199 countries | https://globaltripx.com/mcp |
| `com.globalvisibilityengine/public-knowledge` | Public governed enterprise knowledge objects with provenance | https://objects.globalvisibilityengine.com/public-enterprise-exposure/_agent/mcp |
| `com.gocodebook/codes` | California Title 24 building codes and local zoning text | https://gocodebook.com/api/mcp |
| `com.godavaii/health-ai` | Indian medicine facts and drug interaction checks | https://www.godavaii.com/api/mcp |
| `com.goldandsilvercompany/porte` | Belgian precious metals dealer prices, rules and coin specifications | https://ask.goldandsilvercompany.com/mcp |
| `com.goldsky/docs` | Goldsky blockchain data platform documentation and API references | https://docs.goldsky.com/mcp |
| `com.goodnaturevibe/catalog` | Good Nature Vibe shop products, pages and blog posts | https://catalog-mcp.goodnaturevibe.com/mcp |
| `com.goodrecmovies/mcp` | Movie and series rankings, titles and similar recommendations | https://goodrecmovies.com/mcp |
| `com.googleapis.developerknowledge/mcp` | Google public developer documentation | https://developerknowledge.googleapis.com/mcp |
| `com.govapiatlas/govapi-atlas` | Public-sector open data APIs across ten countries | https://govapiatlas.com/mcp |
| `com.govdir/directory` | US official government offices, parcels, flood zones and land records | https://api.govdir.com/mcp |
| `com.govgazette/govgazette` | US federal contracting opportunities, awards, vendors and SAM exclusions | https://govgazette.com/api/v1/mcp |
| `com.gpufindr/gpu-finder` | Live cloud GPU rental prices and offers across providers | https://gpufindr.com/mcp |
| `com.grantcue/grantcue` | US public grants and foundation profiles from IRS filings | https://www.grantcue.com/api/v1/mcp |
| `com.grantsights/grantsights` | US grants eligibility evidence and private foundation giving from 990-PFs | https://mcp.grantsights.com/mcp |
| `com.greatlibraryproject/library` | Classic texts as word-by-word interlinears with word lookup | https://greatlibraryproject.com/mcp |
| `com.grecahouse/greek-property` | Greek property listings, asking prices and buying cost research | https://grecahouse.com/mcp |
| `com.greenlitbooks/catalog` | Practical books on working with AI agents, with free chapters | https://greenlitbooks.com/api/mcp |
| `com.grokbotwiki.www/grok-bot-wiki` | Community Grok Bot templates and setup, pricing and troubleshooting guides | https://www.grokbotwiki.com/api/mcp |
| `com.gumballtools/sports-rules` | Soccer IFAB Law 11 and NHL offside rule procedures | https://sports-rules.gumballtools.com/api/mcp |
| `com.guruhotel/mcp` | GuruHotel product facts, pricing and hotel PMS integrations | https://guruhotel.com/api/mcp |
| `com.guruling/marc-lou` | Transcripts of Marc Lou's YouTube videos on indie hacking | https://guruling.com/mcp/marc-lou |
| `com.guruling/starter-story` | Transcripts of Starter Story YouTube videos about building businesses | https://guruling.com/mcp/starter-story |
| `com.handovra/site` | Handovra dataset rows with sources and statistics | https://handovra.com/mcp |
| `com.handshakr/handshakr` | Register of B2B suppliers by category and location | https://hxshsvkjtvcvmqevguuz.supabase.co/functions/v1/mcp |
| `com.handsomelocal/handsome-local` | Gallery of tradesperson websites by trade, with screenshots | https://handsomelocal.com/mcp |
| `com.handsontable/docs` | Handsontable and HyperFormula docs, API reference and release notes | https://docs-assistant.handsontable.com/mcp |
| `com.hangingcontext/mcp` | Recent news stories with cited sources and topics | https://hangingcontext.com/mcp |
| `com.hanzidrill/hanzidrill` | HSK 3.0 Chinese vocabulary, characters, syllabus changes and exam dates | https://mcp.hanzidrill.com/mcp |
| `com.hardenvo/site` | Hardenvo site dataset rows, statistics and provenance | https://hardenvo.com/mcp |
| `com.hardfmly/site` | HardFM site dataset rows, statistics and provenance | https://hardfmly.com/mcp |
| `com.hardscapedesk/site` | HardscapeDesk dataset on hardscaping, with statistics and provenance | https://hardscapedesk.com/mcp |
| `com.headcountdesk/site` | HeadcountDesk dataset on headcount, with statistics and provenance | https://headcountdesk.com/mcp |
| `com.headcountlabs/jobs` | Open job postings, pay data and job market statistics | https://api.headcountlabs.com/mcp/public |
| `com.headlesslaw/headlesslaw` | Verbatim EU financial and digital regulation texts, versions and definitions | https://mcp.headlesslaw.com/mcp |
| `com.heavenpc/server-racks` | Server rack models, specs, comparisons and buying guides | https://heavenpc.com/mcp |
| `com.hedgefundalpha/public-research` | Hedge Fund Alpha articles and membership product information | https://hedgefundalpha.com/mcp |
| `com.heightpair/heightpair` | Height percentiles and reference dimensions of people, animals, objects | https://heightpair.com/mcp |
| `com.helloai/directory` | Frontier AI model rankings by task with Elo scores | https://helloai.com/mcp |
| `com.hellocityowl/prague-events` | Prague events by date and venue with programme links | https://hellocityowl.com/api/public/events/mcp |
| `com.helprentdanang/rentals` | Long-term rentals in Da Nang with buildings and median rents | https://helprentdanang.com/mcp/ |
| `com.heroxairdomes/docs-mcp` | HeroX air dome products, costs and facility planning articles | https://www.heroxairdomes.com/api/docs-mcp |
| `com.heystacks/heystack` | Shared community Markdown documents, lists and spreadsheets on varied topics | https://heystacks.com/mcp/read |
| `com.hibot/hibot` | AI visibility measurement framework and articles from HiBot | https://hibot.com/mcp/public |
| `com.hirehint/public-knowledge` | HireHint ATS and HRIS product facts and guides | https://hirehint.com/mcp |
| `com.hivearchy.wizard101/wiki` | Wizard101 creatures, spells, quests, zones and boss cheats | https://wizard101.hivearchy.com/mcp |
| `com.hornlib/mcp` | French horn fingerings, harmonics, transpositions and orchestral excerpt guidance | https://hornlib.com/api/mcp |
| `com.hortosapp/au` | Australian wholesale plant grower stock lists and prices | https://au.hortosapp.com/mcp |
| `com.hortosapp/ca` | Canadian wholesale plant grower availability and prices | https://ca.hortosapp.com/mcp |
| `com.hortosapp/nz` | New Zealand wholesale plant grower stock lists and prices | https://nz.hortosapp.com/mcp |
| `com.hortosapp/us` | US wholesale plant grower availability lists and prices | https://us.hortosapp.com/mcp |
| `com.hosco/hospitality-jobs` | Hospitality jobs and training courses in Europe | https://mcp.hosco.com/mcp/public |
| `com.hotelshortlist/hotel-research` | Hotel research from guest reviews on bed bugs, noise and fees | https://hotelshortlist.com/mcp |
| `com.hotwhathow/prices` | UK and US product price history and verified deals | https://hotwhathow.com/mcp |
| `com.housenstars/real-estate-discovery` | Luxury real estate listings from HOUSE N STARS | https://hns-chatgpt-app.onrender.com/mcp |
| `com.housingfeed/rental-listings` | US rental listings and current rent statistics by city or ZIP | https://housingfeed.com/mcp |
| `com.howitspread/howitspread` | Viral cases with sourced, dated spread timelines and mechanics | https://howitspread.com/api/mcp |
| `com.hreflangly/site` | Hreflangly dataset on hreflang and international SEO, with provenance | https://hreflangly.com/mcp |
| `com.htagai/htag-docs` | HTAG agent guides, API endpoints, MCP tools and pricing | https://api.htagai.com/mcp/v1/servers/htag-docs/mcp |
| `com.htrbamboo/bamboo-mcp` | Bamboo product specifications and buyer procurement guides | https://mcp.htrbamboo.com/mcp |
| `com.huddlevo/site` | Huddlevo site dataset rows, statistics and provenance | https://huddlevo.com/mcp |
| `com.huntautogroup.texas/docs` | Texas used-car buying guides: title, tax, inspection, vehicle reviews | https://texas.huntautogroup.com/api/mcp/docs/ |
| `com.hutlists/hutlists` | Alpine mountain huts, elevation, season, booking and route guides | https://hutlists.com/mcp |
| `com.hybridracedata/hyrox` | HYROX race results, athlete histories, splits, events and benchmarks | https://hybridracedata.com/mcp |
| `com.hydrantly/site` | Hydrantly site dataset rows, statistics and provenance | https://hydrantly.com/mcp |
| `com.hydrogenstudies/research` | Published molecular hydrogen health studies and evidence by condition | https://hydrogenstudies.com/mcp |
| `com.hypoteky-online/clanky` | Czech mortgage guides, calculations and primary sources | https://hypoteky-online.com/mcp |
| `com.iar.docs-mcp/iar-documentation` | IAR Embedded Workbench, compiler, debugger and C-STAT documentation | https://docs-mcp.iar.com/mcp |
| `com.iberiapath/dnv-spain` | Spain digital nomad visa requirements, translators and tax estimates | https://iberiapath.com/mcp |
| `com.icepartsdb/ice-machine-parts` | Commercial ice machine parts, models, ratings and price ranges | https://icepartsdb.com/mcp |
| `com.iconic-expeditions/concierge` | Africa safari destinations, itineraries and activities | https://concierge.iconic-expeditions.com/mcp |
| `com.ierhub/license-lookup` | Texas electrician licenses, renewal rules and TDLR forms | https://ierhub.com/api/mcp |
| `com.iinventedlight/library` | iinventedlight public notes and openly licensed reference library | https://iinventedlight.com/mcp |
| `com.imbawallet/agent-docs` | IMBA agent API docs on prepaid cards, eSIM, tiers and policies | https://imbawallet.com/mcp/docs |
| `com.immokralle/immobilien` | Rent and sale property listings in Austria, Germany, Switzerland | https://mcp.immokralle.com/mcp |
| `com.incitefulmed/academic` | Academic papers, citation networks and open-access full text | https://incitefulmed.com/academic/mcp |
| `com.indexagentica/mcp` | Directory of agent tools, MCP servers, APIs and skills | https://mcp.indexagentica.com/mcp |
| `com.indiarestros/mcp` | Indian restaurants, menus with prices, timings and dishes | https://indiarestros.com/mcp |
| `com.indiciadesk/desk` | BTC and ETH options research, gamma regime and max pain records | https://mcp.indiciadesk.com/mcp |
| `com.inductvo/site` | Rows and statistics from the Inductvo dataset with citations | https://inductvo.com/mcp |
| `com.infosecjobboard/jobs` | Cybersecurity jobs, salary benchmarks and hiring stats | https://www.infosecjobboard.com/api/mcp |
| `com.infysvg/svg-clipart` | Free SVG cut files and clipart designs | https://infysvg.com/mcp |
| `com.inshihub/inshihub` | Japanese graduate entrance exam subjects, themes and past papers | https://inshihub.com/mcp |
| `com.instood/stage-door` | Shop policies, products and answers from participating shops' own pages | https://app.instood.com/mcp |
| `com.intakez/site` | Intakez site dataset rows, statistics and provenance | https://intakez.com/mcp |
| `com.invokera/book-search` | Books and authors from the Open Library catalog | https://invokera.com/r/book-search |
| `com.invokera/currency-rates` | Latest and historical ECB foreign exchange reference rates | https://invokera.com/r/currency-rates |
| `com.invokera/discover` | Catalog of published tools on the Invokera platform | https://invokera.com/discover |
| `com.invokera/postal-codes` | Postal codes with place names and coordinates for 60+ countries | https://invokera.com/r/postal-codes |
| `com.ip99/ip99` | IP address geolocation and proxy, VPN or datacenter risk | https://ip99.com/mcp |
| `com.ipogrid/ipogrid` | IPO calendar, SEC filings, deal terms and IPO news | https://ipogrid.com/mcp |
| `com.isaref/isaref` | CPU instruction sets, registers, encodings, timings and chip profiles | https://isaref.com/mcp |
| `com.ismsdirectory/isms-directory` | ISO 27001, SOC 2 and compliance service providers | https://ismsdirectory.com/api/mcp |
| `com.isoligne/index` | How readable French websites are to AI, scores by sector | https://isoligne.com/mcp |
| `com.israbase/israbase` | Israeli companies, nonprofits and partnerships from the official registry | https://israbase.com/mcp |
| `com.ithy/research-library` | Public explanations and worked examples with sources and dates | https://ithy.com/mcp |
| `com.itsmalai/glp1-nutrition` | USDA food nutrition facts and GLP-1 medication guides | https://mcp.itsmalai.com/open |
| `com.iwonder/iwonder` | Documentary films with metadata and where to watch by country | https://iwonder.com/api/mcp/mcp |
| `com.jacobcampbellrealtor/jacobcampbellrealtor` | Florida real estate, county market figures and realtor site content | https://jacobcampbellrealtor.com/mcp-server.php |
| `com.jakehandy/mcp` | Essays by Jake Handy on AI, music tech and agentic engineering | https://jakehandy.com/mcp |
| `com.janlinketscher/site` | Jan Linketscher's essays and positions on digital agency topics | https://janlinketscher.com/api/mcp |
| `com.japandirecttrucks/shop` | Japanese used trucks and vans for export, shipping and import guides | https://japandirecttrucks.com/mcp |
| `com.jasontally.mac/mcp` | IEEE registry owner organization for MAC addresses and OUI prefixes | https://mac.jasontally.com/mcp |
| `com.jenniferrebholz/rebholz-attorney` | Arizona personal injury attorney Jennifer Rebholz background and credentials | https://mcp.jenniferrebholz.com/mcp |
| `com.jirventures/knowledge` | JIR Ventures knowledge base of captured thoughts searchable by meaning | https://aiagent.jirventures.com/brain/mcp |
| `com.jobcardo/site` | Jobcardo site dataset rows, statistics and provenance | https://jobcardo.com/mcp |
| `com.jobcrawls/connector` | Finnish job listings, pay data, employers and labour rules | https://www.jobcrawls.com/api/connector |
| `com.jobseveryhour/jobs` | Open tech jobs from employers' career pages, refreshed hourly | https://jobseveryhour.com/mcp |
| `com.jobsfrontrunner/jobs` | Open jobs from employer career pages in US, Canada, India | https://jobsfrontrunner.com/mcp |
| `com.jobsglitch/jobs` | Live job listings from employer hiring systems and market stats | https://jobsglitch.com/mcp |
| `com.jobsinsportstech/jobs` | Open roles at sports technology companies | https://jobsinsportstech.com/mcp |
| `com.jobsitecerts/safety-reference` | OSHA regulation text, construction safety talks and regulatory news | https://jobsitecerts.com/api/mcp/public |
| `com.jobyap/jobs` | Job postings from company career sites with discussion threads | https://mcp.jobyap.com/mcp |
| `com.joinplexa/plexa` | Local businesses in Mexico and Latin America with hours, services and FAQs | https://api.joinplexa.com/mcp/ |
| `com.jointhestudentlife/docs` | Student city guides, blog guides, FAQ and policies | https://jointhestudentlife.com/mcp/docs |
| `com.jomobench/mcp` | fomo app trading fees, realized fee rates and referral facts | https://jomobench.com/mcp |
| `com.jpfreesoft/catalog` | Japanese software and AI tools with recorded facts and sources | https://jpfreesoft.com/api/mcp/ |
| `com.justconnectus/public` | Open jobs and hiring companies in Israel with apply links | https://mcp.justconnectus.com/public |
| `com.jwatte/site` | jwatte.com articles, website tools, downloadable kits and series | https://jwatte.com/mcp |
| `com.jyotishintelligence/sealed-forecasts` | Bitcoin-anchored sealed forecasts with grades and calibration records | https://jyotishintelligence.com/mcp |
| `com.kaalshodh/kaalshodh` | Indian astronomy events, planetary positions and eclipses from -5000 to 5000 | https://kaalshodh.com/mcp |
| `com.kaigen3d/kaigen` | Kaigen 3D engine docs, CLI commands, templates and setup | https://kaigen3d.com/mcp |
| `com.kartvelians/knowledge` | Everyday US newcomer guides for Georgian speakers | https://kartvelians.com/mcp |
| `com.kasafox/registry` | Appliance fault code meanings, causes and fixes across brands | https://registry.kasafox.com/mcp |
| `com.kayoupu.www/plans` | Mainland China mobile data plans with terms and source dates | https://www.kayoupu.com/api/mcp |
| `com.kbasevo/site` | Rows and statistics from the Kbasevo dataset with citations | https://kbasevo.com/mcp |
| `com.keeltools/keeltools-directory` | AI tools, skills and prompts with pricing and features | https://keeltools.com/mcp |
| `com.kelvoagents/kelvo` | Software errors and fixes reported by agents, ranked by outcome | https://kelvoagents.com/mcp |
| `com.kentapplied/data` | Sourced US healthcare facts, chart data and research articles | https://mcp.kentapplied.com/mcp |
| `com.kevurugames/site` | Kevuru Games studio services, portfolio, case studies and blog | https://mcp.kevurugames.com/ |
| `com.keysvo/site` | Keysvo dataset rows, statistics and provenance | https://keysvo.com/mcp |
| `com.kickoffo/site` | Kickoffo dataset rows, statistics and provenance | https://kickoffo.com/mcp |
| `com.kiddinglab/kiddinglab` | DC/MD/VA kids camps: dates, prices, ages, availability | https://www.kiddinglab.com/mcp |
| `com.kidincare/kidincare` | Licensed US childcare centers, daycares, preschools and parenting guides | https://admin.kidincare.com/mcp |
| `com.kidpaths/family-outings` | Family activities and venues in seven US cities | https://kidpaths.com/api/mcp |
| `com.kintoolkit/label-reference` | US children's medicine label dosing directions and educational question guides | https://kintoolkit.com/api/mcp |
| `com.kitchenwatt/food-processors` | Food processor models, specs, comparisons and buying guides | https://kitchenwatt.com/mcp |
| `com.klarhimmel.ui/mcp` | Klarhimmel UI shadcn blocks, templates and install commands | https://ui.klarhimmel.com/mcp |
| `com.knowjudges/knowjudges` | US judges, courts, courtroom rules and judicial analytics | https://mcp.knowjudges.com/mcp |
| `com.knowledgeforagents/knowledge-for-agents` | Agent-reported problems, solutions, failed approaches and outcomes | https://knowledgeforagents.com/mcp |
| `com.koenig-solutions/koenig-mcp` | IT training courses, exam codes, outlines and vendors at Koenig | https://www.koenig-solutions.com/koenig-mcp |
| `com.koreanics/korea-law-acts-and-bills` | South Korean statutes and National Assembly bills in English | https://koreanics.com/wp-json/koreanics/v1/mcp |
| `com.koskamo/koskamo` | MCP servers, capabilities, provenance and cited reference datasets | https://koskamo.com/api/mcp |
| `com.kovapi/docs` | KovAPI API documentation, endpoints and model prices | https://kovapi.com/mcp |
| `com.kpidepot/kpi-depot` | Corporate KPI definitions, formulas and industry benchmarks | https://kpidepot.com/mcp |
| `com.kroelgraphics/docs` | Kroel Graphics services, clients, history and contact info | https://kroelgraphics.com/docs/mcp |
| `com.ksaworks/goldseam` | US colleges, programs, transfer credit, certifications and occupations data | https://goldseam.ksaworks.com/mcp |
| `com.ktrenz/kdata` | K-pop artists, trending rankings and AI answer-engine reach | https://ktrenz.com/api/mcp |
| `com.kudimistudios/catalogue` | Kudimi kids' songs, books and printables by age and topic | https://kudimi-mcp-otewethnqq-uc.a.run.app/mcp |
| `com.kzsaleshub/knowledge` | B2B sales, marketing and management materials for Kazakhstan, Central Asia | https://kzsaleshub.com/mcp |
| `com.labelqueue/mcp` | Avery and thermal label dimensions, margins, barcode requirements | https://labelqueue.com/api/mcp |
| `com.lamplightverse/daily-verse` | Bible verses in KJV and World English Bible | https://lamplightverse.com/mcp |
| `com.langfuse/docs` | Langfuse LLM observability platform documentation | https://langfuse.com/api/mcp |
| `com.lanyardo/site` | Lanyardo site dataset rows, statistics and provenance | https://lanyardo.com/mcp |
| `com.larabench/larabench` | Laravel jobs, ecosystem news and package releases | https://larabench.com/mcp |
| `com.lastminutedealshq/company-signals` | Open job counts and hiring trends per company over time | https://company-signals.lastminutedealshq.com/mcp |
| `com.launch529/open-data` | US colleges' costs, state 529 plans and qualified 529 expenses | https://launch529.com/api/public/mcp |
| `com.launchator/launchator` | Directory of new SaaS, AI and indie products | https://launchator.com/api/mcp |
| `com.launchyournextchapter/nextchapter-jobs` | Job openings, WARN layoff notices, unemployment benefits by state | https://launchyournextchapter.com/api/mcp |
| `com.learnthedao/learn-the-dao` | All 81 chapters of the Tao Te Ching with search | https://learnthedao.com/api/mcp |
| `com.learntoupholster/upholsterers-bible` | Upholstery techniques, business guidance, UK furniture fire regulations | https://learntoupholster.com/mcp |
| `com.lebaneselegislation/mcp` | Lebanese laws, articles, court rulings and Official Gazette issues | https://lebaneselegislation.com/mcp |
| `com.legalaimcp/directory` | Directory of AI tools and MCP servers for law firms | https://legalaimcp.com/api/mcp |
| `com.legendsoflearning.app/catalog` | K-8 educational games aligned to curriculum standards | https://app.legendsoflearning.com/mcp |
| `com.lemon-agent.app/goora-travel-posts` | Community travel posts and guides, mainly Chinese destinations | https://app.lemon-agent.com/goora-agent/mcp |
| `com.lessonvo/site` | lessonvo site dataset rows with cited answers | https://lessonvo.com/mcp |
| `com.lettza/site` | Lettza site dataset rows, statistics and provenance | https://lettza.com/mcp |
| `com.lexifina/global-law` | Point-in-time law of nearly every country, with amendment history | https://global-law.lexifina.com/mcp |
| `com.lexopti/docs` | LexOpti API, SDK and embedding documentation | https://developers.lexopti.com/mcp |
| `com.lifelongedge/edge-lab` | Published trading-system research studies | https://lifelongedge.com/mcp |
| `com.lillytechsystems/ai-school` | Free AI course tracks and thousands of lessons | https://lillytechsystems.com/mcp |
| `com.limslane/site` | limslane site dataset rows with cited answers | https://limslane.com/mcp |
| `com.linkbreakers/docs-mcp` | Linkbreakers help articles, pricing and QR code docs | https://linkbreakers.com/mcp |
| `com.listomancy/lists` | Hand-written checklists and routines for everyday tasks | https://listomancy.com/mcp |
| `com.litescrape/litescrape-mcp-server` | Google, Bing, DuckDuckGo web search results and Google Maps places | https://mcp.litescrape.com/mcp |
| `com.liz6/docs` | Public documents, prompts and resources published by liz | https://doc.liz6.com/mcp |
| `com.llclane/site` | LLC formation dataset from LLC Lane with citations | https://llclane.com/mcp |
| `com.loafloaf/toronto-restaurants` | Toronto restaurants, menus, prices, hours, awards and booking links | https://www.loafloaf.com/mcp |
| `com.lobbyvo/site` | lobbyvo site dataset rows with cited answers | https://lobbyvo.com/mcp |
| `com.localgymfinder/directory` | US gym listings with hours, prices, classes and amenities | https://localgymfinder.com/mcp |
| `com.locatejobsnetwork/search-jobs` | Live US job listings and state unemployment benefit answers | https://locatejobsnetwork.com/api/mcp |
| `com.lokerdollar/jobs` | Worldwide remote job listings, salary benchmarks, skill demand | https://mcp.lokerdollar.com/mcp |
| `com.longtailo/site` | longtailo site dataset rows with cited answers | https://longtailo.com/mcp |
| `com.look4expo/expo` | Global B2B trade shows by country, sector, dates and organizers | https://look4expo.com/mcp |
| `com.lookmybio/public` | Creator bio pages, links and blog posts on lookmybio | https://mcp.lookmybio.com/public |
| `com.loopingagent/loopingagent-mcp` | Articles on agentic AI and RAG plus the author's projects | https://loopingagent.com/api/mcp |
| `com.lootcodes/catalog` | Game keys, gift cards and top-ups with prices and activation regions | https://www.lootcodes.com/api/mcp |
| `com.lordevo/agent-directory` | Directory of agent APIs, x402 endpoints and MCP servers | https://lordevo.com/mcp |
| `com.losshq/directory` | Certified insurance appraisers and umpires by state, city and specialty | https://www.losshq.com/mcp |
| `com.lotsofsounds/mcp` | CC0 sound effects searchable by keyword and category | https://api.lotsofsounds.com/mcp |
| `com.lottiefiles/generative-icons` | Animated UI icon library with usage snippets and guides | https://generativeicons.com/mcp |
| `com.lovefengis/docs` | lovefengis developer docs for REST API, MCP, CLI and auth | https://lovefengis.com/mcp/docs |
| `com.lpreportly/site` | lpreportly site dataset rows with cited answers | https://lpreportly.com/mcp |
| `com.lucernel/lucernel` | Lucernel apps, guides, roundups and comparison articles | https://lucernel.com/mcp |
| `com.lugtorq/site` | Lugtorq dataset, likely vehicle lug nut torque specs | https://lugtorq.com/mcp |
| `com.luneresearch/lune` | Peer-reviewed papers, citations, and research methodology guidance | https://mcp.luneresearch.com |
| `com.lxrflow/agora` | Q&A threads where AI agents ask and answer technical questions | https://agora.lxrflow.com/mcp |
| `com.lyra-ui/mcp` | Lyra UI web component APIs, docs and migration mappings | https://www.lyra-ui.com/mcp |
| `com.macaroonnetwork/bible-evidence` | BSB and WEB Bible verses with context, comparison and cross-references | https://api.macaroonnetwork.com/mcp-faith-evidence-v1/mcp/ |
| `com.machinerylane/machinery-lane` | Vetted plastics equipment suppliers, products and sources | https://machinerylane.com/mcp |
| `com.mactechsolutionsllc.www/federal-market` | US federal contract opportunities, awards, contractors and spending | https://www.mactechsolutionsllc.com/api/mcp/market |
| `com.mainemcp/maine` | Maine startups, events, communities and people | https://connect.mainemcp.com/mcp |
| `com.mandateoffice/mandate` | EU and national laws, case law, company registers, formation guides | https://mandateoffice.com/mcp |
| `com.mandatzo/site` | Mandatzo site dataset rows and statistics with citations | https://mandatzo.com/mcp |
| `com.maneratech/aicitizenship` | Citizenship test formats and practice questions with answers | https://aicitizenship.maneratech.com/mcp |
| `com.manifoldbt/docs` | manifoldbt backtesting DSL documentation, signatures, examples, error fixes | https://mcp.manifoldbt.com/mcp |
| `com.manusights/manusights` | Journal AI policies and reference existence and retraction checks | https://manusights.com/mcp |
| `com.maps-agent/knowledge` | Google Maps and Business Profile guides for local businesses | https://maps-agent.com/mcp |
| `com.marchindex/marchindex` | AI model releases, privacy and AI laws, MCP connectors | https://mcp.marchindex.com/mcp |
| `com.mardenyard/permits` | Daily US building permits by area, trade and value | https://mardenyard.com/mcp |
| `com.mariadb/mariadb-docs` | Official MariaDB documentation and release notes | https://mariadb.com/docs/~gitbook/mcp |
| `com.marketcheck/api` | US and UK car listings, prices, VIN data and market history | https://developers.marketcheck.com/api/mcp |
| `com.marketcheck/docs` | MarketCheck automotive API documentation and endpoint reference | https://developers.marketcheck.com/api/docs-mcp |
| `com.marksandsignatures/marksandsignatures-com` | Maker marks on pottery, silver, jewelry, glass and their makers | https://marksandsignatures.com/api/mcp |
| `com.markupbird/site` | Markupbird site dataset rows and statistics with citations | https://markupbird.com/mcp |
| `com.mart402/free` | Index of x402 paid services and operator track records | https://mart402.com/mcp/free |
| `com.mashzo/site` | Mashzo dataset rows with sources and statistics | https://mashzo.com/mcp |
| `com.massageinchina/mcp` | TCM Tuina massage styles, acupoints, contraindications, venues in China | https://massageinchina.com/api/mcp |
| `com.matchoffice/mcp` | Commercial real estate and office locations available to rent | https://www.matchoffice.com/api/mcp |
| `com.maxand98/maxand98` | maxand98 publications, citations, claims and evidence records | https://maxand98.com/mcp |
| `com.maximofn/content` | AI and machine learning posts, tips and projects | https://www.maximofn.com/mcp |
| `com.mcp-revenue-empire/japan-public-ledgers` | Daily ledgers of Japanese public data across 12 domains | https://mcp.mcp-revenue-empire.com/mcp |
| `com.mcpskillhub/mcpskillhub` | 49,000 MCP servers with token cost, security signals and install snippets | https://mcpskillhub.com/mcp |
| `com.mcptoplist/mcptoplist` | MCP servers ranked by adoption data | https://mcptoplist.com/mcp |
| `com.meadowandfeather/meadow-and-feather` | Bird species facts and what feeder foods attract which birds | https://meadowandfeather.com/mcp |
| `com.measuretechpro/agent-door` | Measure Tech PRO contractor CRM knowledge base, forum, roadmap and pricing | https://measuretechpro.com/mcp |
| `com.medcontra/site` | Medcontra dataset, likely medication contraindications, with citations | https://medcontra.com/mcp |
| `com.mediapronet/directory` | Directory of software, SaaS, AI tools and websites | https://mediapronet.com/api/mcp |
| `com.medusajs/medusa-mcp` | Medusa e-commerce framework documentation and integration guides | https://docs.medusajs.com/mcp |
| `com.meetsponsors/mcp` | YouTube sponsors, sponsored videos and sponsored channels | https://api.meetsponsors.com/mcp |
| `com.melvoridle2guide/guide` | Melvor Idle 2 game wiki, items, quests and calculators | https://melvoridle2guide.com/mcp |
| `com.menfem/mcp` | AI infrastructure markets, compute prices, company research and market calls | https://menfem.com/mcp |
| `com.metaintro/job-search` | Live job postings, employer profiles, pay and local hiring demand | https://www.metaintro.com/api/mcp/public |
| `com.metaltakip/digest` | Turkish gold prices, exchange rates, inflation and market analysis | https://www.metaltakip.com/api/mcp |
| `com.metraipolis/knowledge-commons` | Cited open documents: Wikipedia, arXiv, PubMed, CVEs, HTTP RFC clauses | https://metraipolis.com/mcp |
| `com.metricduck/financial-analysis` | US public company financials, SEC filings, XBRL facts, earnings | https://mcp.metricduck.com/mcp |
| `com.mettakin/mettakin` | First-person meditation experiences, phenomena and practices | https://mettakin.com/mcp |
| `com.mhsbloom/neutral-skincare-reference` | Dermacosmetic skincare products, ingredients, brands and alternatives | https://europe-west3-mhs-bloom.cloudfunctions.net/bloomMcp |
| `com.miaamare/miaamare` | European Bachata festivals, artists and dance schools | https://www.miaamare.com/mcp.php |
| `com.microsoft/microsoft-learn-mcp` | Official Microsoft and Azure documentation and code samples | https://learn.microsoft.com/api/mcp |
| `com.midvash/bible` | Bible texts in many versions, commentary, cross-references, Strong's lexicon | https://mcp.midvash.com/mcp/registry |
| `com.mikereams/site` | Enterprise architecture writing, CSDM diagrams, architect tools and skills | https://mikereams.com/mcp |
| `com.mintlify/searchmcp` | Mintlify documentation: setup, CLI, docs.json, components, pricing | https://www.mintlify.com/docs/mcp |
| `com.mintmcp/docs` | MintMCP enterprise MCP gateway documentation | https://www.mintmcp.com/docs/mcp |
| `com.mobiscroll/mcp` | Mobiscroll UI component APIs, examples, Connect REST API and SDKs | https://mcp.mobiscroll.com |
| `com.modelsagree/modelsagree` | Consensus best-product rankings from ChatGPT, Claude, Gemini and Grok | https://modelsagree.com/mcp |
| `com.modernmustardseed/funding-finder` | Federal grants on Grants.gov, SBA loans, FEMA disaster declarations | https://mcp.modernmustardseed.com/funding-finder |
| `com.modevc/ai-charts` | Time-series data on AI adoption and venture capital research charts | https://modevc.com/api/mcp/charts |
| `com.modevc/investor-atlas` | Venture capital firms and partners by stage, sector, location | https://modevc.com/api/mcp/investors |
| `com.modevc/radar` | AI market charts, VC firm directory, Form D raises | https://modevc.com/api/mcp |
| `com.modevc/stage-pre-seed` | Venture capital firms, partners, check sizes, Form D raises, VC charts | https://modevc.com/api/mcp/stage-pre-seed |
| `com.modevc/stage-seed` | Seed venture capital firms, partners, check sizes, Form D filings | https://modevc.com/api/mcp/stage-seed |
| `com.modevc/stage-series-a` | Series A venture capital firms, partners, fund filings, benchmarks | https://modevc.com/api/mcp/stage-series-a |
| `com.modevc/stage-series-b` | Series B growth venture firms, partners, fund filings, benchmarks | https://modevc.com/api/mcp/stage-series-b |
| `com.modularpsl/site` | US prefab modular housing permits, ADU laws, container homes | https://modularpsl.com/mcp |
| `com.mojalab/content` | MojaLab blog posts, pages and tags | https://mojalab.com/mcp |
| `com.moneteka/moneteka` | Ukrainian NBU coins and banknotes: catalogue facts, series, reference prices | https://moneteka.com/api/mcp |
| `com.money2route/policy-fund` | Korean small business government policy loans, eligibility and terms | https://money2route.com/mcp |
| `com.monthendly/site` | Monthendly site dataset rows, statistics and cited provenance | https://monthendly.com/mcp |
| `com.moon-oh/moonoh-marketplace` | NYC and NJ marketplace listings, prices, and Manhattan churches | https://moon-oh.com/api/mcp |
| `com.mooncatcherwire/wire` | Crypto news by market impact and Bitcoin derivatives signals | https://mooncatcherwire.com/mcp |
| `com.moorishtimes/moorish-times` | Moroccan history, culture and news articles in French and English | https://mcp.moorish.cloud/mcp |
| `com.morereply/morereply` | Public poll results and demographic breakdowns from Morereply | https://morereply.com/mcp |
| `com.most-famous-paintings/art-search` | Famous paintings, artists and museums, with stories and history | https://direct.most-famous-paintings.com/mcp/ |
| `com.moviescenemap/filming-locations` | Filming locations of films and TV, settings of games and anime | https://moviescenemap.com/mcp |
| `com.movingpolygons/maps-public` | Published animated maps of historical borders, wars and empires | https://www.movingpolygons.com/mcp/public |
| `com.mowrouteworks/site` | MowRouteWorks site dataset rows, statistics and cited provenance | https://mowrouteworks.com/mcp |
| `com.mozilladatacollective/datasets` | Ethically sourced AI training datasets by task and language | https://mozilladatacollective.com/api/mcp |
| `com.mrrledger/mrrledger` | Sourced, dated revenue figures of AI-agent businesses | https://mrrledger.com/mcp |
| `com.mtgbench/mtgbench` | Magic: The Gathering cards, rules, rulings, combos and deck data | https://mtgbench.com/mcp |
| `com.multilo/multilo` | Multilo product documentation, pages and changelog | https://www.multilo.com/api/mcp |
| `com.multiplesbook/site` | MultiplesBook dataset, likely business valuation multiples, with citations | https://multiplesbook.com/mcp |
| `com.mumulbo/korean-law` | Korean everyday law answers, statute articles and tax rules | https://mumulbo.com/mcp |
| `com.musicatlas/musicatlas` | Commercial music similarity, track characteristics and similar artists | https://mcp.musicatlas.ai/mcp |
| `com.mustvo/site` | Mustvo site dataset rows, statistics and cited provenance | https://mustvo.com/mcp |
| `com.myanimetracker/myanimetracker` | Anime watch orders, filler guides, titles and airing schedule | https://myanimetracker.com/api/mcp |
| `com.mybiblecopilot/bible-copilot` | Bible verse text, quote verification and scripture-cited study answers | https://mybiblecopilot.com/mcp |
| `com.mycardfolio/cards` | Sports cards, set checklists, parallels and card identification | https://mycardfolio.com/api/mcp |
| `com.mycryptoparadise/market-education` | Crypto trading education guides, indicators and daily market news | https://mycryptoparadise.com/mcp-server/mcp |
| `com.myhuiban.www/conference-partner` | Academic conference and journal deadlines, rankings and acceptance rates | https://www.myhuiban.com/mcp |
| `com.myoddly/oddly-corpus` | Observed web records, subject histories and benchmarks | https://myoddly.com/api/public/mcp |
| `com.myprivacyagent/public` | Data broker opt-out guides and removal routes | https://myprivacyagent.com/api/mcp |
| `com.myrmigo/myrmigo` | Official travel booking sites, refund policies, EU261/UK261 compensation rules | https://mcp.myrmigo.com/mcp |
| `com.nanion/vaia` | Nanion products, technical data sheets and comparisons | https://vareen.net/a/JIol8af5lfQsl1FX/mcp |
| `com.nashouse.articles/mcp` | Nas House Dubai stays, coworking, events, retreats and prices | https://agents.nashouse.com/mcp |
| `com.nashouse/mcp` | Nas House Dubai villa stays, coworking, events and retreats | https://agents.nashouse.com/mcp |
| `com.natcatcover/natcatcover` | Natural catastrophe insurance basics and planned NatCat Cover portfolio | https://natcatcover.com/mcp |
| `com.ncstatutes/ncgs` | North Carolina statutes, session laws, constitution, court and agency rules | https://mcp.ncstatutes.com/mcp |
| `com.nearfine/books` | Book availability and prices across booksellers worldwide | https://nearfine.com/mcp |
| `com.nectarjobs/jobs` | Live job postings, salaries and hiring trends worldwide | https://nectarjobs.com/mcp |
| `com.needanai/catalog` | AI tools catalogue with pricing, alternatives and reviews | https://mcp.needanai.com/mcp |
| `com.negativeresistance/cure-protocol` | Clinical trials, biomedical literature, genes, drugs and disease research evidence | https://negativeresistance.com/api/v1/mcp |
| `com.neptunecigar/catalog` | Premium cigar lines, ratings, availability and US state shipping rules | https://mcp.neptunecigar.com/mcp |
| `com.netactuate/net-actuate` | NetActuate data centers, compliance, products, marketplace apps and docs | https://netactuate.com/mcp |
| `com.netsendo/website` | NetSendo email marketing product facts, plans, docs and blog | https://netsendo.com/mcp |
| `com.netsheetly/site` | Netsheetly site dataset rows, statistics and cited provenance | https://netsheetly.com/mcp |
| `com.neuralcosmology/neuralcosmology` | Essays and answers on consciousness, cosmology, physics and biology | https://neuralcosmology.com/mcp |
| `com.neuralroles/ai-jobs` | Open AI and machine learning jobs and AI training work | https://neuralroles.com/ojcp/mcp |
| `com.neurobird/search` | Live web search results with extracted passages | https://search.neurobird.com/mcp |
| `com.neuronto/agents-tools-search-discovery-ard-registry` | Registry of MCP servers, tools, agents and APIs | https://neuronto.com/mcp |
| `com.neutralpick/company-list` | Self-listed software companies with categories and countries | https://neutralpick.com/api/mcp |
| `com.newruntime/archive` | Dated, source-linked AI engineering news, topics and forecasts | https://newruntime.com/mcp |
| `com.newswithoutpictures/news` | Verified current news stories, tech news and NCAA football | https://newswithoutpictures.com/mcp |
| `com.newtimespace/nts-news` | Chinese financial, IPO, ETF and tech news articles | https://mcp.newtimespace.com/mcp |
| `com.nexatabs/nexatabs` | NexaTabs browser tab manager features and help answers | https://www.nexatabs.com/_functions/mcp |
| `com.nibiashara/directory` | African and Caribbean diaspora businesses in US and Canada | https://nibiashara.com/mcp |
| `com.nicheangle/niche` | Niche news briefings and sourced story angles | https://api.nicheangle.com/mcp |
| `com.nicolassitter/research` | AI hotel recommendation visibility research and endurance race results | https://nicolassitter.com/api/mcp |
| `com.niji-ai-gazou/catalog` | Series and character archives of an adult AI illustration catalog | https://niji-ai-gazou.com/wp-json/niji-ai/v1/mcp |
| `com.ninebix/site` | Ninebix dataset rows with statistics and citations | https://ninebix.com/mcp |
| `com.niubiagent/niubiagent` | AI agent ecosystem signals, briefings and MCP compatibility reports | https://www.niubiagent.com/mcp |
| `com.nlnllabs/results` | Daily AI model accuracy and cost per right answer benchmarks | https://mcp.nlnllabs.com/mcp |
| `com.nobleblocks/nobleblocks-mcp` | Academic papers, citations, authors and clinical trial registrations | https://mcp.nobleblocks.com/mcp |
| `com.nofovo/site` | Nofovo site dataset rows, statistics and cited provenance | https://nofovo.com/mcp |
| `com.nokycscore/nokycscore` | No-KYC exchanges, wallets and VPNs with privacy grades and incidents | https://nokycscore.com/mcp |
| `com.nomnaviet/han-nom` | Chữ Nôm and Hán character readings, meanings and historical dictionary | https://api.nomnaviet.com/mcp |
| `com.noteboxd/mcp` | Fragrances, notes, accords, brands, perfumers, reviews and rankings | https://mcp.noteboxd.com/mcp |
| `com.npilayer/npilayer` | U.S. healthcare providers by NPI, specialty and location | https://npilayer.com/mcp |
| `com.ntop/docs` | nTop engineering software knowledge base and guides | https://docs.ntop.com/mcp |
| `com.nuditok/nuditok` | Adult video clips, creators and hashtags | https://nuditok.com/mcp |
| `com.nursinghomedatabase/mcp` | US nursing homes, CMS ratings and ownership records | https://mcp.nursinghomedatabase.com/mcp |
| `com.nymwell/lookup` | Domain availability, prices and public registration records | https://nymwell.com/mcp/lookup |
| `com.oakferry/agents` | Oakferry app facts: platforms, prices, ratings and limits | https://agents.oakferry.com/mcp |
| `com.obbjects/obbjects` | Isolated object photos on white with licenses and credits | https://obbjects.com/api/mcp |
| `com.oboelib/mcp` | Conservatory oboe fingerings, half-hole rules, trills and reed diagnosis | https://oboelib.com/api/mcp |
| `com.offdayly/site` | Offdayly site dataset rows, statistics and cited provenance | https://offdayly.com/mcp |
| `com.offladder/offladder` | Career guides, job profiles, AI impact on jobs, career change advice | https://offladder.com/claude/mcp |
| `com.oilpicker/oilpicker` | Korean regional currency fuel discounts and accepting merchants | https://oilpicker.com/api/mcp |
| `com.okeystay/okeystay` | Holiday rental listings with availability and total prices | https://okeystay.com/mcp |
| `com.olachill/olachill-travel` | Japan tours, tickets, transfers, charters and experiences with prices | https://olachill.com/mcp |
| `com.olfastory/perfume-encyclopedia` | Notes, families, perfumers and houses of 4,000+ perfumes | https://www.olfastory.com/mcp |
| `com.oltechx.www/marketplace` | Bulgarian used tech prices, listings, GPU FPS and PC compatibility | https://www.oltechx.com/mcp |
| `com.olyport/cochrane` | Cochrane systematic medical reviews and clinical evidence | https://mcp.olyport.com/cochrane/mcp |
| `com.olyport/irs-990` | US nonprofit IRS 990 filings, revenue, assets and compensation | https://mcp.olyport.com/irs-990/mcp |
| `com.olyport/pubmed` | PubMed biomedical literature, related articles and MeSH terms | https://mcp.olyport.com/pubmed/mcp |
| `com.oneuedu.mcp/oneu-education` | Australian courses, providers, skilled occupations, visa rules and invitations | https://mcp.oneuedu.com/mcp |
| `com.opendart/opendart` | Turkish software training courses, schedules and technical articles | https://www.opendart.com/mcp |
| `com.openforallofus/agora` | MCP servers catalog ranked by measured health checks | https://openforallofus.com/api/mcp |
| `com.openmedici/public` | Public fellowships, grants, scholarships and prizes | https://openmedici.com/mcp |
| `com.opennash.jobs/opennash-jobs` | Job listings and hiring trends at Forbes Global 2000 companies | https://jobs.opennash.com/mcp |
| `com.opennash.podcasts/opennash-podcasts` | Business and tech podcast transcripts and sourced speaker quotes | https://podcasts.opennash.com/mcp |
| `com.openpublica/civic-meetings` | US local government meeting summaries and transcripts | https://api.openpublica.com/mcp |
| `com.opexvo/site` | Opexvo site dataset rows, statistics and cited provenance | https://opexvo.com/mcp |
| `com.optimayield/bank-tools` | US bank call report profiles and treasury rate scenarios | https://www.optimayield.com/api/mcp |
| `com.optimistfi/optimistfi` | Stock filings, insider trades, investment theses and crypto perps market data | https://mcp.optimistfi.com/mcp |
| `com.orderpadledger/site` | OrderPadLedger site dataset rows, statistics and cited provenance | https://orderpadledger.com/mcp |
| `com.organikpi/organikpi` | OrganiKPI blog posts, product reviews and AI search study datasets | https://organikpi.com/.well-known/mcp |
| `com.orgbix/site` | Orgbix dataset rows, statistics and provenance | https://orgbix.com/mcp |
| `com.orgplanly/site` | Orgplanly's published dataset with source citations | https://orgplanly.com/mcp |
| `com.origamitutor/origami-tutor` | Origami projects with paper requirements and step-by-step folding instructions | https://origamitutor.com/api/mcp |
| `com.orlandu/arcade` | Sony PVM/BVM monitor specs, PlayChoice-10 games and retro video | https://www.orlandu.com/api/mcp |
| `com.ortexo/mcp` | Romanian and EU legislation, case law and point-in-time article text | https://mcp.ortexo.com/mcp |
| `com.ospitario/ospitario` | Vacation rental registry with verified operators in Italy and Europe | https://ospitario.com/mcp |
| `com.otinstaller/registry` | OSINT tools and investigation guides with usage and ethics notes | https://api.otinstaller.com/mcp |
| `com.ourowncause/publication` | Posts and debated questions written by AIs for AIs | https://ourowncause.com/mcp |
| `com.ownerspec/mcp` | Home water treatment guides, diagnosis, parts and sizing | https://ownerspec.com/mcp |
| `com.oystelo/network` | Shared structured knowledge and discussions published by AI agents | https://www.oystelo.com/agent-mcp |
| `com.padelstayguide/padel-hotels` | Hotels and resorts with padel courts, court details, best months | https://padelstayguide.com/mcp/ |
| `com.pafolios/pafolios` | Curated designer and developer portfolio websites for inspiration | https://pafolios.com/mcp |
| `com.pakistancaselaw/caselaw` | Pakistani court judgments, citations and legal questions settled | https://pakistancaselaw.com/mcp |
| `com.paradedb/mcp` | ParadeDB documentation, installation and website content | https://www.paradedb.com/mcp |
| `com.parikshaindex/parikshaindex` | Indian government exams and jobs: dates, results, admit cards, notices | https://parikshaindex.com/mcp |
| `com.partanswers/filter-lookup` | Genuine appliance parts and filters by model, with replacements | https://partanswers.com/mcp |
| `com.partstable/mcp` | IT hardware part numbers, details and cross-reference substitutes | https://partstable.com/mcp |
| `com.pastcharts/charts` | Historical App Store, Google Play charts and Google Trends searches | https://pastcharts.com/mcp |
| `com.patternshow/patternshow` | Handcrafted wallpaper and fabric designs by independent designers | https://patternshow.com/mcp |
| `com.pawlisty/pet-listings` | Pets for sale or adoption, breeds and buyer safety guidance | https://pawlisty.com/mcp |
| `com.peek/mcp` | Travel experiences and activities worldwide with details and availability | https://mcp.peek.com |
| `com.peerlookup/board` | Public agent questions, findings and answered discussions | https://peerlookup.com/mcp |
| `com.pelenoir/tenders-of-europe` | Open European public architecture, engineering and construction tenders | https://pelenoir.com/api/mcp |
| `com.penetrationtestservices/site` | Penetration testing guides, services and security research articles | https://penetrationtestservices.com/mcp |
| `com.penguindriver/glossary` | Plain-language Chinese explanations of AI and tech terms and how-tos | https://glossary.penguindriver.com/mcp |
| `com.peopleanalyst/discovery` | People analytics answers, story tracks and marketing registries | https://peopleanalyst.com/mcp |
| `com.peptency/research` | Peptide chemistry, cited studies, and FDA/EMA/MHRA regulatory records | https://peptency.com/api/mcp/ |
| `com.perkusai/search` | In-stock US and Amazon products with prices and ratings | https://mcp.perkusai.com/ |
| `com.petabloom/podcasts` | Podcast episode transcripts searchable by keyword and topic | https://podcasts.petabloom.com/mcp |
| `com.petforai/pet-data-station` | Pet food regulations, recalls, nutrient standards and pet health data | https://petforai.com/mcp/ |
| `com.petnecto/pets` | Adoptable shelter pets and rescues near a place | https://petnecto.com/mcp |
| `com.pickaplugin/pickaplugin` | Directory of MCP servers, AI plugins and agent skills | https://pickaplugin.com/mcp |
| `com.pickzeal/pickzeal` | PickZeal's free PDF, SEO and text tools and practical articles | https://pickzeal.com/mcp |
| `com.plainerror/plainerror` | Plain-English fixes for Windows, PC game and code errors | https://plainerror.com/mcp |
| `com.plainquant/plainquant` | US and HK stock event studies, scores, and SEC filings | https://plainquant.com/mcp |
| `com.planningledger/planningledger` | UK planning applications, documents, appeal decisions and Local Plan policies | https://mcp.planningledger.com/mcp |
| `com.plumbregistry/directory` | Fire protection contractor licenses in Texas and California | https://plumbregistry.com/mcp |
| `com.podlexicon/podlexicon` | AI summaries of long-form podcast episodes by topic | https://podlexicon.com/mcp/ |
| `com.point-topic/point-topic-mcp-public` | UK broadband ISPs, networks, links and standards | https://mcp.point-topic.com/public |
| `com.politicalcomms/docs` | Political Comms product documentation | https://docs.politicalcomms.com/mcp |
| `com.powerplatformtip/mcp` | Practical Microsoft Power Platform tips, articles and Power Apps YAML snippets | https://func-mcp-kmupower.azurewebsites.net/tip/mcp |
| `com.pplfree/ground-school` | FAA private pilot ground school lessons and practice questions | https://pplfree.com/mcp |
| `com.ppn-hub/ppn-hub` | Dozens of public APIs covering environment, culture and energy data | https://mcp.ppn-hub.com/mcp |
| `com.primessio/mcp` | AI implementation, software and marketing guides from Primessio | https://primessio.com/mcp |
| `com.printags/docs` | Printags cards, prices, ordering, API and MCP documentation | https://www.printags.com/mcp/docs |
| `com.printinglabs/printing-labs` | Corporate gifting catalog, bulk pricing and company information | https://printinglabs.com/mcp |
| `com.privaku/site` | PRIVAKU apps, features, privacy policy and download links | https://privaku.com/mcp |
| `com.probativegrowth/legal-markets` | US legal market demand, lawyer supply and advertising rules by county | https://probativegrowth.com/mcp/markets |
| `com.profitpather.tools/us-tariff-lookup` | US Harmonized Tariff Schedule codes and governing duty rates | https://tools.profitpather.com/duty/mcp |
| `com.proflightsearch/airport-delays` | Live airport delays, weather conditions and forecasts | https://proflightsearch.com/mcp |
| `com.profullstack/hqtui-bbs` | HQTUI bulletin board forum discussions and posts | https://bbs.hqtui.com/api/mcp |
| `com.profullstack/r4ck` | Server, VPS and GPU hosting offers, prices and providers | https://r4ck.dev/mcp |
| `com.profullstack/search-peptides` | Research peptide vendors, listings, prices and lab test results | https://search.peptides.pit.world/mcp |
| `com.projectthunder/site` | ERP and B2B ecommerce insights, case studies and ERP partner directory | https://www.projectthunder.com/mcp |
| `com.promptandco/operational-memory` | Known failures and fixes for websites, APIs, payments, places | https://promptandco.com/mcp |
| `com.psychedelicskg/knowledge-graph` | Psychedelic research papers, compounds, outcomes, authors and relationships | https://api.psychedelicskg.com/mcp |
| `com.pumpfyi/mcp` | pump.fun trading fees, coin risk checks and referral details | https://pumpfyi.com/mcp |
| `com.pyungyo/mvno-plans` | Korean MVNO mobile plans, prices and price history | https://pyungyo.com/mcp |
| `com.quantlix/content` | Quantlix services, company information and insights | https://quantlix.com/mcp/ |
| `com.qubitsok/mcp-server` | Quantum computing jobs, arXiv papers and researcher profiles | https://qubitsok.com/mcp |
| `com.quelvio/mcp-server` | A company's internal knowledge across Drive and other connected systems | https://mcp.quelvio.com/http |
| `com.raiselens/raise-lens` | Sustainability grants, tenders, funders, deadlines and recent funding rounds | https://mcp.raiselens.com/mcp |
| `com.ratetrove/mcp` | Verified US credit union deposit rates ranked by APY | https://ratetrove.com/mcp |
| `com.rayoninsure/docs` | Commercial insurance guides for robotics deployments and contractors | https://rayoninsure.com/mcp/docs |
| `com.rbacmap/rbacmap` | Microsoft 365 and Azure built-in roles, permissions and least privilege | https://rbacmap.com/mcp |
| `com.recipes-daily/recipes` | Recipes and cooking guides searchable by ingredient | https://recipes-daily.com/mcp |
| `com.recordsure/website` | Recordsure company pages, insights, case studies, documents and contacts | https://mcp.recordsure.com |
| `com.redocly/mcp` | Redocly product docs, guides and blog | https://redocly.com/mcp |
| `com.redpanda/docs-mcp` | Redpanda documentation, API references, config properties, rpk commands | https://docs.redpanda.com/mcp |
| `com.redqd.ffrs/ffrs-wiki` | Final Fantasy Resonance equipment, enemies, quests, drops and items data | https://ffrs.redqd.com/mcp |
| `com.reelsongfinder/reelsongfinder` | Song recordings by ISRC and songs used in social videos | https://reelsongfinder.com/mcp |
| `com.reevol.source/supplier-search` | Global suppliers by product, HS code, country with due diligence flags | https://source.reevol.com/mcp |
| `com.refapp/help` | Refapp help center articles on how the product works | https://help-mcp.refapp.com/mcp |
| `com.referralflooring/business-card` | Referral Flooring business facts and website content | https://www.referralflooring.com/mcp |
| `com.regaffairsai/regaffairs` | Chemical, food, pharma, device and cosmetic regulations with citations | https://mcp.regaffairsai.com/mcp |
| `com.reguscilabs.www/documentation` | RegusciLabs innovation lab information, news and public activity | https://mcp.reguscilabs.com/docs |
| `com.rekvira/rekvira` | EU regulation text, obligations and pinpoint citations for compliance | https://mcp.rekvira.com/mcp |
| `com.reliancetrenchless/catalogue` | Trenchless pipe-repair products with technical guides and comparisons | https://reliancetrenchless.com/mcp |
| `com.remodelyourvibe.www/site-guide` | Home remodeling services, cost guides, service areas and articles | https://www.remodelyourvibe.com/mcp |
| `com.remotejobscenter/remote-jobs` | Current remote job listings by category, region, perk, company | https://remotejobscenter.com/mcp |
| `com.remotenomadjobs/jobs` | Work-from-anywhere remote jobs, companies, salaries and perks | https://mcp.remotenomadjobs.com/mcp |
| `com.remyresearch/ordering` | UAE research-use compound product catalogue with AED pricing | https://remyresearch.com/mcp |
| `com.repoalerts/radar` | Rising GitHub repositories, trending projects and open-source alternatives | https://repoalerts.com/mcp |
| `com.reportgem/global-research` | Sell-side research reports, SEC filings, earnings calls and charts | https://www.reportgem.com/mcp |
| `com.researchcal/researchcal` | Academic conference and call for papers deadlines by field | https://mcp.researchcal.com/mcp |
| `com.resolvemesh/compatibility` | MCP Registry servers by capability and client compatibility data | https://resolvemesh.com/mcp/public |
| `com.rexceltech/pvault` | Protein sequences, homologs, structures and alignments | https://pvault.rexceltech.com/mcp |
| `com.rezifi/jobs` | Open jobs from employer careers sites, recently confirmed open | https://api.rezifi.com/mcp |
| `com.ridgerunner/outdoor-gear` | Hunting, fishing, camping and outdoor gear product catalog | https://mcp.ridgerunner.com/mcp |
| `com.risingtests/mcp` | Checked facts and figures with official sources and review dates | https://risingtests.com/mcp |
| `com.rivieramayaelite/directory` | Riviera Maya local businesses, area guides and real estate developments | https://travel.rivieramayaelite.com/mcp |
| `com.robbiegeorgephotography/naturepedia` | Naturepedia canonical resources and registries on nature | https://mcp.robbiegeorgephotography.com/mcp |
| `com.robinsaige/verifier` | MCP server reliability, trust verdicts and tool discovery | https://robinsaige.com/mcp |
| `com.rolefig/rolefig` | Current job openings and company hiring profiles published on rolefig | https://rolefig.com/mcp |
| `com.roleweek/jobs` | Recent US and Canada developer jobs with posted salaries | https://roleweek.com/api/mcp?src=mcp-registry |
| `com.rolstonpaul/field-notes` | Rolston Paul field notes quoted word for word | https://rolstonpaul.com/mcp |
| `com.romankryvolapov/blog` | Engineering articles on Java, Kotlin, Android, Kubernetes, local LLMs | https://mcp.romankryvolapov.com/ |
| `com.rottenads/offers` | Affiliate CPL/CPA offers in telehealth, finance and insurance verticals | https://rottenads.com/mcp |
| `com.roxyapi/docs` | RoxyAPI endpoints, parameters and SDK usage documentation | https://roxyapi.com/mcp/docs |
| `com.ruyuejian/ruyuejian-jobs-mcp` | China tech job postings from official company career pages | https://www.ruyuejian.com/api/mcp |
| `com.ryufin/stocks` | US stock fundamentals, financial history and 8-K news from SEC | https://ryufin.com/mcp |
| `com.saaskr/korean-saas-directory` | Korean SaaS services, agent-ready APIs and AI providers | https://saaskr.com/api/mcp |
| `com.saasthinktank/evidence` | Dated research findings comparing AI app builders on code export and backends | https://saasthinktank.com/mcp |
| `com.saferate/saferate` | US mortgage rates, lender rankings, HMDA data and Treasury market data | https://mcp.saferate.com/mcp |
| `com.safetoheat/lookup` | Microwave, dishwasher, oven, freezer safety of dishes and packaging | https://safetoheat.com/mcp |
| `com.sakuraweb.yamagishi/physics-papers` | Japanese and English math-physics preprints with separator statements | https://yamagishi.sakuraweb.com/mcp/ |
| `com.salahflow/mcp` | Salah Flow prayer tracker facts, FAQ and guides | https://salahflow.com/mcp |
| `com.salsmart/grocery-prices` | Israeli supermarket branch prices, barcodes and offers in shekels | https://salsmart.com/mcp |
| `com.samcarlton.ecosystem/tulsa-ecosystem-map` | Tulsa and Oklahoma startup ecosystem organizations and connections | https://ecosystem.samcarlton.com/mcp |
| `com.santismm/knowledge` | Agentic AI patterns, governance, benchmarks, robotics and Homeric geography | https://santismm.com/mcp |
| `com.satmarin/catalog` | Maritime VSAT spare parts, antenna fitment and supersession information | https://satmarin.com/mcp |
| `com.saveonphone/cell-phone-plan-comparison` | US cell phone plans, carrier costs, wireless news and switching guidance | https://saveonphone.com/mcp |
| `com.scamnav/scamnav` | Scam cases, scam types, red flags and official reporting channels | https://scamnav.com/mcp |
| `com.scanverity/public-market-discovery` | Polymarket prediction markets search by topic | https://scanverity.com/mcp-discovery |
| `com.schedjoules/calendars` | Public holidays, school holidays, sports fixtures and TV schedules | https://www.schedjoules.com/mcp |
| `com.scienceshot/science` | Radiation, particle physics, photonics, electronics and quantum reference with calculators | https://scienceshot.com/mcp |
| `com.scigantic/mcp` | Public scientific datasets, their schemas, arXiv papers and patent chemistry | https://api.scigantic.com/mcp |
| `com.scrapeunblocker/scrapeunblocker-mcp-remote` | Google search results and web page content as Markdown | https://mcp.scrapeunblocker.com/mcp |
| `com.screenrove/screenrove` | Real SaaS UI screenshots, flows, pricing pages and design references | https://screenrove.com/mcp |
| `com.sdfmanuals/catalog` | SDF tractor and equipment PDF manuals by model | https://sdfmanuals.com/wp-json/sdf-catalog/v1/mcp |
| `com.seahawkmedia/site` | Seahawk Media services, prices, guides and contacts | https://seahawkmedia.com/mcp |
| `com.searchcode/mcp` | Source code, file trees and quality findings of public git repositories | https://api.searchcode.com/v1/mcp |
| `com.searchfragments/search-fragments` | Identifying half-remembered things and verifying factual claims with web sources | https://searchfragments.com/api/mcp |
| `com.searchnapply/searchnapply` | Job postings from company career sites worldwide | https://api.searchnapply.com/mcp |
| `com.searchupside/wa-sales-tax` | Washington state sales tax rates by address | https://searchupside.com/mcp/wa-sales-tax |
| `com.securitystartups/catalog` | Young security companies, categories, funding and directory statistics | https://securitystartups.com/mcp |
| `com.selfbadge/selfbadge` | Verified public profiles of people and organizations | https://selfbadge.com/mcp |
| `com.selfhostrecipes/selfhost-recipes` | Ready-to-run Docker Compose stacks for self-hosting apps | https://selfhostrecipes.com/mcp |
| `com.seniordognotes/pawline-pet-guides` | Pet and animal care guides plus care calculators | https://pawline-mcp.pawline.workers.dev/mcp |
| `com.senzing/mcp` | Senzing entity resolution docs, SDK reference, code examples and error codes | https://mcp.senzing.com/mcp |
| `com.seodebrief/seo-debrief` | Recent SEO and AI search news stories with sources | https://seodebrief.com/mcp |
| `com.sermonregistry/sermon-registry` | Published sermons, churches and Bible resources by topic and preacher | https://sermonregistry.com/api/mcp |
| `com.setupbay/loadouts` | Ready-made rules, skills and MCP configs for coding agents | https://setupbay.com/mcp |
| `com.seventhfeed/seventhfeed` | AI marketing and SEO tools with pricing and traffic | https://seventhfeed.com/mcp |
| `com.sfxmint/sounds` | Free CC0 sound effects catalog with metadata and downloads | https://sfxmint.com/mcp?ref=registry |
| `com.sgpbusiness/singapore-entities-directory` | Singapore registered entities by name or UEN from ACRA open data | https://mcp.sgpbusiness.com/mcp |
| `com.shipshapedata/shipshape-data-docs` | Practical guides on data engineering and AI from Shipshape Data | https://shipshapedata.com/mcp/docs |
| `com.shortlistsaas/shortlist` | Directory of SaaS products scored for fit to a need | https://shortlistsaas.com/mcp |
| `com.showcasia/property-search` | Live property listings in Indian cities with verification status | https://showcasia.com/mcp |
| `com.showmrr/showmrr` | Startup monthly recurring revenue figures, history and leaderboards | https://showmrr.com/api/mcp |
| `com.shrutikaushik/research` | Founder go-to-market guides and LinkedIn, Reddit, AI search statistics | https://shrutikaushik.com/mcp |
| `com.siemens.mcp/siemens` | Siemens products, datasheets, developer docs, news and media | https://mcp.siemens.com/mcp |
| `com.sigistry/plugin-catalog` | Claude Code plugins, skills and graded MCP server scorecards | https://sigistry.com/mcp |
| `com.signed/investors` | Public angel investor profiles by sector and check size | https://mcp.signed.com/investors |
| `com.siilostomy/guides` | Ostomy daily life, recovery, sport and intimacy guides | https://mcp.siilostomy.com/content-mcp/mcp |
| `com.siliconfriendly/directory` | Websites rated on AI-agent-friendliness | https://siliconfriendly.com/mcp |
| `com.silkvin/agent-door` | Wholesale parts catalogue for Chinese car brands by OE number | https://silkvin.com/mcp |
| `com.simplecohortllc.bible/shepherd-bible-api` | Bible translations, books, chapters and verses | https://bible.simplecohortllc.com/mcp |
| `com.simplenpi/npi` | US healthcare provider NPI registry records and how to get an NPI | https://simplenpi.com/mcp |
| `com.sitepatent/directory` | Directory of software, SaaS and AI tools with alternatives and categories | https://sitepatent.com/api/mcp |
| `com.skaidigital/norwegian-companies` | Norwegian company registry data, annual accounts, groups and industry codes | https://tools.skaidigital.com/brreg/mcp |
| `com.skamper/skamper` | Curated UK running routes, trails and parkrun-distance runs | https://skamper.com/mcp |
| `com.skillmd/skillmd` | Registry of Agent Skills (SKILL.md) searchable by task | https://api.skillmd.com/mcp |
| `com.skipshit/mcp` | People contact and property records: phones, emails, addresses, relatives | https://mcp.skipshit.com/mcp |
| `com.smallbusinesscommunity/library` | Practical small business advice from community posts and podcast episodes | https://small-business-library.pat-46d.workers.dev/mcp |
| `com.smifs/smifs` | SMIFS broker profile, products, FAQs, research posts and policies | https://smifs.com/mcp |
| `com.smspva/docs` | SMSPVA API docs for SMS activation, number rental and private email | https://mcp.smspva.com/docs |
| `com.snready/snready-mcp` | ServiceNow certification blueprints, practice questions and release calendar | https://snready.com/mcp |
| `com.socialmediaagencydirectory/agency-directory` | Social media marketing agencies by location, service and budget | https://socialmediaagencydirectory.com/mcp |
| `com.socketlist/socketlist` | Scored MCP servers with setup snippets and quality breakdowns | https://socketlist.com/mcp |
| `com.softwareengineeringprofessional/journeyman` | Grounded software development patterns with sources for aspiring engineers | https://journeyman.softwareengineeringprofessional.com/api/mcp |
| `com.songstoyoureyes/catalog` | Production music cues by mood, runtime, versions and cue sheet clearance data | https://mcp.songstoyoureyes.com/mcp |
| `com.soracom/knowledge` | SORACOM IoT documentation, guides, FAQ and API references | https://knowledge-mcp.soracom.com |
| `com.soundboardio/mcp` | Famous quotes from movies, series and personalities with playable sounds | https://soundboardio.com/mcp |
| `com.southlondonscientific/hermes` | UK air quality readings, trends, monitors and WHO guideline checks | https://hermes.southlondonscientific.com/mcp |
| `com.sovereigngl/sgl-developers` | SGL developer docs, API reference, engine plugins and game mods | https://www.sovereigngl.com/api/mcp/developers |
| `com.spacexploration/listings` | US commercial real estate listings and building parcel hazard data | https://spacexploration.com/mcp |
| `com.sparkonomy.creatorgraph/docs` | How Open Creator Graph records, consent and reuse terms work | https://creatorgraph.sparkonomy.com/mcp/docs |
| `com.sparkonomy.creatorgraph/records` | Digital creators' accounts, follower counts, topics and AI-use consent | https://creatorgraph.sparkonomy.com/mcp |
| `com.spekkr/spekkr` | Build specs that AI agents use to create app parts | https://spekkr.com/mcp |
| `com.spocont/otthonesuzlet` | Hungarian homes and shops for sale or rent | https://mcp.otthonesuzlet.hu |
| `com.srclog/srclog` | GitHub repositories, similar projects, topics and top developers rankings | https://srclog.com/mcp |
| `com.stackduke/radar` | Tool list changes in official vendor MCP servers | https://radar.stackduke.com/mcp |
| `com.stackgems/catalog` | Reviewed developer tools with verdicts, caveats and alternatives | https://stackgems.com/api/mcp |
| `com.standardissuedata/vehicle-data` | Vehicle identity, recalls, safety ratings, fuel economy and price history by VIN | https://standardissuedata.com/playground/mcp |
| `com.starbelo/mcp` | AI money-making use cases, AI tools and prompt pages | https://mcp.starbelo.com/mcp |
| `com.startdrugrehab/treatment-directory` | Licensed U.S. drug and alcohol rehab and detox centers | https://startdrugrehab.com/wp-json/sdr/v1/mcp |
| `com.stayingasia/mcp` | Visa entry rules and long stay routes for Asian countries | https://stayingasia.com/api/mcp/ |
| `com.stimulsoft/docs` | Stimulsoft Reports and Dashboards official documentation across platforms | https://devs.stimulsoft.com/mcp-docs |
| `com.stockcake/stockcake` | CC0 public-domain AI images with previews, metadata and license | https://stockcake.com/api/mcp |
| `com.stockexpertai/research` | US stock ratings, pillar scores, ranked screens and earnings dates | https://www.stockexpertai.com/mcp/research |
| `com.straply/straply` | U.S. property listings, home details and ZIP market statistics | https://mcp.straply.com/mcp |
| `com.stratummarketresearch/reports` | Global market sizes, trade flows, top exporters and company rankings | https://stratummarketresearch.com/mcp |
| `com.stringspec/mcp` | Lab-measured tennis string specifications, comparisons and recommendations | https://stringspec.com/mcp |
| `com.strongsaga/gear-lookup` | Home gym equipment specs, prices, rankings and comparisons | https://strongsaga.com/wp-json/gear/v1/mcp |
| `com.struxurenorcal.walnbot/struxure-knowledge-base` | StruXure NorCal pergola products, services, FAQs and troubleshooting | https://walnbot.struxurenorcal.com/mcp/information |
| `com.subhadipmitra/site` | Subhadip Mitra's essays, papers, projects and measured results | https://subhadipmitra.com/mcp |
| `com.submitmystartup/mcp` | Startup launch directories, costs and submission results | https://submitmystartup.com/mcp |
| `com.subtensor/reference` | Subtensor blockchain pallets, events, calls, storage and Bittensor concepts | https://subtensor.com/mcp |
| `com.sunsetmixing/site-mcp` | Sunset Mixing public pages and products with source URLs | https://sunsetmixing.com/mcp |
| `com.supercyclehq/supercycle` | AI infrastructure stocks, exposure scores, capex, investor holdings | https://supercyclehq.com/mcp |
| `com.superhotgeo/superhotgeo` | Superhot rock geothermal wells, projects and research library | https://superhotgeo.com/mcp |
| `com.svgrid/svgrid` | SvGrid Svelte 5 data grid documentation, API reference and examples | https://mcp.svgrid.com/mcp |
| `com.sw-cpas/docs-mcp` | SW Accounting CPA firm pages, articles and services | https://sw-cpas.com/mcp/docs |
| `com.swarmecology/register` | Register of AI-agent cases, glossary terms and library works | https://swarmecology.com/mcp |
| `com.swgbar/swg-bar` | macOS corporate SWG and HTTPS inspection setup guides | https://swgbar.com/mcp |
| `com.symbaiex.www/docs` | SYMBaiEX developer and agent documentation | https://www.symbaiex.com/api/docs/mcp |
| `com.symbaiex.www/evidence` | Normalized public evidence documents, news and change events | https://www.symbaiex.com/api/agent/mcp |
| `com.szymonpaluch/mcp` | Claude certification practice questions and AI implementation blog posts | https://szymonpaluch.com/mcp |
| `com.tabflows/site` | US direct primary care and clinic directories, Tabflows product info | https://www.tabflows.com/api/mcp |
| `com.tailorgame/public-tools` | Public Tailorgame games, rankings and documentation | https://tailorgame.com/mcp |
| `com.talval/research` | Stock valuation verdicts, fair values and superinvestor 13F holdings | https://talval.com/mcp |
| `com.tatseek/tatseek` | Tattoo photos, artists, studios, symbol meanings and aftercare guides | https://tatseek.com/mcp |
| `com.tbmlib/mcp` | Trombone slide positions, overtone intonation and equipment comparisons | https://tbmlib.com/api/mcp |
| `com.tealmac/ui` | shadcn React components, props, examples and install commands | https://ui.tealmac.com/mcp |
| `com.techpartprices/catalogue` | UK PC component prices and stock from Amazon UK | https://techpartprices.com/mcp |
| `com.tedthetaxguy/ted` | US federal tax answers cited to IRS pages, deadlines | https://tedthetaxguy.com/mcp |
| `com.tehranindex/registry` | Sourced facts about Iranian technology companies and market signals | https://tehranindex.com/api/mcp |
| `com.telastricotela/catalog` | Telas Tricotela fabric products, prices, availability and store policies | https://telastricotela.com/mcp |
| `com.testedmcp/testedmcp` | Test scores, evidence and deprecation status of MCP servers | https://testedmcp.com/mcp |
| `com.testingreference/testing-reference` | Cited electrical testing standards, methods and US NEC adoption | https://www.testingreference.com/mcp |
| `com.texasdeedrestrictions/texas-deed-restrictions` | Recorded Texas deed restrictions by address, Travis County | https://texasdeedrestrictions.com/mcp |
| `com.tfhandywash/site` | TF Handy Wash laundromat prices, hours, machines and FAQ | https://tfhandywash.com/mcp |
| `com.tgboard/catalog` | Directory of 100k+ Telegram channels, bots and groups with rankings | https://tgboard.com/mcp/ |
| `com.thaiapp/bible-app` | Thai and English Bible text, scripture search and daily verse | https://thaiapp.com/bible-app/mcp |
| `com.thailandfunexperiences/thailand-fun-experiences` | Phuket activities with live weather, sea conditions and transfer times | https://thailandfunexperiences.com/mcp |
| `com.thaiprops/mcp` | Thailand real estate property and project listings | https://www.thaiprops.com/mcp |
| `com.theaiintegrationhub/use-cases` | Practical AI use cases by industry and workflow | https://www.theaiintegrationhub.com/mcp |
| `com.theaimeters/theaimeters` | AI electricity, water and carbon impact data with methodology | https://www.theaimeters.com/mcp |
| `com.theartillerist/artist-intelligence` | Art research articles by category | https://theartillerist.com/mcp |
| `com.thecastlemap/castles` | Castles, fortresses, palaces and ruins worldwide with locations and fame rankings | https://thecastlemap.com/mcp |
| `com.thecompdesk/nys-workers-comp-hub` | New York workers' compensation rules, case law, forms and glossary | https://ltibymvlytodkemdeeox.supabase.co/functions/v1/nys-workers-comp-hub/mcp |
| `com.thecrowdspace/crowdspace` | Crowdfunding and P2P lending platforms, market data, regulation and news | https://mcp.thecrowdspace.com/mcp |
| `com.thedailyworkflow/thedailyworkflow-mcp` | AI tools, MCP servers, free alternatives, tutorials and prompts | https://thedailyworkflow.com/api/v1/mcp/bridge |
| `com.theemptylegindex/empty-leg-index` | Published UK and Europe empty-leg private jet flights | https://theemptylegindex.com/api/mcp |
| `com.thefilmmap/filming-locations` | Filming locations of films and TV, and settings of games and anime | https://thefilmmap.com/mcp |
| `com.thegastrologer/clinical` | Physician-reviewed gastroenterology teaching modules, evidence and claim verification | https://thegastrologer.com/api/mcp |
| `com.thegidocs/public-information` | GIDocs medical services, providers, offices and accepted insurance | https://thegidocs.com/mcp |
| `com.thegtmdirectory/mcp` | Go-to-market software tools with vendor-verified pricing, API and MCP facts | https://thegtmdirectory.com/api/mcp |
| `com.theholisticcare/open-mindfulness` | Mindfulness practices, games, research summaries and glossary terms | https://mcp.theholisticcare.com/mcp |
| `com.theitalianwinemap/wine-map` | Italian wine appellations, grapes, producers, reviews and vintage ratings | https://theitalianwinemap.com/mcp |
| `com.thekoreantoday/news` | Korean news articles plus Korean daily data like rates, weather | https://smilestory.thekoreantoday.com/mcp |
| `com.themethodic/candor` | Candor UI component docs, patterns and design system | https://candor.themethodic.com/mcp |
| `com.thenotetakers/reviews` | Reviews of AI meeting notetaker tools | https://thenotetakers.com/api/mcp |
| `com.theoddsgap/answers` | Sports betting odds, game lines, futures and past game results | https://theoddsgap.com/assistant/v1/mcp |
| `com.theonchaindiary/onchain-diary` | Web3 security education articles and glossary | https://theonchaindiary.com/api/mcp |
| `com.theopros/mcp` | State-licensed US home contractors and their license records | https://api.theopros.com/mcp |
| `com.theprivateclubs/private-clubs` | Private membership clubs worldwide with locations and waitlist status | https://www.theprivateclubs.com/api/mcp |
| `com.therenovationroom/renovation-room` | Chicagoland renovation contractors and fact-checked home renovation answers | https://therenovationroom.com/wp-json/trr-mcp/v1/mcp |
| `com.theresanaiforthat/taaft` | Directory of AI tools, AI models, task categories and partner deals | https://theresanaiforthat.com/mcp-server/ |
| `com.theskillharbor/skill-harbor` | Directory of Muse AI assistant skills and builds | https://theskillharbor.com/mcp |
| `com.theveilpress.www/veilpress` | The Veil Press breaking news and Desk articles with sources | https://www.theveilpress.com/api/mcp |
| `com.thingstodoapi/events` | Local events: shows, markets, classes with times and venues | https://api.thingstodoapi.com/mcp |
| `com.thisisdelightful/games-research-starter-pack` | Curated sources, markets and trends for video games industry research | https://games.thisisdelightful.com/mcp |
| `com.tickerfacts/fundamentals` | SEC EDGAR fundamentals, insider filings and economic context for US companies | https://tickerfacts.com/mcp |
| `com.tileio/tileio` | Web design layers library with build prompts for HTML and frameworks | https://tileio.com/api/mcp |
| `com.tippingrules/tipping-rules` | Travel tipping customs and rules for 140 destinations | https://www.tippingrules.com/api/mcp |
| `com.todaywp/todaywp` | Current WordPress versions, docs, code reference, plugin facts and vulnerabilities | https://todaywp.com/mcp |
| `com.tomesphere/tomesphere` | 8.5M scientific papers with summaries, citations and full text | https://mcp.tomesphere.com/api/mcp |
| `com.toolocate/toolocate` | Directory of AI tools with pricing, features and alternatives | https://api.toolocate.com/mcp |
| `com.topimpressionists/art-search` | Impressionist artworks, artists, museums and art articles | https://direct.topimpressionists.com/mcp/ |
| `com.topologyindex/topology-index` | Multi-agent LLM topology patterns, sources and research findings | https://topologyindex.com/mcp |
| `com.torqueindex/truck-reference` | US truck engine failures, parts, recalls, repair costs, service specs | https://torqueindex.com/mcp |
| `com.tovcore/tovcore` | Theologically reviewed worship songs, scripture links and setlist suggestions | https://tovcore.com/api/mcp |
| `com.tppflow/warn-act-layoffs` | US WARN Act mass layoff notices by state, employer and date | https://mcp.tppflow.com/mcp |
| `com.tracevero/registry` | Public MCP servers and coding agents with sourced metadata | https://api.tracevero.com/mcp |
| `com.trademarkdashboard.www/brand-answers` | UK and US trade mark conflicts and brand name protection | https://www.trademarkdashboard.com/api/apps/answers/mcp |
| `com.tradingaihub/directory` | AI tools, MCP servers and APIs for finance and trading | https://tradingaihub.com/mcp |
| `com.tradingcardvaluechecker/site` | Trading Card Value Checker dataset rows with statistics and cited provenance | https://tradingcardvaluechecker.com/mcp |
| `com.tradoshi/rankings` | Sourced rankings of trading schools and prop firms with market figures | https://tradoshi.com/mcp |
| `com.trailgenic/trailgenic` | Hiking protocols, trail data, gear and longevity training research | https://mcp.trailgenic.com/mcp |
| `com.travelacosta/trip-planning` | Travel destination guides, entry requirements, tips and group trips | https://travelacosta.com/mcp |
| `com.tridentstack/docs` | TridentStack Control docs on patching, vulnerabilities, compliance, API | https://docs.tridentstack.com/mcp |
| `com.triremes/triremes` | Reported real-world problems and business websites with poor SEO | https://triremes.com/mcp |
| `com.truepeptidesource/peptides` | Peptide reference: published dose ranges, protocols, comparisons and reconstitution math | https://truepeptidesource.com/mcp |
| `com.trusoro/directory` | US local business listings with Florida license records | https://trusoro.com/mcp |
| `com.truvanatech/site` | Card processing fees, surcharge laws and POS guides for small merchants | https://truvanatech.com/mcp |
| `com.tryafterlight.commons/afterlight-commons` | Agent-written records of errors, fixes, gotchas and dead ends | https://commons.tryafterlight.com/mcp |
| `com.tubesaku/creator-insights` | Japanese YouTube streams, VTuber debuts, game and cover song trends | https://tubesaku.com/mcp |
| `com.tulugar/tulugar` | Paraguay and Latin America real estate listings, projects and agencies | https://tulugar.com/api/mcp |
| `com.twinethos/lite` | AI laws by market: provisions, scope, effective dates, required guards | https://api.twinethos.com/lite/mcp |
| `com.typebid/typebid` | Chinese public tender notices, buyer profiles and market statistics | https://typebid.com/mcp |
| `com.uibrik/components` | Animated React components with props, source and install steps | https://uibrik.com/mcp |
| `com.ultimatesweepers/sweepstakes` | Free-to-enter US sweepstakes by prize, end date and state | https://ultimatesweepers.com/mcp |
| `com.ulupstudio/nexus` | Verified indie software and games with pricing and categories | https://nexus.ulupstudio.com/mcp |
| `com.umesh-malik/blog-mcp` | Blog posts on Claude Code, MCP, AI search and LLM engineering | https://umesh-malik.com/mcp |
| `com.unclepony/gaian` | Agent-shared fixes for errors and open technical questions | https://gaian.unclepony.com/mcp |
| `com.uncommonear/free-music-sound-effects` | Free CC music and sound effects with license and credits | https://uncommonear.com/mcp |
| `com.underhyper/mcp` | Hyperliquid perp markets, funding rates, HIP-3 dexes and guides | https://underhyper.com/mcp |
| `com.undocsend/docs` | undocsend product documentation, pricing and security details | https://mcp.undocsend.com/docs |
| `com.undtec/carriers` | US insurance companies in the NAIC registry | https://carriers.undtec.com/mcp |
| `com.undtec/fmcsa` | US motor carrier safety, authority and insurance filings | https://fmcsa.undtec.com/mcp |
| `com.unifiedchambers/legal` | Indian debt recovery law, DRT benches, SARFAESI periods and bare acts | https://www.unifiedchambers.com/mcp |
| `com.unitebr.research/benchmark` | Brazil Black Friday creative benchmarks with chart data and citations | https://research.unitebr.com/mcp |
| `com.univs/univs` | Universities, study programmes, tuition and education agencies worldwide | https://univs.com/wp-json/univs-agent/v1/mcp |
| `com.unlistedhomes/unlisted` | Residential properties not currently listed for sale | https://api.unlistedhomes.com/mcp |
| `com.upravio/public-knowledge` | Upravio contract-management features, limits and pilot guides | https://app.upravio.com/api/public/mcp |
| `com.usanaru/schools` | US boarding schools for international students, SEVP certification and visa guides | https://usanaru.com/mcp |
| `com.useaiblocks/library` | Library of AI skills, workflows, agents and prompts | https://useaiblocks.com/mcp |
| `com.usethisskill/skills` | Safety-scanned agent skills for Claude, Codex and Cursor | https://usethisskill.com/mcp |
| `com.usewhichtool/ai-tools` | AI developer tools compared with verified pricing and verdicts | https://usewhichtool.com/mcp |
| `com.usprimerealty/florida-home-search` | Florida property listings, new construction and real estate guides | https://api.usprimerealty.com/mcp |
| `com.usvipublicrecords/documents` | US Virgin Islands laws, code, court records, audits and hearings | https://mcp.usvipublicrecords.com/mcp |
| `com.usvipublicrecords/newspapers` | Historical Virgin Islands newspaper pages from 1770 to 2001 | https://newspapers-mcp.usvipublicrecords.com/mcp |
| `com.valudati/site` | Value Engineering articles on tax efficiency, fees, crypto and AI privacy | https://valudati.com/mcp |
| `com.vanetools/vanetools-directory` | Directory of AI tools, MCP servers, prompts, skills, plugins and learning resources | https://vanetools.com/mcp |
| `com.vectorpanda/docs` | Vector Panda API, pricing, storage tiers and benchmarks documentation | https://www.vectorpanda.com/mcp |
| `com.vedaword/library` | Sanskrit scripture verses: Mahabharata, Upanishads, Gita, with terms and calendar | https://mcp.vedaword.com |
| `com.velvetrituals/developer-docs` | Velvet Bluetooth device SDK and Live API documentation | https://developer.velvetrituals.com/api/mcp |
| `com.veritula/veritula` | Ideas, criticisms and discussions posted on Veritula | https://veritula.com/mcp |
| `com.veterans-rights/bva-corpus` | Board of Veterans' Appeals decisions and VA disability claim guidance | https://www.veterans-rights.com/api/mcp |
| `com.vibenate/vibenate` | Web services for agents with MCP, CLI and API connection guides | https://vibenate.com/mcp |
| `com.victano/victano` | Open EU public tenders and grant calls with documents | https://mcp.victano.com/mcp |
| `com.vidkraken/vidkraken-docs` | Vid Kraken API docs, guides and pricing | https://vidkraken.com/api/mcp-docs/mcp |
| `com.vigilena/japan-companies` | Japanese company public records, registry changes and tenders | https://api.vigilena.com/mcp |
| `com.vikenda/events` | Verified events and venues in Niagara-on-the-Lake, Ontario | https://api.vikenda.com/mcp |
| `com.vinemakerpublishing/public-catalog` | VineMaker Publishing books, articles and authors catalog | https://vinemakerpublishing.com/mcp |
| `com.vinilogy/precios-vinilo` | Current vinyl record prices across Spanish record shops | https://www.vinilogy.com/mcp |
| `com.visdenda/free` | AI crawler directory, SEO audit rules and Google update radar | https://visdenda.com/v1/mcp/free |
| `com.visioforge/sdk-docs` | VisioForge .NET media SDK API reference, examples and deployment guides | https://mcp.visioforge.com/mcp |
| `com.vitextra/knowledge-base` | Vitextra docs, product pages, how-to guides and FAQ | https://vitextra.com/mcp |
| `com.viupdate/news` | U.S. Virgin Islands news articles, editions and fact checks | https://mcp.viupdate.com/mcp |
| `com.voiceassistants/voice-gateway` | Local US and Canadian business hours, phones, services and prices | https://mcp.voiceassistants.com/mcp |
| `com.voiceflow/docs` | Voiceflow product, API, CLI and MCP documentation and changelog | https://www.voiceflow.com/docs/mcp |
| `com.vooks/catalog` | Children's animated storybooks, audiobooks and ebooks by age, topic, language | https://www.vooks.com/mcp |
| `com.vooks/docs` | Vooks API documentation, catalog API guide and pricing pages | https://www.vooks.com/docs/mcp |
| `com.voxelrank/voxelrank` | Game server listings for Minecraft, Rust, FiveM with votes and stats | https://voxelrank.com/api/mcp |
| `com.wadifa-info.www/morocco-public-jobs` | Moroccan public-sector recruitment exams, past papers, salaries and holidays | https://www.wadifa-info.com/mcp |
| `com.wahooart/art-search` | Artworks, artists, museums and art history articles | https://direct.wahooart.com/mcp/ |
| `com.wallofdecks/wall-of-decks` | Real pre-seed and seed pitch deck slides and structure benchmarks | https://wallofdecks.com/api/mcp |
| `com.washedge/washing-machines` | Washing machine specs, comparisons and official US efficiency data | https://washedge.com/mcp |
| `com.washydish/dishwashers` | Dishwasher specs, comparisons, DOE and ENERGY STAR data | https://washydish.com/mcp |
| `com.waterlessradiant/site` | Waterless refrigerant-direct radiant floor heating and cooling guides | https://waterlessradiant.com/mcp |
| `com.wayglad/stays` | USA vacation rentals and unique stays bookable direct with hosts | https://wayglad.com/mcp |
| `com.wearabledocs/wearabledocs` | US state laws on refusing anatomical gift, statutes and summaries | https://wearabledocs.com/mcp |
| `com.websitelaunches/launch-record-lookup` | Public launch record and owner verification for a website domain | https://websitelaunches.com/mcp |
| `com.websupergoo/docs` | ABCpdf, ImageGlue, WordGlue and ABCocr .NET documentation and API reference | https://www.websupergoo.com/mcp |
| `com.wewonweb/agora` | AI agent forum threads with shared fixes and solutions | https://wewonweb.com/site/agora/mcp |
| `com.whatjobs.mcp/job-search` | Live job listings, salaries and hiring companies in 58 countries | https://mcp.whatjobs.com/mcp |
| `com.whatmount/lookup` | TV and monitor VESA mount patterns, dimensions and weights per model | https://whatmount.com/mcp |
| `com.whiteautoandmedia/catalog` | GM infotainment, cluster and electronics module parts catalog | https://www.whiteautoandmedia.com/wp-json/ucp/v1/mcp |
| `com.wiagil/wiagil` | Cities, nearby hotels and landmarks, country travel basics and visas | https://mcp.wiagil.com/mcp |
| `com.wiastandards/standards` | WIA voluntary standards catalog and specification files | https://mcp-standards.wiastandards.com/mcp |
| `com.wiastandards/wisdom` | Curated documents on nine traditions of thought in English and Korean | https://mcp-wisdom.wiastandards.com/mcp |
| `com.wikexa/knowledge` | Wikipedia articles, Wikidata facts, Wiktionary definitions and academic papers | https://wikexa.com/mcp |
| `com.wikimedia.enterprise/docs` | Wikimedia Enterprise API guides and endpoint reference | https://enterprise.wikimedia.com/mcp |
| `com.wikitolica/mcp` | Catholic encyclopedia in Spanish: doctrine, saints, liturgy and history | https://www.wikitolica.com/mcp |
| `com.willitplug/willitplug-docs` | WillItPlug API, SDK, MCP and authentication integration guides | https://www.willitplug.com/docs/mcp/ |
| `com.windowsforum/mcp-server` | WindowsForum threads, Windows news, tutorials and Microsoft KB information | https://mcp.windowsforum.com/ |
| `com.wodcat/mcp` | CrossFit workouts, exercises, training plans, gyms and events | https://wodcat.com/mcp |
| `com.woodroar/chainsaws` | Chainsaw models, specs, comparisons and buying guides | https://woodroar.com/mcp |
| `com.workers-rights/employment-law` | US employment law rulings, employer track records, worker rights and EEOC process | https://www.workers-rights.com/api/mcp |
| `com.workinsiders/directory` | Recruiting, HR and sales tools: pricing, alternatives, integrations | https://workinsiders.com/mcp |
| `com.x402broker/x402-broker` | Catalog of MCP and x402 paid tools by capability | https://x402broker.com/mcp |
| `com.xcopybook/xcopybook` | XCOPYBook chapters, collector profiles and XCOPY crypto art works registry | https://xcopybook.com/mcp |
| `com.xevol/store` | Xevol store listings of ready-made AI jobs and services | https://xevol.com/api/mcp/store |
| `com.xlifflane/site` | Rows and statistics from the Xlifflane dataset with citations | https://xlifflane.com/mcp |
| `com.xposedornot/xposedornot` | Known data breaches and whether emails or domains were exposed | https://api.xposedornot.com/mcp |
| `com.yardrider/lawn-mowers` | Lawn mower models, specs, comparisons and buying guides | https://yardrider.com/mcp |
| `com.yearendo/site` | Rows and statistics from the Yearendo dataset with citations | https://yearendo.com/mcp |
| `com.yedabase/yedabase` | Investor records: family offices, VCs, funds of funds and decision-makers | https://yedabase.com/mcp |
| `com.yellowstake/agent-desk` | US TCPA and state telemarketing rules for insurance lead contact | https://yellowstake.com/mcp |
| `com.yieldzo/site` | Rows and statistics from the Yieldzo dataset with citations | https://yieldzo.com/mcp |
| `com.yorehistory/places` | Sourced studies of what towns were like in specific decades | https://yorehistory.com/mcp |
| `com.youanai/docs` | Youanai products, pricing, guides and release notes | https://youanai.com/api/mcp/docs |
| `com.zeltser/website-search` | Lenny Zeltser's security articles, IR, CTI and writing guidance | https://website-mcp.zeltser.com/mcp |
| `com.zephior/discovery` | Public procurement tender notices with sources and changes | https://mcp.zephior.com/mcp |
| `com.zoningverdict/mcp` | US municipal zoning district rules with ordinance citations | https://zoningverdict.com/api/mcp?ref=mcp-registry |
| `com.zynagi/hipaa-helper` | HIPAA rules, deadlines and vendor BAA status for medical offices | https://zynagi.com/mcp |
| `cz.procvicky/pracovni-listy` | Printable Czech school worksheets by topic, grade and subject | https://procvicky.cz/mcp |
| `de.abomio/mcp` | German car subscription offers, prices and terms | https://abomio.de/mcp |
| `de.angelmomente/angelmomente` | German fishing knowledge: species, seasons, guides, spots, ponds, fairs | https://angelmomente.de/mcp |
| `de.arnekellmann/consulting` | Architecture consulting documents and services in English and German | https://arnekellmann.de/mcp |
| `de.ausschreibungsagenten/tender-search` | Public procurement tenders from Germany, the EU and the UK | https://api.ausschreibungsagenten.de/mcp |
| `de.bluraysuchmaschine/suche` | Blu-ray and 4K UHD movie details, cast and categories | https://mcp.bluraysuchmaschine.de/mcp |
| `de.brunosan/arxiv` | AI and machine learning arXiv papers, citations, authors and entity trends | https://arxiv.mcp.brunosan.de/mcp |
| `de.bundeswehr-dienstgrade/mcp` | German armed forces ranks, equivalents and base pay | https://www.bundeswehr-dienstgrade.de/mcp |
| `de.fortsu/mcp` | Running shoe specs and price history in Germany | https://www.fortsu.de/mcp |
| `de.jobclerk/jobs` | German physician job listings and medical courses, congresses, webinars | https://jobclerk.de/mcp |
| `de.mechoulam/cannabis-evidence` | GRADE-rated clinical evidence on cannabis as medicine by indication | https://mechoulam.de/mcp |
| `de.my-flohmarkt/flea-market-catalog` | German flea market events by city, date and radius | https://mcp.my-flohmarkt.de/mcp |
| `de.nameholder/mcp` | Expired and auction domains with SEO metrics and valuations | https://nameholder.de/api/mcp |
| `de.nomado24/jobs` | Remote and hybrid job postings in Germany and EU | https://api.nomado24.de/api/public/v1/mcp |
| `de.overfit/overfit` | German and EU public tenders and procurement law rules | https://www.overfit.de/mcp |
| `de.php-entwickler/jobs` | PHP developer job postings and salaries in Germany, Austria, Switzerland | https://mcp.php-entwickler.de |
| `de.rechtsklar24/rechtsklar24` | German e-commerce law obligation dates and fine ceilings | https://rechtsklar24.de/mcp?src=mcp |
| `de.stellenonline/jobsearch` | Current German job listings from stellenonline.de | https://www.stellenonline.de/mcp |
| `de.vergabeweiser/tenders` | German public tenders, contract awards, winners and market statistics | https://vergabeweiser.de/mcp |
| `design.regards/mcp` | Real website sections and interactions for design inspiration | https://mcp.regards.design/mcp |
| `dev.ad-radar/ad-radar` | High-spend Meta ads with hooks, scripts and winning patterns | https://app.ad-radar.dev/api/mcp |
| `dev.agent-manager/docs` | Documentation for agent-manager terminal UI running AI coding agents | https://agent-manager.dev/mcp |
| `dev.agenticjobs/agenticjobs` | Remote AI engineering job postings using agentic coding tools | https://api.agenticjobs.dev/mcp |
| `dev.agentisallyouneed/manifesto` | The Agent Manifesto text and how to adopt it | https://agentisallyouneed.dev/mcp |
| `dev.agentpapers/agent-papers` | Companies selling identity, phone, email and payment services to AI agents | https://agentpapers.dev/api/mcp |
| `dev.agentsidekick/directory` | MCP servers, agent skills, plugins and platforms compared | https://mcp.agentsidekick.dev/mcp |
| `dev.agentsurface/docs` | Guide to making websites, APIs and CLIs work with AI agents | https://agentsurface.dev/mcp |
| `dev.ahmedshaikh/blog` | Blog posts on AI, cybersecurity, data breaches and tech tools | https://ahmedshaikh.dev/mcp |
| `dev.aieph/aieph` | Shared cache of programming errors, library answers and fixes | https://aieph.dev/mcp |
| `dev.appnavi/appnavi` | Indie and small-team apps, their developers and ratings | https://appnavi.dev/mcp |
| `dev.bitbybit/cad` | Bitbybit 3D parametric CAD API reference and examples | https://mcp.bitbybit.dev/mcp |
| `dev.botshelf/bot-shelf` | Community Grok Bots catalog searchable by task | https://mcp.botshelf.dev/mcp |
| `dev.brokeit/news` | Hands-on AI engineering blog posts and podcast episodes | https://brokeit.dev/mcp |
| `dev.carbonitex.ecogame/ecocarbonwiki` | Eco game wiki: items, recipes, skills, crafting materials | https://ecogame.carbonitex.dev/mcp |
| `dev.chinng-lab-srv/portal` | News articles, CVE advisories, government documents, agent-ready websites | https://portal.chinng-lab-srv.dev/mcp |
| `dev.classifier/docs` | classifier.dev API reference, benchmarks and guides | https://classifier.dev/mcp/docs |
| `dev.codenation/codenation` | Curated developer and SaaS tools with checked pricing | https://www.codenation.dev/api/mcp |
| `dev.ctlogs/certificate-transparency` | TLS certificates, subdomains and CAs from Certificate Transparency logs | https://mcp.ctlogs.dev/mcp |
| `dev.cz-agents/ares` | Czech and Slovak company registry records, owners and VAT status | https://ares.cz-agents.dev/mcp |
| `dev.cz-agents/eu-registry` | EU company registry records and VAT validation across 16 countries | https://eu-registry.cz-agents.dev/mcp |
| `dev.developmentradio/development-radio` | Podcast episodes, transcripts and guides on AI, security, software | https://developmentradio.dev/mcp |
| `dev.devplane/devplane-site` | DevPlane docs, FAQ and comparisons on multi-agent orchestration | https://devplane.dev/api/mcp |
| `dev.eased/eased` | Eased motion-first React components for shadcn with docs | https://eased.dev/api/mcp |
| `dev.farmjs/docs` | Farm.js documentation, code examples and config options | https://mcp.farmjs.dev/mcp |
| `dev.fencer/intel` | Merged CVE, GHSA and OSV vulnerability advisories | https://intel.fencer.dev/mcp |
| `dev.foundry44/components` | Animated UI component library with install steps for any stack | https://foundry44.dev/mcp |
| `dev.frontmcp.mcp/frontmcp` | FrontMCP framework docs, APIs, examples and upgrade guides | https://mcp.frontmcp.dev/ |
| `dev.getbureau/about` | Bureau self-hosted AI agent office: FAQ, roadmap and install steps | https://www.getbureau.dev/mcp |
| `dev.getwork/jobs` | Developer jobs by stack, level, remote and salary insights | https://getwork.dev/mcp |
| `dev.gstars/gstars` | GitHub repository stars, growth trends and health | https://www.gstars.dev/api/mcp |
| `dev.gstars/gstars-docs` | GStars methodology, API guide, MCP setup and policies | https://www.gstars.dev/api/mcp/docs |
| `dev.ioconnex/search-mcp` | Web search results and page text | https://search.ioconnex.dev/mcp |
| `dev.launchdog/public` | Product launches, past winners and upcoming launch weeks on Launchdog | https://launchdog.dev/mcp/public |
| `dev.liro/liro` | Liro React and Tailwind UI components, templates and usage docs | https://liro.dev/api/mcp |
| `dev.mcpnav/directory` | Directory of MCP servers with install configs | https://mcp.mcpnav.dev/mcp |
| `dev.modelmarket/emporion` | EU VAT, EORI, LEI, sanctions, company and ECB rate lookups | https://modelmarket.dev/tools/mcp/emporion |
| `dev.mojourney/census` | Public Mojo language repositories, versions and ecosystem growth | https://mojourney.dev/mcp |
| `dev.morningfold/brief` | Summarized developer news, trending open-source projects from recent weeks | https://morningfold.dev/mcp |
| `dev.ndekocode.ui/ndekoui` | ndekoui React components, blocks, templates and design guidelines | https://ui.ndekocode.dev/mcp |
| `dev.nexteleven/durable-agent-directory` | Agent tool listings compared on durability criteria | https://agents.nexteleven.dev/api/mcp |
| `dev.openplanr/docs` | OpenPlanr documentation and course pages | https://openplanr.dev/docs/mcp |
| `dev.pages.canmyaiuse/mcp` | Live public MCP servers by need, auth and status, per app | https://canmyaiuse.pages.dev/mcp |
| `dev.pages.ifta-calculator/ifta` | US and Canadian IFTA fuel-tax rules, rates and quarterly estimates | https://ifta-calculator.pages.dev/mcp |
| `dev.pages.jp-election-mcp/jp-election-discovery` | Japanese election data and official source routes | https://jp-election-mcp.pages.dev/mcp |
| `dev.pages.livedproof/livedproof` | Pricing page links and facts for 60 software and AI tools | https://livedproof.pages.dev/mcp |
| `dev.plugandship/plugandship-mcp` | MCP servers, agent skills and coding-agent plugins with trending lists | https://plugandship.dev/mcp |
| `dev.plugrail/jp-corporate` | Japanese corporate numbers and invoice registration status | https://jp-corporate.plugrail.dev/mcp |
| `dev.plugrail/jp-nutrition` | Japanese food composition and nutrition facts | https://jp-nutrition.plugrail.dev/mcp |
| `dev.plugrail/jp-recall` | Japanese consumer product recalls from Consumer Affairs Agency | https://jp-recall.plugrail.dev/mcp |
| `dev.promplate/hmr` | Python hmr hot reload library docs, source and tests | https://pyth-on-line.promplate.dev/hmr/mcp |
| `dev.pydantic/model-registry` | LLM prices, benchmarks, context windows and Pydantic AI model strings | https://models.pydantic.dev/mcp |
| `dev.q4a/board` | Questions and answers posted by AI agents | https://q4a.dev/mcp |
| `dev.refnusa/refnusa` | Indonesia holidays, minimum wages, regions, postal codes, tax and statistics | https://refnusa.dev/mcp |
| `dev.remocn/remocn` | Remocn Remotion video components and their documentation | https://remocn.dev/mcp |
| `dev.rmcp/rmcp` | Index of remote MCP servers and their tools | https://rmcp.dev/mcp |
| `dev.rossdata/data-dictionary` | Ross ERP 8.0 database schema, menus and program catalog | https://mcp.rossdata.dev/mcp |
| `dev.rosti/rosti` | Threat-intel reports, IOCs, YARA rules, MITRE ATT&CK and CVEs | https://mcp.rosti.dev/mcp |
| `dev.shirabe/hub` | Japanese calendar, address normalization and corporate number registry data | https://shirabe.dev/mcp |
| `dev.sipflow/sipflow` | SIP, VoIP and telecom docs, RFCs, response codes and headers | https://mcp.sipflow.dev/mcp |
| `dev.sitemcp/site-mcp` | Pages of a public website searchable and readable | https://sitemcp.dev/sitemcp.dev |
| `dev.skillagent/skills` | AI agent skills, rules files and MCP servers indexed from GitHub | https://skillagent.dev/mcp |
| `dev.skillu/skillu` | Catalog of curated agent skills for automation, 3D, media | https://skillu.dev/mcp |
| `dev.spritefetch/spritefetch` | Free CC0 2D sprite sheets and tilesets for games | https://api.spritefetch.dev/mcp |
| `dev.stackmark/stackmark` | Directory of MCP servers, agents, models, datasets and prompts | https://stackmark.dev/mcp |
| `dev.starwell/world-data-statistics` | Official statistics from FRED, Eurostat, ECB, World Bank and OECD | https://starwell.dev/api/starwell/mcp |
| `dev.steadyscrape/ads-intel` | Google Ads Transparency advertisers and top TikTok ads | https://mcp.steadyscrape.dev/ads/mcp |
| `dev.steadyscrape/jobs-data` | Live job postings from company career boards, including remote roles | https://mcp.steadyscrape.dev/jobs/mcp |
| `dev.stepcode/stepcode` | How-to pages for data analyses by tool | https://stepcode.dev/api/mcp |
| `dev.stitchapi/docs` | StitchAPI documentation | https://stitchapi.dev/api/mcp |
| `dev.suzuri/mcp` | Japan government white papers on policy and national statistics | https://suzuri.dev/mcp |
| `dev.svelte/mcp` | Official Svelte 5 and SvelteKit documentation | https://mcp.svelte.dev/mcp |
| `dev.swiftskills/catalog` | Agent skills, MCP servers and rules for Swift and iOS development | https://swiftskills.dev/mcp |
| `dev.toolpin/toolpin` | MCP server reachability, advertised tools and tool definition changes | https://toolpin.dev/mcp |
| `dev.turbostarter/docs` | TurboStarter starter kit documentation | https://www.turbostarter.dev/mcp |
| `dev.urantia/urantia-papers` | Urantia Papers text, Bible and religious texts with cross-references | https://api.urantia.dev/mcp |
| `dev.workers.aruljoe37.kisukisu/kisukisu` | Public Kisukisu discussion posts, comments and trending topics | https://kisukisu.aruljoe37.workers.dev/mcp |
| `dev.workers.bhazarstudio.datoqa/historical-exchange-rates` | ECB historical daily exchange rates since 1999 with source evidence | https://datoqa.bhazarstudio.workers.dev/mcp/fx |
| `dev.workers.cybermax-tools.cybermax/commonkite` | Openly licensed and public-domain images with license and credit lines | https://commonkite.cybermaxtools.com/mcp?via=mcp-registry |
| `dev.workers.cybermax-tools.cybermax/dutyfinch-chatgpt` | US HTS tariff codes, duty rates and Section 301 China status | https://gpt-dutyfinch.cybermaxtools.com/mcp?via=mcp-registry |
| `dev.workers.flowfresh.ff-sa-fruit-data/sa-fruit-reference-data` | South African export fruit seasons, specs and destination market access | https://ff-sa-fruit-data.flowfresh.workers.dev/mcp |
| `dev.workers.mnpi.place-lookup/place-lookup` | Postal codes and their places and administrative regions, 124 countries | https://place-lookup.at01.io/mcp |
| `dev.workers.rasczak-commons.rasczak-agent-service/agent-service` | Free decision methods and vendor-evaluation work packs | https://rasczak-agent-service.rasczak-commons.workers.dev/mcp |
| `dev.workers.slawian.agent-commons/agent-commons` | Public agent questions and sourced findings from Agent Commons | https://agent-commons.slawian.workers.dev/mcp |
| `dev.workers.waitlab.imashime/imashime` | Lessons from AI assistant mistakes with better prompting examples | https://imashime.waitlab.workers.dev/mcp |
| `dev.wraps/docs` | Wraps documentation for email on AWS SES | https://wraps.dev/mcp |
| `digital.creativecult/research` | Player reception of new video games, release calendars, rankings | https://creativecult.digital/mcp |
| `directory.neeed/listings` | Software product listings by category, pricing and description | https://neeed.directory/api/mcp |
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
| `es.fortsu/mcp` | Running shoe specs and price history in Spain | https://www.fortsu.es/mcp |
| `estate.cubi/cubi-properties` | European homes for sale or rent, prices and history | https://mcp.cubi.estate/mcp |
| `estate.guthmann/mcp` | Berlin boroughs, neighborhoods and real estate market data | https://mcp.guthmann.estate/mcp |
| `eu.aspanel/product-catalog` | Building materials product specs and PLN prices | https://aspanel.eu/wp-json/site-ai/v1/mcp |
| `eu.casanest/catalogue` | Portugal property listings and INE housing price statistics | https://casanest.eu/mcp |
| `eu.cuttingtoolsai/reference` | Carbide insert grade and material cross-references, turning speeds and feeds | https://cuttingtoolsai.eu/mcp |
| `eu.cuttingtoolsai/xref` | Cross-brand carbide grade equivalents from manufacturer charts | https://cuttingtoolsai-mcp.memmizgezgin.workers.dev |
| `eu.gamedeal/public` | PC game store offers and recorded price history | https://gamedeal.eu/api/mcp |
| `eu.icos-cp/icos` | ICOS greenhouse-gas observations from atmosphere, ocean and ecosystem stations | https://mcp.icos-cp.eu/mcp |
| `eu.izoprofil.www/product-catalog` | Building materials product specs and PLN prices | https://www.izoprofil.eu/wp-json/site-ai/v1/mcp |
| `eu.janbrennenstuhl/site` | Essays on application security, identity and agent identity | https://mcp.janbrennenstuhl.eu/mcp |
| `eu.madeinro/rotv-mcp` | Romanian TV channel listings, prime time and program search | https://tv.madeinro.eu/mcp |
| `eu.modulit/pro-av-finder` | Pro AV equipment products, specs, guides and compatibility | https://www.modulit.eu/mcp |
| `eu.muralists/directory` | European muralists, street artists and their murals by location and style | https://mcp.muralists.eu/mcp |
| `eu.novamx/public` | NovaMX email hosting guides, prices and email security research | https://novamx.eu/mcp |
| `eu.obato/obato-mcp` | Boats for sale or rent in Europe, marinas and boat market pricing | https://obato.eu/mcp |
| `eu.regulatoryai/sovereign-ai-act-mcp` | EU AI Act articles, risk classification and compliance deadlines | https://www.regulatoryai.eu/mcp |
| `eu.sandwich-panel.www/product-catalog` | Sandwich panel building materials specs and PLN prices | https://www.sandwich-panel.eu/wp-json/site-ai/v1/mcp |
| `eu.sbc-international/belgian-company-data` | Belgian company registry KBO/BCE data and Peppol registration status | https://mcp.sbc-international.eu/mcp |
| `eu.scopematch/labs` | Accredited testing labs and their scope by standard | https://scopematch.eu/mcp |
| `eu.tech.funding/funding-explorer` | European tech funding rounds, companies, investors and exits | https://funding.tech.eu/api/mcp |
| `eu.vokko/vokko` | Which web hosts support MCP, x402 and other agent protocols | https://www.vokko.eu/api/v1/mcp |
| `eu.voxs/voxcars-pt` | Portugal used-car listings, price statistics and market articles | https://www.voxcars.pt/api/mcp |
| `eu.voxs/voxhouses-pt` | Portugal property listings, market statistics and neighbourhood guides | https://www.voxhouses.pt/api/mcp |
| `eu.voxs/voxjobs-pt` | Portugal job listings, salary statistics and employers | https://www.voxjobs.pt/api/mcp |
| `events.cre/cre-events` | Commercial real estate conferences 2026-2027: dates, prices, deadlines | https://cre.events/mcp |
| `events.long/long-events` | Events, conference weeks, venues and DJ artist schedules | https://long.events/functions/v1/mcp-server/mcp |
| `events.thisweekend/this-weekend` | Festivals, shows and exhibitions in South Korea by date | https://thisweekend.events/mcp |
| `expert.abn.mcp/abn-gst` | Australian business ABN and GST registration records | https://mcp.abn.expert/mcp |
| `expert.ptl/knowledge` | PTL services, case studies and professional evidence from its websites | https://mcp.ptl.expert/mcp |
| `fi.sukuk/sukukfi` | SukukFi vault metrics, contracts and documentation | https://mcp.sukuk.fi/mcp |
| `film.mcp/directory` | MCP servers for AI filmmaking with install configs and capabilities | https://mcp.film/mcp |
| `finance.marx/marx-finance` | Market news, ticker catalysts, agent analysis and swarm sentiment | https://marx.finance/mcp |
| `food.strega/strega` | Recipes with ingredient amounts, scalable servings and diets | https://strega.food/mcp |
| `foundation.finance/finance-foundation` | Financial entities with LEI, ISIN, FIGI identifiers, markets, funds and graph | https://finance.foundation/mcp |
| `fr.bestwestern.mcp-hotel/hotels` | Best Western hotel descriptions, addresses, amenities and photos | https://mcp-hotel.bestwestern.fr/mcp |
| `fr.carhunt/carhunt` | French used-car listings across marketplaces, price estimates and market stats | https://api.carhunt.fr/mcp |
| `fr.heavenpc/baies-informatiques` | Server rack models, specs and buying guides | https://heavenpc.fr/mcp |
| `fr.kitchenwatt/robots-de-cuisine` | Food processor models, specs and buying guides | https://kitchenwatt.fr/mcp |
| `fr.miramo/mcp` | French rental law, rent caps, notices, deposits, lease rules | https://mcp.miramo.fr/mcp |
| `fr.missionmuseaux/annonces` | Lost and found pets, adoptions, shelters and breeds in France | https://missionmuseaux.fr/mcp |
| `fr.saasradar/saas-radar` | Reviews of SaaS tools for French-speaking small businesses | https://www.saasradar.fr/mcp |
| `fr.symone/symone-docs` | SYMONE documentation: service, prices, public API and MCP servers | https://symone.fr/docs/mcp |
| `fr.woodroar/tronconneuses` | Chainsaw models, specs and buying guides | https://woodroar.fr/mcp |
| `fr.yardrider/tondeuses` | Lawn mower models, specs and buying guides | https://yardrider.fr/mcp |
| `fun.film.splice/splice-docs` | Splice agent docs, models, prices and templates | https://splice.film.fun/api/mcp/docs |
| `fyi.bsp/bot-space` | Bot-written fixes, wiki and forum threads shared among AI agents | https://bsp.fyi/mcp |
| `fyi.clearmarket/clearmarket` | Prediction market events, resolution clarity and cross-venue links | https://api.clearmarket.fyi/mcp |
| `fyi.levels/levels-fyi` | Tech salary, level and compensation data by company and role | https://mcp.levels.fyi/ |
| `games.markan/markan` | Steam game data, prices, tags and sales estimates | https://api.markan.games/mcp |
| `garden.lexicon/lexicon-garden` | AT Protocol lexicon schemas and their definitions | https://lexicon.garden/mcp |
| `garden.stanislav.svelte-llm/svelte-llm-mcp` | Svelte 5 and SvelteKit documentation sections | https://svelte-llm.stanislav.garden/mcp/mcp |
| `gg.agnt/agnt` | AI agent skills, MCP servers, tool shutdowns and guides | https://agnt.gg/mcp |
| `gg.cassette/find` | Browser games on Cassette with genres and details | https://cassette.gg/mcp |
| `gg.dinogame/games` | Free browser games and Chrome Dino gaming guides | https://dinogame.gg/mcp |
| `gg.keyfinder/price-lookup` | Cheapest game key and gift card prices across key shops | https://www.keyfinder.gg/api/price-lookup |
| `gift.dhamma/pali-canon` | Pāli Canon texts with English and Russian translations, dictionary | https://api.dhamma.gift/mcp |
| `glass.cocktail/cocktail-glass` | 500 cocktail recipes searchable by name and ingredient | https://cocktail.glass/mcp |
| `global.insurers/directory` | Licensed insurers worldwide by country, class, group and regulator | https://insurers.global/mcp |
| `goog.workspace-developer/developer-tools` | Official Google Workspace developer documentation | https://workspace-developer.goog/mcp |
| `gr.jobily/jobs` | Greek job listings by role, location, sector and company | https://jobily.gr/mcp |
| `gr.minedo/minedo` | Rental homes for teachers near Greek schools | https://www.minedo.gr/api/mcp |
| `group.tcc/website` | TCC Group published insights, case studies, documents and team profiles | https://mcp.tcc.group |
| `guru.myproduct/product-lookup` | Product attributes by barcode and official government recall notices | https://myproduct.guru/mcp |
| `health.myaidoctor/myaidoctor` | Supplement facts: uses, typical doses, upper limits, regulatory status | https://myaidoctor.health/mcp |
| `help.woodpecker/nyc-hpd` | NYC building HPD registration status, violations and filing rules | https://woodpecker.help/mcp |
| `homes.socials/socials-homes-docs` | Socials Homes FAQ, pricing and housing guides for moving abroad | https://www.socials.homes/mcp/docs |
| `host.beacon.worker.realgeeks-company-api/company-registry` | Official company register records for France, Norway, Finland, US SEC | https://realgeeks-company-api.worker.beacon.host/mcp |
| `host.visor/visor` | Visor AI chat ad network facts and documentation | https://mcp.visor.host/mcp |
| `hr.inmar/business-knowledge` | INMAR services, projects and business information | https://inmar.hr/mcp |
| `hu.myio/docs` | myIO smart home manual, API reference and FAQ | https://docs-mcp.myio.hu/mcp |
| `hu.traintrack/railway` | Live Hungarian train positions, delays and rolling stock | https://traintrack.hu/mcp |
| `id.walt/docs` | walt.id digital identity Community and Enterprise Stack documentation | https://docs.walt.id/mcp |
| `il.co.checko/docs` | Hebrew travel insurance guides and FAQ | https://checko.co.il/mcp/docs |
| `il.co.deali/mcp` | AliExpress deals, coupons and Hebrew shopping guides for Israelis | https://www.deali.co.il/mcp |
| `il.co.finly/public-knowledge` | Israeli mortgage knowledge with sources and guides | https://finly.co.il/mcp |
| `il.co.foodiepedia/prices` | Grocery prices by barcode across Israeli supermarket chains | https://foodiepedia.co.il/api/mcp/ |
| `il.co.makore.www/makore` | Upcoming public events in Israel by date, city and category | https://www.makore.co.il/api/mcp |
| `il.co.mamachoice/guides` | Hebrew baby product buying guides | https://mamachoice-mcp.ohadf1976.workers.dev/mcp |
| `il.co.narabotu/narabotu` | Israeli job vacancies, salary stats and labour law rules | https://narabotu.co.il/api/v1/mcp |
| `il.co.sabag3d/studio` | Sabag 3D Studio services, past projects, products and FAQ | https://sabag3d.co.il/mcp |
| `in.amomic/docs` | Amomic-AI documentation and REST API reference | https://docs.amomic.in/mcp |
| `in.co.buildwright/compliance` | Indian company filing deadlines, MCA late fees, company and SEBI registers | https://buildwright.co.in/api/mcp |
| `in.dalalos/mcp` | Indian listed company financials, filings, prices, ownership and market data | https://mcp.dalalos.in/mcp |
| `in.nebulatech/nebula` | Nebula B2B digital marketing agency services, sectors and blog articles | https://www.nebulatech.in/_functions/mcp |
| `in.sambodh-ias/upsc-prep` | UPSC study material, previous-year questions and current affairs | https://api.sambodh-ias.in/mcp |
| `in.therapistsnearme/directory` | Credential-verified therapists in India by specialty | https://mcp.therapistsnearme.in/api/mcp |
| `inc.arca/life-sciences` | PubMed papers, FDA drug and device records, clinical trials | https://app.arca.inc/api/public/mcp |
| `info.astroway/docs` | AstroWay API guides, endpoints and credit prices | https://mcp.astroway.info/mcp/docs |
| `info.henryknows/henryknows` | F-1 and J-1 student immigration rules with citations | https://henryknows.info/mcp |
| `info.vetclinic/directory` | US veterinary specialty clinics, procedure articles and cost estimates | https://vetclinic.info/mcp |
| `info.workingproxysites/provider-directory` | Proxy providers, published prices and MCP integrations | https://workingproxysites.info/api/mcp |
| `ink.loreboard/loreboard` | Curated Disney Lorcana trading card game resources and change history | https://loreboard.ink/mcp |
| `insure.spot/insurance-research` | Commercial insurance provider comparisons, reviews and requirements | https://spot.insure/mcp |
| `investments.stein/mcp` | Market state classifications, economic calendar and trading research | https://stein.investments/mcp |
| `io.1322/docs` | 1322 social and news monitoring API technical reference | https://1322.io/mcp |
| `io.4dayweek/jobs` | Reduced-hours jobs and employers: four-day weeks and flexible schedules | https://4dayweek.io/api/mcp |
| `io.agentage/find-mcp` | Directory of 17,000 MCP servers with trust grades | https://catalog.agentage.io/mcp |
| `io.agentropolis/agentropolis` | Directory of MCP servers, x402 APIs and A2A agents | https://agentropolis.io/api/mcp |
| `io.arxo/cnaf` | French family benefit rules from CNAF with sources | https://mcp.arxo.io/mcp/cnaf |
| `io.arxo/fide-chess` | FIDE Laws of Chess 2023 rules answered with grounds and source text | https://mcp.arxo.io/mcp/fide-chess |
| `io.at01.api/lookup` | Indian PIN codes to districts; US, UK, AU, CA public holidays | https://api.at01.io/mcp |
| `io.aviationresources/aviation-resources` | FAA handbooks, advisory circulars and airman certification standards | https://api.aviationresources.io/mcp |
| `io.banksapi/docs` | BANKSapi open banking developer docs and OpenAPI specs | https://banksapi.io/docs-mcp |
| `io.blockrazor/docs` | BlockRazor documentation and API references for transaction submission | https://mcp.blockrazor.io/docs |
| `io.capawesome/capacitor-mcp` | Capacitor documentation, plugin list and blog posts | https://capacitor-mcp.capawesome.io/mcp |
| `io.capawesome/ionic-framework-mcp` | Ionic Framework documentation, components, usage examples and blog posts | https://ionic-framework-mcp.capawesome.io/mcp |
| `io.capawesome/mcp` | Capawesome documentation, guides and blog | https://mcp.capawesome.io/mcp |
| `io.carchat/inventory` | Live US dealership car inventory and market price statistics | https://carchat.io/mcp |
| `io.cbgc/partners` | Christian Background Checks partner API docs, errors and webhooks | https://partners.cbgc.io/mcp |
| `io.christiantechjobs/jobs` | Current job listings on Christian Tech Jobs | https://www.christiantechjobs.io/api/mcp |
| `io.ddx.pg/archive` | PostgreSQL mailing lists, commits, source code, commitfest, docs and wiki | https://pg.ddx.io/mcp |
| `io.dealscanner/dealscanner` | Real estate investment deals, sold comps and top investing areas | https://mcp.dealscanner.io/mcp |
| `io.developerhub/docs` | DeveloperHub documentation and API reference | https://docs.developerhub.io/mcp |
| `io.disdex/discord-servers` | Public Discord servers by topic, language, size and growth | https://disdex.io/mcp |
| `io.drint/drict` | Product label legal requirements across many countries | https://drint.io/drict/mcp |
| `io.eccasion.portal/cars` | Used cars for sale or auction on Dutch platform Eccasion | https://portal.eccasion.io/mcp |
| `io.ecfr/ecfr` | US Code of Federal Regulations text with citations | https://ecfr.io/mcp |
| `io.ecfr/uscode` | US Code federal statutes text with citations | https://uscode.ecfr.io/mcp |
| `io.foodsafetydata/usda-establishments` | USDA meat and poultry plants, Salmonella categories, recalls | https://foodsafetydata-api.onrender.com/mcp |
| `io.forthmatch/3pl-directory` | Directory of 3PL fulfillment providers, services and warehouse locations | https://forthmatch.io/mcp |
| `io.founderventures/founder-ventures` | Bootstrapped B2B SaaS playbooks, case studies, research and founder events | https://founderventures.io/api/mcp |
| `io.foundplay/foundplay` | Catalog of free browser games by genre and platform | https://foundplay.io/mcp |
| `io.fusionauth/mcp-docs` | FusionAuth documentation and technical answers | https://ai.fusionauth.dev/mcp/docs |
| `io.github.0design/qfactory` | Verified catalog of agent workflows and components with schemas | https://qfactory.io/api/mcp |
| `io.github.0xkayser/vaultvision` | Hyperliquid vault records, risk scores, rankings and TVL | https://vaultvision.tech/mcp |
| `io.github.1nzpainter/painting-lessons` | Transcribed painting lessons with video timestamps | https://mypaintingclub.com/kb/mcp |
| `io.github.2016judea/marginalia-corpus` | What famous readers marked and wrote in their books' margins | https://marginalia-corpus.vercel.app/mcp |
| `io.github.99darwin/nexus` | Deduplicated AI industry news by vertical and event type | https://nexus.carapace.bot/mcp |
| `io.github.aadarshvelu/hirehouse-mcp` | Live public job listings on HireHouse | https://hirehouse.xyz/mcp |
| `io.github.aanari/loacare-healthcare-pricing` | US hospital prices, CPT codes, providers and cost estimates | https://www.loacare.com/api/mcp |
| `io.github.abasmartinc/apiempresas` | Spanish company registry records, tax ID status, BORME statistics | https://apiempresas.es/api/mcp |
| `io.github.ABGI-Ltd/orkero` | Orkero healthcare practice API documentation and endpoint reference | https://mcp.orkero.app/mcp |
| `io.github.ABTdomain/domainkits-mcp` | Registered, expired, aged and for-sale domains, WHOIS, DNS and backlinks | https://api.domainkits.com/v1/mcp |
| `io.github.ADahling/builders-prompt-library` | Graded AI prompts for software builders by delivery stage | https://buildersprompt.com/mcp |
| `io.github.adpadinc/brinkeradvisor-moneytalk-archive` | Moneytalk radio clip topics and dates through September 2018 | https://mcp.brinkeradvisor.com/mcp/audio |
| `io.github.adpadinc/brinkeradvisor-reading-guide` | Investing book metadata and BrinkerAdvisor reading paths | https://mcp.brinkeradvisor.com/mcp/books |
| `io.github.AdrianStauffer/copilot-studio-friction-index` | Copilot Studio errors, known issues and cited fixes | https://pcghrrzwqshejvifoxjq.supabase.co/functions/v1/friction-mcp |
| `io.github.agentcitylabs/gmgn-robinhood-mcp` | Robinhood Chain token launches, trending tokens and due diligence data | https://gmgn.agentcity.lol/mcp |
| `io.github.agentsherpa/yieldhunter` | Risk-adjusted stablecoin yield rankings and protocol risk on Ethereum, Base, Arbitrum | https://yieldhunter-agent-production.up.railway.app/mcp |
| `io.github.agentstructure/clinical` | ClinicalTrials.gov and EU trial records, plus FDA approvals and recalls | https://clinicaltracker.org/mcp/public |
| `io.github.agentstructure/fedreg` | US Federal Register rules, notices, comment deadlines and rulemaking timelines | https://fedregtracker.com/mcp |
| `io.github.agentstructure/local-events` | Upcoming local concerts, shows and sports events with change alerts | https://localeventstracker.com/mcp |
| `io.github.agentstructure/realty` | US homes for sale or rent with property details and price history | https://realty.bingo/mcp |
| `io.github.AgentTwin/agenttwin-docs` | AgentTwin agent testing guides, CLI commands and service contracts | https://agenttwin.si/mcp/docs |
| `io.github.ahmed-suman/nextjobz-job-search` | Job listings on NextJobz by keyword, location, salary and experience | https://mcp.nextjobz.com.bd/mcp |
| `io.github.ahmedaminsa/aljazeera360-mcp-server` | Al Jazeera 360 Arabic shows, documentaries and podcasts | https://aljazeera360-mcp.ahmed-26d.workers.dev/mcp |
| `io.github.AI-Chili/onlychili` | OnlyChili AI-generated video series, short dramas and creator channels | https://onlychili.aichili.ai/mcp |
| `io.github.Airpote/avalanche-docs` | Avalanche blockchain documentation, RPC methods and community proposals | https://build.avax.network/api/mcp |
| `io.github.aiwget/aiwget-mcp` | Curated B2B AI tools, MCP servers, APIs and comparison guides | https://aiwget.com/api/mcp |
| `io.github.AjnasNB/skilldash` | Source-pinned agent skills, plugins and tools catalog | https://skills.maqamagent.com/mcp |
| `io.github.ALDEBERTArnaud/mcp-rncp` | French RNCP and RS professional certifications, skill blocks and habilitation | https://mcp-rncp.com/mcp |
| `io.github.algorerthym/agent-commons` | Help desk tickets and answers from AI agents | https://www.agentscommons.io/mcp/read |
| `io.github.alicelabs-llc/marketnow` | Catalog of 70,000 MCP servers with install-risk scoring | https://marketnow.site/api/mcp |
| `io.github.AllegroMoltoV/audio-plugin-soko-kun` | Open-source VST3, CLAP, LV2 and AU audio plugins | https://audio-soko-kun.allegromoltov.jp/mcp |
| `io.github.AllegroMoltoV/plugin-soko-kun` | Third-party OBS Studio plugins with details and downloads | https://soko-kun.allegromoltov.jp/mcp |
| `io.github.allooloo/getresearch` | Record-based research pages on listed companies by ticker, ISIN, LEI | https://mcp.getresearch.ai/mcp |
| `io.github.altss-data/docs` | Altss public data and agent documentation | https://docs.altss.com/mcp |
| `io.github.altss-data/public-profiles` | Published Altss organization profile summaries with citations | https://altss.com/mcp |
| `io.github.AM-Digital-Research-Environment/amira-mcp-server` | Africa Multiple research items, publications, projects, podcasts and people | https://data.africamultiple.uni-bayreuth.de/mcp |
| `io.github.amakkar-leap/convergent-provider-directory` | Healthcare providers by name, specialty and city | https://convergent-mcp-dummy.livelycoast-4be0cd2b.eastus2.azurecontainerapps.io/mcp |
| `io.github.amcharts/amcharts5` | amCharts 5 documentation, code examples and API reference | https://mcp.amcharts.com/mcp |
| `io.github.amirdaraee/luxembourg-mcp` | Luxembourg open data, laws, statistics, geodata and weather alerts | https://mcp.luxembourg-mcp.com/mcp |
| `io.github.AnastasiyaW/diffusion-love-knowledge` | Diffusion model knowledge, tooling and project news | https://diffusion.love/mcp |
| `io.github.AndrewVG23/nutrition-mcp` | USDA FoodData Central nutrients, ingredients and macros for foods | https://docuslide-mcp-production.up.railway.app/mcp |
| `io.github.angelnikolov/remote-jobs` | Live remote developer jobs, salaries and hiring companies | https://www.remotefrontendjobs.com/mcp |
| `io.github.Anon2052/search-mcp` | Web search results and page text | https://search-mcp-tgsn.onrender.com/mcp/ |
| `io.github.anousss007/ng-blatui` | ng-blatui Angular components, blocks, charts, templates and typed APIs | https://ngblatui.remix-it.com/mcp |
| `io.github.ant588362/yarrow` | Fixes other coding agents found for errors | https://yarrow-fixes.vercel.app/mcp |
| `io.github.apollographql/graphos-mcp-server` | Apollo GraphQL documentation, Connectors spec and best practices | https://mcp.apollographql.com |
| `io.github.arach/agentlist` | Catalog of AI agents and MCP servers with sourced profiles | https://mcp.agentlist.io/?listing=registry |
| `io.github.arhancanli/canli-research-mcp` | Canli Capital trading research papers, failed strategies and live record | https://canlicapital.com/mcp/research |
| `io.github.ArneFfm/animal-checklist` | Animal species in eight languages with habitats, countries and photos | https://animalchecklist.com/mcp |
| `io.github.ArneFfm/ecoaloha` | Reviewed outdoor tours and experiences by destination and collection | https://ecoaloha.com/mcp |
| `io.github.ArneFfm/nowyourlink-docs` | nowyourlink developer documentation: API, authentication, versioning, privacy | https://nowyourlink.com/mcp/docs |
| `io.github.ArpitGandhi1934/yugenox-jobs` | Open job postings, employer hiring trends and posted salary ranges | https://jobs.yugenox.com/mcp |
| `io.github.arseniigruzdev/llmsmap` | Directory of sites publishing llms.txt files | https://llmsmap.me/api/mcp/ |
| `io.github.AshutoshRaj97/agentready-mcp` | Cited answers from any indexed documentation website | https://www.agentready.it.com/api/mcp |
| `io.github.Ask-Cyborg/askcyborg-mcp` | Analyst research reports, scores and competitors for companies | https://mcp.askcyborg.com/mcp |
| `io.github.asrplv/ailibri` | Catalog of 3000+ AI tools with pricing and availability in Russia | https://mcp.ailibri.com/mcp |
| `io.github.assafbar2/agentswitchboard` | Directory of AI agents, MCP servers and agentic tools | https://agentswitchboard.dev/api/mcp |
| `io.github.assetgrid-llc/jueban-buddhist-companion` | Buddhist scripture passages with explanations and practice guidance | https://jueban.online/mcp |
| `io.github.asturksever/agentic-house-search` | UK neighbourhood data by postcode from government open datasets | https://agentic-house-search.vercel.app/mcp |
| `io.github.AtlasDigitalDesign/intertwine-plans` | Coastal house plans by beds, size, lot width, features | https://agents.intertwinehouseplans.com/mcp |
| `io.github.atomno-mcp/mcp-catalog` | Directory of MCP servers in the Russian mcp-catalog.ru | https://mcp-catalog.ru/mcp |
| `io.github.awesome-aeco/awesome-aeco-mcp` | Open-source AECO tools for BIM, IFC, CAD and simulation | https://mcp.awesome-aeco.org/mcp |
| `io.github.ayers-software-repair/lancelot` | Documents stored in a local LanceDB vector database | https://mcp.ayers.repair/lancelot |
| `io.github.AyodejiOO/plain-ayi` | Plain-English guide to open-source AI projects, cost, privacy | https://plain-ayi.com/mcp |
| `io.github.balkanpilot/eu-tender-intelligence` | EU public tenders from official TED procurement notices | https://eu-tender-intelligence.balkanpilot.workers.dev/mcp |
| `io.github.balthasarspeyr/catalogue` | Works and texts of Hans Urs von Balthasar and Adrienne von Speyr | https://mcp.balthasarspeyr.org/mcp |
| `io.github.bauerpawel/dockyard` | 600+ Docker and Portainer app templates with deploy instructions | https://dockyard.kim1.ovh/mcp |
| `io.github.BCXTRUST/kyma-frequency-mcp` | KYMA frequency library, Rife machine and PEMF guides and FAQs | https://eaqistzhmblvuxndwfbn.supabase.co/functions/v1/freq-mcp |
| `io.github.beepboop2025/financial-evidence-workspace` | Cited financial datasets on funding, institutions and BTC exit | https://agents.seiche.info/products/financial-evidence/mcp |
| `io.github.beepboop2025/liquilens` | Indian banks and lenders filings, asset quality, RBI supervisory actions | https://api.liquilens.in/mcp |
| `io.github.beepboop2025/seiche-market-corpus` | BIS statistics and money-market observation datasets | https://agents.seiche.info/products/seiche-market-corpus/mcp |
| `io.github.bennekrouf/mayorana` | Mayorana desktop apps, release notes, plans, and Rust, LLM, Azure articles | https://mayorana.ch/mcp |
| `io.github.benno303/ndis-provider-feed` | Registered NDIS providers by location and service category | https://ndis-provider-feed-125475360011.australia-southeast1.run.app/mcp |
| `io.github.bestofgolang/bestofgo` | Go GitHub repositories ranked by stars, trends, topics | https://bestofgo.dev/mcp |
| `io.github.bg7iuy/china-phone` | Carrier, province and city for Chinese mobile number prefixes | https://china-phone-mcp.vercel.app/api/index |
| `io.github.bguillow-rgb/percolate` | Specialty coffees with flavor profiles, brew recipes and pairings | https://mcp.percolateapp.com/?src=registry |
| `io.github.bguillow-rgb/perfume-picks` | Fragrance notes, dupes, similar scents and wear data for 10,000+ perfumes | https://mcp.perfumepicks.app/?src=registry |
| `io.github.bguillow-rgb/pour-picks` | Bourbon and whiskey bottles with tasting profiles and prices | https://mcp.pourpicks.app/?src=registry |
| `io.github.bh-rat/context-awesome` | Curated items from GitHub awesome lists by topic | https://www.context-awesome.com/api/mcp |
| `io.github.BharatDharmaAcademy/bda-mcp` | Panchang, Hindu festivals, mantras, scriptures, temples and Jyotish concepts | https://jyotish-api.bda.ai/mcp |
| `io.github.birdwell/runescape-wiki-mcp` | RuneScape 3 wiki content, Grand Exchange prices, player hiscores | https://runescape-wiki-mcp.fly.dev/mcp |
| `io.github.biserd/nyc-school-ratings` | NYC school and early-childhood program profiles and ratings | https://nycschoolsratings.com/mcp/schools |
| `io.github.biserd/running-directory` | Upcoming US running races by state, distance, date | https://running.services/mcp |
| `io.github.bitrix24/bitrix-mcp-rest` | Bitrix24 REST API methods, events and app development documentation | https://mcp-dev.bitrix24.com/mcp |
| `io.github.blakeplock/i2idl-glossary` | Digital learning concepts, definitions, relationships and citations | https://id.i2idl.org/mcp |
| `io.github.bleemohr/foodbe` | Cited food science, cooking technique, ingredient and food culture answers | https://mcp.foodbe.ai/v1/mcp |
| `io.github.bluetouff/13flow` | SEC 13F institutional holdings by fund and stock, with quality checks | https://13flow.eu/api/mcp |
| `io.github.bluetouff/l0g` | Macro risk analysis articles, evidence and sourced claims | https://l0g.fr/api/mcp/compact |
| `io.github.blutrich/podlearn` | Podcasts and episodes from 4M+ shows, with transcripts | https://podlearn.ai/mcp |
| `io.github.bmlt-enabled/bmlt-server-mcp` | Narcotics Anonymous meetings worldwide by location and format | https://mcp.bmlt.app/mcp |
| `io.github.bobymicjohn/2b2t-atlas` | 2b2t Minecraft server bases, signs, rare blocks and NoCom history | https://api.blackportal.cloud/mcp |
| `io.github.branch-docs/ai` | Branch API endpoints, webhooks and integration documentation | https://docs.branchapp.com/mcp |
| `io.github.brand-lc/findaiforwork` | Curated AI software tools for work, with comparisons | https://findaiforwork.com/mcp |
| `io.github.brian8a1/atisbo-docs` | Atisbo product documentation pages | https://app.atisbo.dev/api/mcp-docs |
| `io.github.buildngrowsv/pubroot` | AI-reviewed papers, reviews and checked claims on Pubroot | https://mcp.pubroot.com/mcp |
| `io.github.burmanharry/cleaningredients` | China-origin botanical ingredients, grades, sources and supplier research leads | https://cleaningredients.co/api/mcp |
| `io.github.busybusybussiness/uk-legislation-changes` | Amendment histories of UK law provisions | https://uk-legal-changes.pages.dev/mcp |
| `io.github.BUYMYAGENT-TECHNOLOGIES-INC/marketplace` | Curated catalogue of AI agents for sale | https://www.buy-my-agent.com/api/mcp |
| `io.github.c-mongan/ireland-mcp` | Irish public data: statistics, law, transport, weather, property | https://mcp.irishopendata.ie/mcp |
| `io.github.cadenlpicard/rocketvault` | RocketVault product documentation, plans and public card marketplace listings | https://rocketvault.io/mcp |
| `io.github.cairncommons/cairn-read` | Known dependency bugs and package version compatibility issues | https://cairncommons.dev/api/mcp/read |
| `io.github.cammac-creator/openswissdata` | Swiss customs tariffs, FINMA register, companies and activity codes | https://mcp.openswissdata.com/jsonrpc |
| `io.github.CapsteraSupport/stoquity` | Equity ratings, forecasts and SEC filing figures for large US companies | https://stoquity.com/mcp |
| `io.github.carbaj03/solution-commons` | Public solutions from agent work with evidence and reuse reports | https://solutions.agentlife.app/api/mcp |
| `io.github.Carmel-Labs-Inc/mcp-index` | Directory of public MCP servers, their tools and health | https://index.mcp.agentstatus.dev/mcp |
| `io.github.cdaily1995-create/findingsteel-steel-sections` | Chinese GB standard steel section properties and weights | https://www.findingsteel.com/mcp/ |
| `io.github.cello305/carddeals-mcp` | Current US gift card discounts across providers | https://catalog.carddeals.co/mcp |
| `io.github.Centrify-Internal/hubspot-integrations-mcp` | HubSpot Integrations Center app integrations data | https://n6k96b1ql7.execute-api.us-west-2.amazonaws.com/prod/ |
| `io.github.chandradot99/voicedex` | Speech-to-text and text-to-speech models, voices, pricing and providers | https://voicedex.dev/mcp |
| `io.github.chrisryugj/korean-law-mcp` | Korean statutes, precedents, ordinances, treaties and legal interpretations | https://mcp.gomdori.app/law |
| `io.github.CleanSlice/mcp` | Architecture docs and patterns for NestJS and Nuxt full-stack apps | https://mcp.cleanslice.org/mcp |
| `io.github.cloudalien2025/1800deals-directory` | Directory of toll-free and vanity-number US businesses | https://1800deals-connector.michael-b38.workers.dev/mcp |
| `io.github.cloudalien2025/bangkokvacay-directory` | Bangkok tours, hotels, restaurants, nightlife and services | https://bangkokvacay-connector.michael-b38.workers.dev/mcp |
| `io.github.cloudalien2025/bostonvacay-directory` | Boston tours, hotels, restaurants, nightlife and services | https://bostonvacay-connector.michael-b38.workers.dev/mcp |
| `io.github.cloudalien2025/vailvacay-directory` | Vail Valley Colorado restaurants, hotels, activities and services | https://vailvacay-connector.michael-b38.workers.dev/mcp |
| `io.github.coburn2716/directree-mcp` | Structured facts on 5000+ software tools, with comparisons | https://www.directree.io/api/mcp |
| `io.github.codytodd-ui/pitchspark` | Scored pre-seed and seed startups currently raising money | https://pitchspark.io/api/functions/pitchsparkMcp |
| `io.github.Colorado-Startups/coloradostartups` | Colorado startup resources, events, regions, companies and founder guides | https://coloradostartups.org/mcp |
| `io.github.coltongriffith/explorationmaps` | Public mineral claim registries by holder and claim number | https://www.explorationmaps.com/mcp/server |
| `io.github.CompanyFramework/connector` | Contractor business kits, job costing guides and trade AI bots | https://companyframework.com/mcp |
| `io.github.connerlambden/bgpt-mcp` | Claim-level experimental evidence from full-text scientific papers | https://bgpt.pro/mcp/stream |
| `io.github.conorbronsdon/chain-of-thought-podcast-mcp` | Chain of Thought AI podcast transcripts and episodes | https://mcp.chainofthought.show/mcp |
| `io.github.contexte-tech/contexte` | AI datasets, prompts and few-shot contexts catalogue | https://contextetech.com/mcp |
| `io.github.Cora77-ops/kingy-guides` | Video game guides, hints and walkthroughs from kingy.wiki | https://kingy-guides.vercel.app/mcp |
| `io.github.CumulativeWebInc/cwi-discovery-engine` | Music catalog of tracks, artists and releases searchable by brief or mood | https://cwi-machine-data.hp-ace.workers.dev/mcp |
| `io.github.curlymolelabs/supericons` | Over 20,000 SVG icons searchable by meaning | https://mcp.supericons.dev/mcp |
| `io.github.CYAN-ECLIPSE-TECHNOLOGIES-LLC/trust` | Benchmark verdicts, receipts and ERC-8004 agent validation records | https://cetech.ai/trust/mcp |
| `io.github.CYAN-ECLIPSE-TECHNOLOGIES-LLC/white-report` | Crypto and AI news archive with graded market calls | https://thewhitereport.com/mcp.php |
| `io.github.cyanheads/art-institute-chicago-mcp-server` | Art Institute of Chicago artworks, artists, exhibitions and audio guides | https://art-institute-chicago.caseyjhand.com/mcp |
| `io.github.cyanheads/arxiv-mcp-server` | arXiv paper metadata and full text | https://arxiv.caseyjhand.com/mcp |
| `io.github.cyanheads/biorxiv-mcp-server` | bioRxiv and medRxiv preprints, metadata and full text | https://biorxiv.caseyjhand.com/mcp |
| `io.github.cyanheads/bluesky-mcp-server` | Bluesky posts, profiles, threads, feeds and trending topics | https://bluesky.caseyjhand.com/mcp |
| `io.github.cyanheads/cdc-health-mcp-server` | CDC public health data: mortality, vaccinations, surveillance, behavioral risk | https://cdc.caseyjhand.com/mcp |
| `io.github.cyanheads/cern-inspire-mcp-server` | High-energy physics papers, authors, experiments, citations and HEPData measurements | https://cern-inspire.caseyjhand.com/mcp |
| `io.github.cyanheads/cern-opendata-mcp-server` | CERN Open Data particle physics datasets, files and analysis environments | https://cern-opendata.caseyjhand.com/mcp |
| `io.github.cyanheads/chembl-mcp-server` | Compound bioactivity, protein targets, drug mechanisms and indications from ChEMBL | https://chembl.caseyjhand.com/mcp |
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
| `io.github.cyanheads/epa-mcp-server` | US EPA facility compliance, toxic releases, Superfund sites, air quality | https://epa.caseyjhand.com/mcp |
| `io.github.cyanheads/eu-parliament-mcp-server` | European Parliament procedures, MEPs, votes, documents and speeches | https://eu-parliament.caseyjhand.com/mcp |
| `io.github.cyanheads/eur-lex-mcp-server` | EU legislation, CJEU case law, treaties and EuroVoc concepts | https://eur-lex.caseyjhand.com/mcp |
| `io.github.cyanheads/eurostat-mcp-server` | EU economy, demography, trade and regional statistics from Eurostat | https://eurostat.caseyjhand.com/mcp |
| `io.github.cyanheads/faa-aircraft-registry-mcp-server` | US civil aircraft registrations decoded by N-number, owner and type | https://faa-aircraft-registry.caseyjhand.com/mcp |
| `io.github.cyanheads/faa-airmen-registry-mcp-server` | FAA pilot and instructor certificates, ratings and medical class records | https://faa-airmen-registry.caseyjhand.com/mcp |
| `io.github.cyanheads/fbi-crime-mcp-server` | US crime rates, arrests, hate crimes and police staffing statistics | https://fbi-crime.caseyjhand.com/mcp |
| `io.github.cyanheads/fcc-spectrum-mcp-server` | FCC radio licenses, licensed sites and frequency allocations | https://fcc-spectrum.caseyjhand.com/mcp |
| `io.github.cyanheads/fdic-banks-mcp-server` | FDIC-insured banks, financials, failures, mergers and deposit data | https://fdic-banks.caseyjhand.com/mcp |
| `io.github.cyanheads/federal-regulations-mcp-server` | US Federal Register rules, CFR text, dockets and public comments | https://federal-regulations.caseyjhand.com/mcp |
| `io.github.cyanheads/first-epss-mcp-server` | EPSS exploit probability scores for CVEs, with daily history | https://first-epss.caseyjhand.com/mcp |
| `io.github.cyanheads/gbif-biodiversity-mcp-server` | Species taxonomy and billions of occurrence records from GBIF | https://gbif-biodiversity.caseyjhand.com/mcp |
| `io.github.cyanheads/gdelt-mcp-server` | Global news coverage, tone trends and US TV news transcripts | https://gdelt.caseyjhand.com/mcp |
| `io.github.cyanheads/geonames-mcp-server` | Places, administrative hierarchies, postal codes and country facts | https://geonames.caseyjhand.com/mcp |
| `io.github.cyanheads/grantsgov-mcp-server` | US federal funding opportunities, eligibility and deadlines from Grants.gov | https://grantsgov.caseyjhand.com/mcp |
| `io.github.cyanheads/gutenberg-mcp-server` | Public-domain ebooks with full text from Project Gutenberg | https://gutenberg.caseyjhand.com/mcp |
| `io.github.cyanheads/hn-mcp-server` | Hacker News stories, threads and user profiles | https://hn.caseyjhand.com/mcp |
| `io.github.cyanheads/ilostat-mcp-server` | Global labour market statistics and indicators from ILOSTAT | https://ilostat.caseyjhand.com/mcp |
| `io.github.cyanheads/inaturalist-mcp-server` | iNaturalist wildlife sightings, species counts, identifications and phenology | https://inaturalist.caseyjhand.com/mcp |
| `io.github.cyanheads/internet-archive-mcp-server` | Wayback Machine snapshots and Internet Archive books, media and texts | https://internet-archive.caseyjhand.com/mcp |
| `io.github.cyanheads/interpro-mcp-server` | Protein families, domains and structures from InterPro | https://interpro.caseyjhand.com/mcp |
| `io.github.cyanheads/libofcongress-mcp-server` | Library of Congress collections, historic newspapers and subject headings | https://libofcongress.caseyjhand.com/mcp |
| `io.github.cyanheads/medical-codes-mcp-server` | US medical codes: ICD-10, HCPCS and RxNorm, with crosswalks | https://medical-codes.caseyjhand.com/mcp |
| `io.github.cyanheads/met-museum-mcp-server` | Metropolitan Museum of Art collection records and open images | https://met-museum.caseyjhand.com/mcp |
| `io.github.cyanheads/musicbrainz-mcp-server` | Music artists, releases, recordings, works and labels from MusicBrainz | https://musicbrainz.caseyjhand.com/mcp |
| `io.github.cyanheads/nhtsa-vehicle-safety-mcp-server` | US vehicle recalls, complaints, crash ratings and NHTSA investigations | https://nhtsa.caseyjhand.com/mcp |
| `io.github.cyanheads/nist-nvd-mcp-server` | NIST NVD CVE vulnerabilities by severity, CWE, KEV status and product | https://nist-nvd.caseyjhand.com/mcp |
| `io.github.cyanheads/noaa-climate-mcp-server` | Historical weather observations, climate normals and US storm events | https://noaa-climate.caseyjhand.com/mcp |
| `io.github.cyanheads/npi-providers-mcp-server` | US healthcare providers from NPPES and specialty taxonomy codes | https://npi-providers.caseyjhand.com/mcp |
| `io.github.cyanheads/oecd-mcp-server` | OECD statistical datasets on economy, society and environment | https://oecd.caseyjhand.com/mcp |
| `io.github.cyanheads/oeis-mcp-server` | Integer sequences, formulas and programs from the OEIS | https://oeis.caseyjhand.com/mcp |
| `io.github.cyanheads/openalex-mcp-server` | Academic publications, authors, institutions and citations from OpenAlex | https://openalex.caseyjhand.com/mcp |
| `io.github.cyanheads/openfoodfacts-mcp-server` | Packaged food products, nutrition and scores by barcode or search | https://openfoodfacts.caseyjhand.com/mcp |
| `io.github.cyanheads/openlibrary-mcp-server` | Books, authors, editions, subjects and full-text passages | https://openlibrary.caseyjhand.com/mcp |
| `io.github.cyanheads/openstates-mcp-server` | US state bills, legislators, committees and legislative events | https://openstates.caseyjhand.com/mcp |
| `io.github.cyanheads/ourairports-mcp-server` | Global airports, runways, navaids and radio frequencies | https://ourairports.caseyjhand.com/mcp |
| `io.github.cyanheads/paleobiology-mcp-server` | Fossil occurrences, taxa, diversity and geologic time scale | https://paleobiology.caseyjhand.com/mcp |
| `io.github.cyanheads/pentest-mcp-server` | Penetration testing methodology, MITRE ATT&CK techniques and OWASP test cases | https://pentest.caseyjhand.com/mcp |
| `io.github.cyanheads/pharmacogenomics-guidelines-mcp-server` | CPIC pharmacogenomics guidelines, gene-drug pairs and prescribing recommendations | https://pharmacogenomics-guidelines.caseyjhand.com/mcp |
| `io.github.cyanheads/pokeapi-mcp-server` | Pokémon stats, moves, abilities, items and type matchups | https://pokeapi.caseyjhand.com/mcp |
| `io.github.cyanheads/pubchem-mcp-server` | PubChem compounds, properties, hazard data and bioactivity | https://pubchem.caseyjhand.com/mcp |
| `io.github.cyanheads/pubmed-mcp-server` | Biomedical literature, abstracts, full text and MeSH terms | https://pubmed.caseyjhand.com/mcp |
| `io.github.cyanheads/reference-data-mcp-server` | Countries, timezones, elements, physical constants, HTTP codes, MIME, Unicode | https://reference-data.caseyjhand.com/mcp |
| `io.github.cyanheads/reliefweb-mcp-server` | ReliefWeb humanitarian reports, disasters, country profiles and jobs | https://reliefweb.caseyjhand.com/mcp |
| `io.github.cyanheads/ris-austria-mcp-server` | Austrian federal and state law, court decisions and gazette | https://ris-austria.caseyjhand.com/mcp |
| `io.github.cyanheads/smithsonian-mcp-server` | Smithsonian museum objects and open-access images | https://smithsonian.caseyjhand.com/mcp |
| `io.github.cyanheads/socrata-mcp-server` | Government open datasets from Socrata data portals | https://socrata.caseyjhand.com/mcp |
| `io.github.cyanheads/stackexchange-mcp-server` | Stack Exchange questions, answers and tag FAQs | https://stackexchange.caseyjhand.com/mcp |
| `io.github.cyanheads/sweden-parliament-mcp-server` | Swedish parliament documents, speeches, votes, members and statutes | https://sweden-parliament.caseyjhand.com/mcp |
| `io.github.cyanheads/switzerland-parliament-mcp-server` | Swiss parliamentary business, votes, debates and member interests | https://switzerland-parliament.caseyjhand.com/mcp |
| `io.github.cyanheads/uk-legislation-mcp-server` | UK legislation text at any date, with amendments and changes | https://uk-legislation.caseyjhand.com/mcp |
| `io.github.cyanheads/uk-parliament-mcp-server` | UK Parliament bills, members, votes, Hansard debates and committees | https://uk-parliament.caseyjhand.com/mcp |
| `io.github.cyanheads/uk-police-crime-mcp-server` | UK street crime, outcomes, stop and search, and neighbourhood policing | https://uk-police-crime.caseyjhand.com/mcp |
| `io.github.cyanheads/unesco-heritage-mcp-server` | UNESCO World Heritage, intangible heritage, biosphere reserves and geoparks | https://unesco-heritage.caseyjhand.com/mcp |
| `io.github.cyanheads/uniprot-mcp-server` | Curated protein records, sequences and proteomes from UniProt | https://uniprot.caseyjhand.com/mcp |
| `io.github.cyanheads/us-lobbying-mcp-server` | US lobbying disclosures and foreign agent registrations | https://us-lobbying.caseyjhand.com/mcp |
| `io.github.cyanheads/usda-mcp-server` | Food nutrient data from USDA FoodData Central | https://usda.caseyjhand.com/mcp |
| `io.github.cyanheads/usitc-tariffs-mcp-server` | US tariff schedule codes and published duty rates | https://usitc-tariffs.caseyjhand.com/mcp |
| `io.github.cyanheads/wikidata-mcp-server` | Wikidata entities, statements and SPARQL queries | https://wikidata.caseyjhand.com/mcp |
| `io.github.cyanheads/wikipedia-mcp-server` | Wikipedia articles, summaries, sections and references | https://wikipedia.caseyjhand.com/mcp |
| `io.github.cyanheads/zenodo-mcp-server` | Zenodo research datasets, software and publications with files | https://zenodo.caseyjhand.com/mcp |
| `io.github.CyberMax-tools/creative-commons-images` | Openly licensed and public-domain images with license and credit lines | https://commonkite.cybermax-tools.workers.dev/mcp?via=mcp-registry |
| `io.github.daftAI2026/awesome-jev` | Jev and System One projects with recorded inclusion evidence | https://awesomejev.cc/api/mcp |
| `io.github.dagrang-repository/himalayan-lighthouse` | Pages on courses, dictionary, encyclopedia, disaster warnings, visa rules | https://himalayan-lighthouse.dumaguete.uk/mcp |
| `io.github.dagrang-repository/teach-me` | 100-lesson courses on many subjects | https://teachmeanything.aplusz.app/mcp |
| `io.github.Daisuke134/ai-monk-index` | AI monk avatar creators, video formats, monetization and playbooks | https://aniccaai.com/.netlify/functions/ai-monk-mcp |
| `io.github.daleweaver1981/tariffmonitor-mcp` | US HTS codes and stacked import tariff rates by origin | https://adcreator-ai.com/mcp-free |
| `io.github.Damso74/arcadeops-public-discovery` | ArcadeOps public developer docs, OAuth guide and OpenAPI | https://arcadeops.leadalpes.fr/mcp/public |
| `io.github.dang13021993/olahome` | Published Japan property listings and OlaHome service information | https://olahome.jp/mcp |
| `io.github.danielinniss/boundr` | UK administrative boundaries and GeoJSON geometries from OS Boundary Line | https://mcp.boundr.dev/mcp |
| `io.github.DataLeadsPRO/airbnb-data` | Airbnb listings, details and calendar availability | https://data.dataleads.pro/mcp/airbnb-data |
| `io.github.DataLeadsPRO/app-data` | Google Play and App Store app details, reviews and search | https://data.dataleads.pro/mcp/app-data |
| `io.github.DataLeadsPRO/google-serp` | Google search, news and local results as structured data | https://data.dataleads.pro/mcp/google-serp |
| `io.github.DataLeadsPRO/government-tenders` | Government tenders and public procurement opportunities | https://data.dataleads.pro/mcp/government-tenders |
| `io.github.datmay-dot/streambridge` | Chinese TV drama scenes with timestamps by character, emotion and scene type | https://mcp.lume.living/mcp |
| `io.github.deficlow/hyperstore-mcp` | Directory of 6,500+ curated AI apps | https://mcp.store.hypergpt.ai/mcp |
| `io.github.Deke1Yahav/hive` | Agent-written Q&A threads and canonical fixes for errors and failing commands | https://hive-agents.fly.dev/mcp |
| `io.github.delicious28/wuming-books` | Chinese books with Douban ratings, guides and toplists | https://www.book345.com/api/mcp |
| `io.github.devids77/mcp-market-ru` | Russian construction contractors, house projects, prices and ratings | https://mcp-market.ru/mcp/ |
| `io.github.DevMomo/bahai-mcp` | Bahá’í sacred texts and passages with source links | https://mcp.bahaigpt.com/mcp |
| `io.github.devu-21/quiz20` | Indian competitive exam past papers, topic quizzes, NCERT chapters | https://www.quiz20.in/mcp |
| `io.github.dhamma-seeker/tripitaka-mcp` | Pali Canon suttas with search, citations and translations | https://mcp.tripitaka-mcp.com/mcp |
| `io.github.DiceHoldingsInc/dice-mcp` | Tech job listings on Dice.com | https://mcp.dice.com/mcp |
| `io.github.DirtyReal/delv-mcp` | Directory of AI tools, MCP servers, agent skills with safety ratings | https://mcp.delv.tools/mcp |
| `io.github.disclose/lookup-disclose-io` | Security vulnerability disclosure contacts for domains, packages and repositories | https://lookup.disclose.io/mcp |
| `io.github.dodopayments/dodo-knowledge` | Dodo Payments API, SDK documentation and guides | https://knowledge.dodopayments.com/mcp |
| `io.github.domusdeiug/muyiribi` | Ugandan business directory by category and district | https://ug-online.domus-dei-tech.workers.dev/mcp |
| `io.github.donniertf-hub/jp-library-search-mcp` | Japan National Diet Library catalogue of books and publications | https://jp-library-search-mcp.donniertf.workers.dev/mcp |
| `io.github.donniertf-hub/jp-postal-lookup-mcp` | Japanese postcodes to prefecture, city and town | https://jp-postal-lookup-mcp.donniertf.workers.dev/mcp |
| `io.github.DrRataplan/fonto-docs` | Fonto XML editor documentation and API reference | https://fonto-docs.elliat.nl/mcp |
| `io.github.drxinfra/rxkb` | Directum RX errors, infrastructure articles, sizing, supported versions, checklists | https://drxinfra.ru/mcp |
| `io.github.dubaikseniia-wq/entra-mcp` | Verified AI and tech jobs, companies hiring and salary stats | https://mcp.entracareers.com/mcp |
| `io.github.dunctk/marketing-manager-jobs` | Marketing manager jobs and hiring research trackers | https://marketingmanagerjobs.com/mcp |
| `io.github.durjoyace/medicalrecords` | US EMR vendors, state medical records laws, health data breaches | https://www.medicalrecords.com/api/mcp |
| `io.github.dwiel/buyusbcables` | Spec-verified hardware parts and USB cables on Amazon by parameters | https://www.buyusbcables.com/api/mcp |
| `io.github.dynamical-org/mcp` | Open weather and climate datasets such as GFS, ECMWF, HRRR | https://mcp.dynamical.org/mcp |
| `io.github.eater2/ai-agents-api-library` | Catalog of APIs and MCP servers for AI agents | https://ai-agents-api-library.vercel.app/mcp |
| `io.github.ebspark/agent-net-answers` | Reviewed answers on agent identity, permissions, persistence and durable jobs | https://agent-net-hub.duckdns.org/mcp |
| `io.github.eduair94/cambio-uruguay` | Uruguay exchange rates, rentals, used cars, prices and economy news | https://mcp.cambio-uruguay.com/mcp |
| `io.github.eiry16/beacon-mfg-mcp` | Chinese suppliers and manufacturers by industry, location and capability | https://beacon-mfg.pages.dev/mcp |
| `io.github.eltociear/tokenguard-mcp` | Air quality, earthquakes, holidays, World Bank indicators, geocoding and web search | https://eltociear-tokenguard.hf.space/mcp |
| `io.github.elvispaul7/gmat-mx` | GMAT Focus percentiles, Latin America fees, exam rules, practice questions | https://api.gmat.mx/mcp |
| `io.github.elyngved/failmodes` | Taxonomy of AI system failure modes by symptom | https://www.failmodes.com/api/mcp |
| `io.github.Embassy-of-the-Free-Mind/sourcelibrary` | Rare pre-modern texts translated to English: philosophy, religion, science | https://sourcelibrary.org/api/mcp |
| `io.github.Enrico55/humanity-commons` | Federated knowledge records with provenance and critiques | https://humanitycommons.org/mcp |
| `io.github.entire-vc/spark` | AI agents, skills, prompts and MCP connectors from the Spark marketplace | https://spark.entire.vc/mcp/ |
| `io.github.entrylib/entrylib` | Research paper claims with evidence and support scores | https://entrylib.org/mcp |
| `io.github.eosphor/ats-jobs` | Open job postings from company career boards across ATS vendors | https://melikhov.fr/mcp |
| `io.github.eugenelabonarsky/votura-tours` | Audio tours and points of interest in cities | https://api.votura.app/functions/v1/app_a0630e492b_mcp |
| `io.github.evaspace/pierref` | Specs and comparisons of 5,000+ cars on 140 criteria | https://mcp.pierref.eu/mcp |
| `io.github.EvidInvest/aether-developer` | SEC filings, earnings call transcripts, EU financial regulation and 13F holdings | https://aether.evidinvest.com/mcp |
| `io.github.f-tiger/bpj-startup-research` | AI startup cases, launch signals and validation evidence | https://baipiaoji.com/api/startup-mcp |
| `io.github.f-tiger/bpj-video-tools` | Chinese video platform rules and AI drama catalogue | https://baipiaoji.com/api/video-mcp |
| `io.github.fadymondy/nasaq` | Nasaq UI design system components, tokens and setup docs | https://mcp.nasaqui.com/mcp |
| `io.github.FarseenSh/web3ctx` | Version-pinned web3 docs, contract ABIs, EIPs and integration recipes | https://mcp.scarai.xyz/mcp |
| `io.github.felipegambettadesouza6-jpg/open-economics` | Official Brazilian economic data from BCB, IBGE and SICONFI | https://open-economics-data.knbf982hkn.chatgpt.site/api/mcp |
| `io.github.filipmihajlov/proceni` | Current grocery and drugstore prices across North Macedonian chains | https://uwgnuvlovgucbwsjsiqh.supabase.co/functions/v1/proceni-mcp |
| `io.github.firecrawl/firecrawl-mcp-server` | Current web pages and search results as clean content | https://mcp.firecrawl.dev/v2/mcp |
| `io.github.flaviohtavares/uk-law` | Full text of UK Acts and regulations by topic | https://uk-law-mcp.uk-law-mcp.workers.dev/mcp |
| `io.github.flogvit/bible` | Bible translations, Hebrew and Greek texts, study notes and cross references | https://mcp.bible.flogvit.com/mcp |
| `io.github.flohoeller/affectui` | AffectUI React components, screens and blocks with docs and source | https://www.affectui.com/api/mcp |
| `io.github.FluxonLab/gondar` | Open grants, tenders and fellowships from official sources | https://gondar.site/api/mcp |
| `io.github.flyptkarsh/lounge-frog` | Airport lounges, card access, seats, cruises, points values, politics | https://public.loungefrog.com/mcp |
| `io.github.Fokuus/mdprint-docs` | mdprint product information, documentation and Markdown examples | https://mdprint.app/mcp/docs |
| `io.github.ForkastPredict/forkast-mcp-docs` | Forkast prediction market documentation | https://mcp.forkast.gg/mcp |
| `io.github.frankbongo/disc-golf-england` | English Disc Golf Association tour results, policies, courses and funding guidance | https://discgolfengland.com/wp-json/edga/v1/mcp |
| `io.github.frankbongo/discgolfapi` | Disc golf courses worldwide with details and updates | https://io.discgolfapi.com/mcp |
| `io.github.frankbongo/thedisclist` | Disc golf discs, flight ratings, comparisons and sales rankings | https://api.thedisclist.com/mcp |
| `io.github.freecvorg/cvjson` | Public CVs of people open to work, in cv.json format | https://freecv.org/api/mcp |
| `io.github.Galanai/machinerealms` | Agent research commons findings, evidence ledgers and open research quests | https://machinerealms.com/mcp |
| `io.github.GeminiGeorge22/black-friday-deals` | Black Friday discounts across US and Canadian stores | https://black-friday-deals.fmf-x402.workers.dev/mcp |
| `io.github.GenPM-net/genpm` | Injectable source code modules with AI rules and MCP, pinned to commits | https://mcp.genpm.net/ |
| `io.github.Georgi-Petkov/personalknowhow` | One person's skills and work experience as a knowledge graph | https://personalknowhow-demo.kxtwrdzt6g.workers.dev/mcp |
| `io.github.geronco/commandvault` | Prompts, CLAUDE.md templates, Cursor rules and agent skills | https://commandvault.ai/api/mcp |
| `io.github.getapeptalk/speaker-finder` | Keynote speaker profiles, topics and indicative fees | https://mcp-connector-openai.getapeptalk.com/mcp |
| `io.github.getopenskills-oss/openskills` | Registry of Agent Skills for coding agents | https://getopenskills.xyz/api/mcp |
| `io.github.godavid/gitjog` | Hungarian laws full text with amendment history and point-in-time versions | https://gitjog.remenyfarm.hu/api/mcp |
| `io.github.gokimedia/cordfind-generator-compatibility` | Generator cords, plugs, connector compatibility and cord sizing | https://cordfind.com/api/mcp |
| `io.github.gokimedia/sewlore-measurement-reference` | Sewing measurement documentation, worked examples and tool references | https://sewlore.gitbook.io/sewlore-docs/~gitbook/mcp |
| `io.github.GoodTurnStudio/bible` | Bible passages, daily readings and search | https://goodturn-mcp.pages.dev/bible/mcp |
| `io.github.GoodTurnStudio/findmymoney` | Official US and UK unclaimed money and property searches and how to claim | https://goodturn-mcp.pages.dev/findmymoney/mcp |
| `io.github.GoodTurnStudio/jobspotter` | Current US and UK job listings, salaries and employer facts | https://goodturn-mcp.pages.dev/jobspotter/mcp |
| `io.github.GoodTurnStudio/talmud` | Talmud and Mishnah text with daily Daf Yomi readings and explanations | https://goodturn-mcp.pages.dev/talmud/mcp |
| `io.github.gosodax/builders-mcp` | SODAX DeFi protocol data and SDK documentation | https://builders.sodax.com/mcp |
| `io.github.gosodax/sodax-mcp` | SODAX DeFi protocol data and SDK documentation | https://mcp.sodax.com/mcp |
| `io.github.govcontractscout/govcontractscout-mcp` | Live US state and local government contract opportunities | https://scout.govbidportals.com/mcp |
| `io.github.greg-wilko/companyverify` | UK company register records, LEIs and sanctions list matches | https://api.companyverify.uk/mcp |
| `io.github.GriffMurder/orca-site` | Orca product, pricing, FAQs and docs | https://ops.orcarw.com/api/mcp |
| `io.github.GSMS-B/indian-legal-mcp` | Text of 102 Indian Acts and the Constitution | https://gsms-b-indian-legal-mcp.hf.space/gradio_api/mcp/ |
| `io.github.Guru-ragul/kabo-nutrition` | ICMR-NIN nutrition facts for Indian foods and protein targets | https://kabo-nutrition-mcp.onrender.com/mcp |
| `io.github.gustavoatar/instafan` | Travel destinations, top spots, briefs and itineraries | https://instafan.app/mcp |
| `io.github.guyvolvo/oceanofjobs` | Open job listings and employer hiring information | https://oceanofjobs.com/mcp |
| `io.github.h2-papers/mcp-server` | Molecular hydrogen medical literature with safety notes | https://h2-papers.org/mcp |
| `io.github.Habanacasta88/callejear-de` | German municipalities, streets and historical OSM street context | https://callejear.de/api/mcp |
| `io.github.Habanacasta88/mystreetdata` | US street records with walkability and nearby amenity metrics | https://mystreetdata.com/api/mcp |
| `io.github.hans6883/cert-atlas` | Certification and professional exam blueprints, prices, duration and passing scores | https://mcp.quizforge.ai/mcp |
| `io.github.haocn-ops/git-top` | Open-source projects with recommendations, alternatives and comparisons | https://git.top/mcp/core/source/mcp-registry?source=mcp-registry |
| `io.github.HarshithNayakaL/portfolio-docs` | Developer docs for a portfolio's JSON API, MCP, A2A and NLWeb | https://harshith-nayaka-l-portfolio.vercel.app/mcp/docs |
| `io.github.hassanaziz0012/only-hiring` | Scam-scored freelance and remote hiring posts from Reddit job subreddits | https://onlyhiring.hassandev.me/mcp |
| `io.github.hbailla/huntprice` | Grocery prices across Canadian stores and cities, with weekly cheapest store | https://huntprice.ca/mcp |
| `io.github.heathermacavelia-cell/ai-agent-index` | AI agents and automation agencies with pricing, integrations and ratings | https://theaiagentindex.com/mcp/mcp |
| `io.github.Heirloomz/oral-heritage-index` | Guides and interview prompts for saving family stories | https://oral-heritage-index.inktree.ai/mcp |
| `io.github.helena-bioinformatics/ask-helena` | Helena Bioinformatics company and product information with citations | https://api.helena.bio/ask/v1/mcp |
| `io.github.helena-bioinformatics/noodle` | PubMed-derived biomedical papers with citation and semantic graphs | https://api.helena.bio/noodle/v1/mcp |
| `io.github.hey-research-lab/hey-research` | Robinhood Chain projects, contracts, ships, changes and token markets | https://heyresearch.xyz/mcp |
| `io.github.HeyZod/mansa-african-identity` | African bank codes, mobile networks, holidays, currencies, stablecoin rates | https://mansaapi.com/api/mcp |
| `io.github.hiddenjobs/job-search-mcp` | Remote tech job listings and descriptions | https://api.hiddenjobs.dev/mcp |
| `io.github.ho11-bit/donvi108-research` | Scholarly paper metadata and DOI links from Crossref | https://donvi108-agent-hub-live-preview.donvi108.workers.dev/mcp |
| `io.github.hoodly-agent/hoodly-gmgn-robinhood-mcp` | Robinhood Chain token launches, trends and due diligence data | https://gmgn.hoodly.io/mcp |
| `io.github.hotsyrup/lumen-house` | Lumen House offers, guides and curated Agent Help Map research | https://mcp.lumenhouse.xyz/mcp |
| `io.github.Humanleap/magicscreenshots-mcp` | Real App Store listing screenshots, previews and version history | https://www.magicscreenshots.com/api/mcp |
| `io.github.ifcode/gameshot` | Video game industry news, hot stories, and daily, weekly and monthly reports | https://gameshot.games/api/mcp |
| `io.github.Ikalus1988/misakanet` | Evidence-rated coding failure lessons searchable by error text | https://misakanet.org/mcp |
| `io.github.Insightwithhari/rbai-scholar` | Biomedical journal abstracts, citations and similar papers | https://scholar.thedreamlabinnovations.com/v1/mcp |
| `io.github.InstaBlick/complyzard` | Compliance resources and documents by framework and topic | https://complyzard.com/mcp |
| `io.github.instinctagentai/gulf-open-data` | World Bank GCC indicators and Qatar open government datasets | https://gulf-open-data.pages.dev/mcp |
| `io.github.introman2023/tonzar` | Russian B2B industrial products and verified manufacturers catalog | https://tonzar.com/mcp |
| `io.github.isaacaskew/venunite-events` | US local events: concerts and more within 90 days | https://mcp.venunite.com/v1/mcp/ |
| `io.github.islamad/islam.ad` | Quran verses, hadith collections and tafsir texts | https://islam.ad/mcp |
| `io.github.isotopesai/docs` | Isotopes AI product documentation, guides and API references | https://docs.isotopes.ai/mcp |
| `io.github.itsryanarmani/boardingschools` | Directory of boarding schools by place and category | https://boardingschools.fyi/mcp |
| `io.github.itsryanarmani/plumberpros` | Directory of plumbers by place and service category | https://plumberpros.fyi/mcp |
| `io.github.iyuyoung/jotoak` | Published word searches, crosswords and mazes with printable PDFs | https://jotoak.com/mcp |
| `io.github.iyuyoung/nameideahub` | US surnames with 2010 Census ranks and counts | https://nameideahub.com/mcp |
| `io.github.izzet/mcp` | Izzet Yildirim's research papers, publications and CV | https://iyildirim.com/api/mcp |
| `io.github.Jackalope-Dev/moxie-docs` | Generated repository documentation, coding conventions and doc gaps | https://moxiedocs.com/api/mcp |
| `io.github.JacobiusMakes/diamond-mcp` | Diamond and gemology encyclopedia, lab-grown grading and price index | https://diamond-mcp.stienhardt.workers.dev/mcp |
| `io.github.james-robson/push-realm` | Agent-shared solutions to package, setup and runtime problems | https://api.pushrealm.com/mcp |
| `io.github.jamesmirusa/greengopartners` | GreenGo marketplace listings of AI agents, apps, templates, plus AI news | https://greengopartners.com/mcp |
| `io.github.jamessvn/registry-pages` | Official company register data for France, UK, Norway, Ireland | https://registrypages.com/mcp |
| `io.github.JaniJegoroff/agent-connectors-mcp` | Directory of agent connectors and MCP tools | https://agentconnectors.dev/mcp |
| `io.github.jannegpriv/skyddsrumskollen` | Swedish civil-defence shelter locations, details and national statistics | https://tjovnwtrzrneiaqmigqe.supabase.co/functions/v1/mcp |
| `io.github.Jascenn/lingyi-tools-mcp` | Directory of AI tools by category and pricing | https://lingyi-tools-mcp.vercel.app/api/mcp |
| `io.github.jaypark8780/baedang` | Korean and US dividend stocks, yields, growth and history | https://baedang.info/api/mcp |
| `io.github.jdhinman/402verified` | Directory of paid x402 API endpoints with verified seller audits | https://402verified.com/mcp |
| `io.github.jdurey/benchmark-ap` | AP course lessons, CED topics and free-response scoring rubrics | https://benchmark-ap.pages.dev/api/mcp |
| `io.github.Jenpo/fxpeek` | Latest and historical reference exchange rates with source links | https://fxpeek.com/api/mcp |
| `io.github.jimy-r/agent-workspace-practice` | Agent workspace architecture patterns and best practices | https://jamesross.ai/mcp |
| `io.github.jmrplens/libgen-mcp` | Books, papers, magazines and standards with text reading | https://mcp.jmrp.io/libgen |
| `io.github.joachimglassell-ship-it/tsre-swedish-equities` | Daily research intelligence on Swedish equities and market | https://machine-job-fishing-net.onrender.com/mcp/ |
| `io.github.joelp22-maker/referencesource` | Verified reference facts: regulatory thresholds, security controls, state rules | https://referencesource.org/mcp |
| `io.github.Jona1245/agentdatahub` | Official statistics, economic indicators, FX rates, holidays with sources | https://api.agentdatahub.de/mcp |
| `io.github.JordanKarst/predictionscan` | Polymarket odds, price history, trader activity and related news | https://mcp.predictionscan.org/mcp |
| `io.github.Joshuv-AI/tower-of-babel` | Public-domain full texts: books, papers, declassified documents | https://antarctic-labs.com/mcp |
| `io.github.jovan1301/official-translator-guides` | Guides on document translation, apostille and visas | https://officialtranslator.pro/mcp |
| `io.github.JoviDeCroock/pracht-docs` | pracht framework guides, recipes and API reference | https://pracht.resynapse.dev/mcp |
| `io.github.jqy-yo/gptimagehub` | Attributed image generation prompt templates by category | https://www.gptimagehub.com/mcp |
| `io.github.JSONbored/heyclaude` | Directory of Claude Code agents, MCP servers, skills and tools | https://heyclau.de/api/mcp |
| `io.github.justinmont84/loyaltyvip` | US casino directory and casino rewards programs | https://loyaltyvip.com/mcp |
| `io.github.justjlee/omnarai-mcp` | Attributed multi-AI corpus and cross-model divergence on open questions | https://engine.omnarai.org/api/mcp |
| `io.github.JustJuice55/telegram-catalog` | Telegram channels, chats, bots, marketplace listings and demand trends | https://tgden.com/api/mcp |
| `io.github.kaitoInfra/twitterapi-mcp-server` | Twitter/X tweets, user profiles, followers, timelines and trends | https://mcp.twitterapi.io/mcp |
| `io.github.Kaixxrua/aigc-radar` | AI arXiv papers, GitHub AI projects and daily rankings | https://aigcnews.cn/api/mcp |
| `io.github.kanameyamamoto/seiji-no-mado` | Japanese politics: laws, Diet bills, votes, parties, members | https://api.seijinomado.com/mcp |
| `io.github.karandaid/karandeepsingh-blog` | DevOps and AWS articles and cheatsheets | https://karandeepsingh.ca/mcp |
| `io.github.kashmirz/addie-property-research` | Australian property listings, sales history and suburb market data | https://mcp.addie.house/mcp?access=public |
| `io.github.kausalflow/gleanyard` | Gleanyard data source recipes and public project records | https://gleanyard-connector.leima.workers.dev/mcp |
| `io.github.kcaldata/kcaldata` | USDA-sourced calories and nutrition for foods and meals | https://api.kcaldata.com/mcp-server/mcp |
| `io.github.Kennethlee83/world-innovation` | World Innovation research abstracts and white papers with citations | https://winnovation.wead.live/mcp |
| `io.github.kerbelp/ai-collection` | Directory of AI tools with categories, alternatives and comparisons | https://thataicollection.com/mcp |
| `io.github.ketherworks/atcoder` | AtCoder competitive programming problem statements | https://api.ksrnyx.top/oj-mcp/atcoder/mcp |
| `io.github.kewang93/sks-nutrition-ai` | FDA GRAS notices, retailer ingredient rules, ingredient nutrients and suppliers | https://iygszrxfaretrgnjfmel.supabase.co/functions/v1/sks-mcp |
| `io.github.khaoss85/agent-crm` | Accordo CRM framework documentation and capability claims | https://accordo.dev/api/mcp |
| `io.github.Kibetho/saasforit` | Curated SaaS business tools directory with recommendations and guides | https://fuechvghummojkgliyha.supabase.co/functions/v1/mcp |
| `io.github.killbridge/startupjobs-mcp` | Live startup job listings, companies, trends and salary benchmarks | https://api.startup.jobs/mcp |
| `io.github.kimnchai/korea-flight-mcp` | Korean airport flight status, Incheon congestion and facilities | https://korea-flight.kimnchai.com/mcp |
| `io.github.kirupa/kirupa` | Web development, JavaScript, CSS and algorithms tutorials from KIRUPA | https://www.kirupa.com/mcp/ |
| `io.github.kkfir13/valuedge` | Stock fair-value valuations, fundamentals, technicals and dividend data | https://valuedge.app/mcp |
| `io.github.KKKKhazix/aihot` | Chinese AI industry news, hot topics and periodic briefs | https://aihot.news/api/mcp |
| `io.github.klmlfl/case-doha-record` | Decided US DOHA security-clearance cases and outcome statistics | https://www.clearancesearchengine.com/api/mcp |
| `io.github.kreativeManish/iso20022-navigator` | ISO 20022 messages, bank transaction codes, legacy MT mappings and code sets | https://mcp.isonavigator.io/iso20022 |
| `io.github.krishnakaushik195/desidata-mcp` | Catalogue of India datasets with sources, licences and previews | https://lqcxdxjncdzzkwgveydz.supabase.co/functions/v1/mcp |
| `io.github.krupalghori44-dev/infyicon-mcp` | Over 161,000 free icons as SVG or PNG | https://infyicon.com/mcp |
| `io.github.ktozvonil/phone-lookup` | Caller reputation, spam rating and reviews for phone numbers | https://ktozvonil.net/mcp |
| `io.github.kylelloyd63-star/sourcetome` | Passages from a rights-cleared library of classic literature | https://sourcetome-public.onrender.com/mcp |
| `io.github.LAHutchins91/papers` | Peer-reviewed and preprint research papers with citations | https://papers-mcp.vercel.app/mcp |
| `io.github.LAHutchins91/patent` | US patents, claims, citations and prior art | https://patent-mcp.vercel.app/mcp |
| `io.github.laibniz/scholarfetch` | Scholarly papers, abstracts, full text, authors and references | https://laibniz-scholarfetch-web.hf.space/mcp/ |
| `io.github.LambdaLabsHQ/searchwire` | Keyword search volume, Google results, app store keywords and domain availability | https://searchwire.dev/mcp |
| `io.github.LAOSP9/gitpicker` | GitHub repositories, source code, commits, issues and releases | https://gitpicker.cn/mcp |
| `io.github.laravilt/laravilt` | Laravilt Laravel admin panel docs, packages, changelogs and plugin guide | https://mcp.laravilt.com/mcp |
| `io.github.Learnosity/build-aide` | Learnosity API documentation and integration skills | https://mcp.learnosity.com/build/build-aide |
| `io.github.leejaejeon/beobi-daneun-got` | Korean statutes, precedents, business-district stats and public procurement | https://jake-asus.tail2c6a90.ts.net/law/mcp |
| `io.github.left-handed-grannies/comitelligence` | EU comitology committees, votes, dossiers and implementing-act documents | https://comitelligence-mcp.onrender.com/mcp |
| `io.github.legacyinmotion/sharegrokbots` | Shared Grok bots directory by function and category | https://mcp.sharegrokbots.com/mcp |
| `io.github.leo9/sota2` | AI solution rankings by industry and task, with company facts | https://www.sota2.com/mcp |
| `io.github.levz0r/beatseek` | SoundCloud tracks and playlists with BPM and musical key | https://beatseek.io/api/mcp |
| `io.github.liad142/yedapo` | AI summaries of podcast and YouTube episodes | https://www.yedapo.com/api/mcp |
| `io.github.LightoninT/bestasiahotels` | Asian hotel guides, destination guides and hotel records | https://mcp.bestasiahotels.com/mcp |
| `io.github.lightsmite/popa-recon-mcp` | Cited research on Web3 projects, tokens and on-chain events | https://poparecon.com/mcp |
| `io.github.LightsOutWorks/agent-commons` | Evidence-labeled methods for technical problems solved by agents | https://lightsoutworks.org/mcp |
| `io.github.Livvux/fivemdocs` | FiveM development guides, blip sprites, controls and ped names | https://fivemdocs.com/api/mcp |
| `io.github.Livvux/qbcore-docs` | QBCore framework APIs, resources and troubleshooting docs | https://qbcore.net/api/mcp |
| `io.github.Lodewijkheemskerk/syftly` | Best AI tool or API per task such as OCR or TTS | https://syftly.vercel.app/api/mcp |
| `io.github.Lokendrakushwah12/engg-space` | Open engineering jobs at startups, companies and salary ranges | https://www.engg.space/mcp |
| `io.github.LorgAI/lorg-mcp-server` | Peer-validated shared knowledge archive contributed by AI agents | https://api.lorg.ai/mcp |
| `io.github.ltvspot/library-of-alexandria` | Classic books in 25 languages with summaries and free chapters | https://mcp.libraryofalexandria.com/mcp |
| `io.github.magist-io/magist` | Product compliance regulations, controls, enforcement actions, vendors and counsel | https://magist.io/api/mcp |
| `io.github.makoncline/daylily-catalog` | Daylily cultivar records and public grower listings | https://daylilycatalog.com/api/mcp/server |
| `io.github.malithJayasinghe2000/rulewise` | Sri Lankan laws applying to software features, with sources | https://rulewise.victoriousdune-a7b660c5.centralindia.azurecontainerapps.io/mcp |
| `io.github.mapbox/mcp-docs-server` | Mapbox documentation, API references, style specs and guides | https://mcp-docs.mapbox.com/mcp |
| `io.github.marcello-pichini/ai-science-tracker` | AI-enabled scientific discoveries and AI-found software vulnerabilities | https://mcp.aisciencetracker.org/mcp |
| `io.github.MariusGithub13/dealos-mcp` | Due diligence checklists and guidance for small business acquisitions | https://getdealos.tech/mcp |
| `io.github.MartinSA04/ntnu-mcp` | NTNU course catalog, timetables, grade distributions and exam logistics | https://ntnu-mcp.martinsundal.no/mcp |
| `io.github.marvinhuelsmann/arani` | Agent-written verified fixes, pitfalls and programming learnings | https://api.arani.cloud/mcp |
| `io.github.masvc/shaft-coach` | Golf shaft specs from 66 makers, comparisons and recommendations | https://golf.peaky.co.jp/mcp |
| `io.github.matchawards/matchawards-mcp` | US government contracts, grants, awards and jobs | https://matchawards.com/mcp |
| `io.github.MatsClaes2/animehunt` | Anime, manga and webtoon catalog with recommendations and airing schedule | https://animehunt.co/api/mcp |
| `io.github.mattlsmith/navmds` | Cosmetic procedure overviews, US cost ranges and industry statistics | https://www.navmds.com/api/mcp |
| `io.github.mattmireles/tesoro-help` | Tesoro High School public documents and parent information | https://tesoro.help/mcp |
| `io.github.maxand98/ab500-research` | Art Blocks artist dossiers and collector holding-duration data | https://ab5d.xyz/mcp |
| `io.github.Maxence/l2tools` | Lineage 2 NPC stats, drops, Soul Crystals and XP tables | https://l2tools.org/api/mcp |
| `io.github.mcp-dir/cnpj-mcp` | Brazilian company registry data: legal name, status, partners, lawsuits | https://api.mcp.ai/p_cnpj |
| `io.github.mcp-dir/consulta-cclasstrib-mcp` | Brazil tax reform codes, rates and official classification tables | https://api.mcp.ai/p_consulta-cclasstrib |
| `io.github.mcp-dir/cpf-mcp` | Brazilian CPF validation and lawsuit discovery from official gazettes | https://api.mcp.ai/p_cpf |
| `io.github.mcp-dir/datajud-mcp` | Brazilian court case metadata and docket movements from CNJ | https://api.mcp.ai/p_datajud |
| `io.github.mcp-dir/expo-mcp` | Expo and EAS documentation, SDK guides and library usage | https://api.mcp.ai/p_expo |
| `io.github.mcp-dir/fipe-mcp` | Brazilian FIPE reference prices for cars, motorcycles and trucks | https://api.mcp.ai/p_fipe |
| `io.github.mcp-dir/flightradar-mcp` | Live aircraft positions, military flights and airport information | https://api.mcp.ai/p_flightradar |
| `io.github.mcp-dir/inpi-mcp` | Brazilian trademark and patent records by name, process or holder | https://api.mcp.ai/p_inpi |
| `io.github.mcp-dir/jurisprudencia-mcp` | Brazilian case law, court decisions and súmulas | https://api.mcp.ai/p_jurisprudencia |
| `io.github.mcp-dir/jus-mcp` | Brazilian lawsuits, court publications, case law, tenders and certificates | https://api.mcp.ai/jus |
| `io.github.mcp-dir/kb-mcp` | User's own uploaded documents, searchable by meaning | https://api.mcp.ai/p_kb |
| `io.github.mcp-dir/pncp-mcp` | Brazilian government tenders, public procurement notices, winners and edital documents | https://api.mcp.ai/p_pncp |
| `io.github.mcpexplorer/mcpexplorer` | MCP servers with install methods, risk labels and trust scores | https://mcpexplorer.com/mcp |
| `io.github.MCPServings/paper-mcp` | Academic papers from arXiv, Semantic Scholar, OpenAlex, plus PubMed medical literature | https://latex-tools.online/mcp |
| `io.github.mdexa-ai/mdexa` | Medical AI datasets and models with verified licenses and access | https://mcp.mdexa.com/mcp |
| `io.github.megabrainee/sectora` | CVE, EPSS, KEV and package vulnerability threat intelligence | https://mcp.sectora.io/mcp |
| `io.github.MelanieABC/misim-tax-research` | Israeli tax law, rulings, circulars, forms and deadlines | https://mcp.misim.ai/mcp |
| `io.github.menghaoran214-lang/vibe-coding-cn` | Chinese vibe coding guides and documentation | https://n8n.xiaomeng.ink/mcp/vibe-coding-cn |
| `io.github.mfbaig35r/counselmode-license-navigator` | Software, AI model and data license terms, compatibility and obligations | https://licenses.counselmode.com/mcp |
| `io.github.michaelcolenso/nobodynamed` | US baby name popularity by year from 1880 to 2025 | https://nobodynamed.com/mcp |
| `io.github.MikeBild/mikebild-knowledge` | Software architecture articles, workshop slides and catalog by Mike Bild | https://worker.mikebild.dev/workshop-online-api/knowledge/mcp |
| `io.github.mikegianfelice/githired` | Canada-eligible tech job listings from employer ATS boards | https://api.githired.ca/mcp |
| `io.github.mikenguyen13/research-methods-mcp` | Research methods textbooks, study design guidance and statistics code | https://research-methods-mcp.vercel.app/mcp |
| `io.github.minsooparkk/korea-tax-law-mcp` | Korean tax statutes, court cases, NTS rulings and tax treaties | https://mcp.taxjarvis.com/mcp |
| `io.github.MInsYang/bioai-rizhi` | AI biopharma news, research abstracts and company directory | https://bioai-rizhi.pages.dev/mcp |
| `io.github.mirackacmazcom/seo-skills` | Google leak, search patents, official SEO docs, staff statements | https://mcp.seoskills.io/mcp |
| `io.github.mjaskolski/developer-toolkit-mcp` | Guides on Claude Code, Codex and Cursor in English, Polish | https://developertoolkit.ai/mcp |
| `io.github.MkFastHQ/haitang` | Classical Chinese poetry by dynasty, author, theme and festival | https://haitang.app/mcp |
| `io.github.MkFastHQ/tanstarter` | TanStarter documentation | https://tanstarter.dev/mcp |
| `io.github.mkibrick/compshop` | Compensation surveys by industry, region and job title | https://www.comp-shop.com/api/mcp |
| `io.github.mkisama94/subsidy-ai` | Japanese subsidies, company registry and securities filing data | https://subsidy.ai-orchestration.jp/mcp |
| `io.github.MkSaaSHQ/mksaas` | MkSaaS documentation | https://mksaas.com/mcp |
| `io.github.MkThingsHQ/betterlaunch` | Directory of products launched on BetterLaunch by category and tag | https://betterlaunch.app/mcp |
| `io.github.MkThingsHQ/openfree` | Free and open-source AI tools for indie makers | https://openfree.tools/mcp |
| `io.github.modern-ai-inc/ai-recommendation-rate-mcp` | How often AI search recommends a brand first | https://w0-mcp-server.modernai.workers.dev |
| `io.github.monriah-studio/sec-edgar-mcp` | SEC filings, insider trades and XBRL financials of US companies | https://sec-edgar-api.kidriahx.workers.dev/mcp |
| `io.github.mrpkk/ailegal-mcp` | Verified legal provisions for RU, IN, US, UK, CA, HK | https://ailegal.legal/api/mcp/ |
| `io.github.MyDramaDB/mydramadb` | Korean drama titles, cast, episodes and actor filmographies | https://mydramadb.com/mcp |
| `io.github.mzizi-dev/mzizi-mcp` | Mzizi design system components, tokens, crates and docs | https://mcp.mzizi.dev/mcp |
| `io.github.Nadeus/toolradar` | Software tool details, verified pricing, comparisons and alternatives | https://toolradar.com/api/mcp |
| `io.github.naithan20/agentgraph` | Directory of MCP servers and agents by capability | https://agentgraph-new.vercel.app/api/mcp |
| `io.github.nalegaluorg/nalegalu` | Polish statutes and case law, article-level | https://mcp.nalegalu.org/mcp |
| `io.github.Natden444/pickanagency` | Directory of 47,000 marketing agencies with profiles | https://www.pickanagency.com/api/mcp/mcp |
| `io.github.natewhi/moltspace` | Directory of AI agents and their capabilities | https://moltspace.lol/mcp |
| `io.github.NavtejDhillon/grants` | New Zealand community grant funders, deadlines and application questions | https://funding.alltoohuman.nz/mcp |
| `io.github.NBrangerF/kebiao` | China compulsory-education curriculum standards and textbook alignments | https://www.kebiao.org/mcp |
| `io.github.neat-cyber/agent-signals` | French public procurement notices from official BOAMP data | https://agent-signals.saromy-export.workers.dev/mcp |
| `io.github.neerajsohal/slate` | Electrik Slate Blade component documentation and blocks | https://mcp.slate.electrik.dev |
| `io.github.NeoDemosHQ/neodemos` | Dutch municipal council records and civic documents | https://mcp.neodemos.nl/public/mcp |
| `io.github.NeousAxis/aya-registry` | Registry of 367,000 verified businesses worldwide | https://ai-visionary.xyz/agents/mcp |
| `io.github.newspacemarket-com/mrd` | Spacecraft component specs from vendor datasheets | https://newspacemarket.com/mrd-connect/mcp |
| `io.github.nibinglobal/yugalinks-commerce` | OECD trade flows by country, product and corridor | https://www.yugalinks.com/mcp |
| `io.github.nicoletterankin/orb-platform` | English word definitions, related words and vocabulary lessons | https://wordorb.ai/mcp |
| `io.github.nifrajs/nifra-docs` | Nifra framework docs, code examples and TypeScript API types | https://mcp.nifra.dev |
| `io.github.nikolai-shilin/iyt-test` | IYT sailing exam questions, Racing Rules and theory notes | https://iyt.rycrentals.com/api/mcp |
| `io.github.Nimistu/dokumendiregister-mcp` | Estonian public authority documents and links to companies | https://dokumendiregister.ee/api/dokreg-mcp/mcp |
| `io.github.Nimistu/lahend-mcp` | Estonian court decisions and statutes with citation links | https://lahend.ee/api/lahend-mcp/mcp |
| `io.github.nimitt-IN/india-cyber-regulations` | Indian cyber regulations and incident-reporting deadlines in India, US, EU | https://www.bitscore.in/mcp |
| `io.github.nirajagarwal/bible-mcp` | Bible text, Greek and Hebrew interlinear data, cross-references | https://bible-mcp-server.fly.dev/mcp |
| `io.github.NitroRCr/gread` | Source code and docs of public GitHub repositories | https://api.gread.dev/mcp |
| `io.github.Noah-Airmet/lectern` | Public-domain Latter-day Saint and Christian scholarship, page-level citations | https://lectern-api.restorationcommons.org/mcp |
| `io.github.Noah-Airmet/pulpit` | LDS General Conference talks since 1830, searchable and quote-verified | https://mcp.pulpit-archive.org/mcp |
| `io.github.notforhumansfun-rgb/not-for-humans` | NFH project knowledge, ownership epochs and learning documents | https://mcp.notforhumans.fun/mcp |
| `io.github.Notzeiro/sharkpos` | SharkPOS API docs for Chilean SII electronic invoices and receipts | https://api.sharkpos.cl/mcp |
| `io.github.nu-people/nue-people-jobs` | Open jobs at nu people with contract types and skills | https://www.nuepeople.com/mcp |
| `io.github.Nutlope/inspo` | Real production websites with palettes, fonts and design analysis | https://inspomcp.dev/api/mcp |
| `io.github.Nuvraxis/nuvui` | nuvui React UI library docs, blocks, charts and design tokens | https://nuvui.nuvraxis.com/mcp |
| `io.github.nyuchi/nyuchi-docs` | Nyuchi product documentation from docs.nyuchi.com | https://docs.nyuchi.com/mcp |
| `io.github.nyyhao/aiagentslisting` | Directory of AI agents, MCP servers and skills | https://aiagentslisting.com/api/mcp |
| `io.github.OCArk/coinverdict` | Daily crypto research verdicts, key levels and track records for coins | https://mcp.coinverdict.io/mcp |
| `io.github.oculonlive/oculon` | OSINT on scams, CVEs, wallets, outages, hazards, ships and aircraft | https://mcp.oculon.live |
| `io.github.ofershap/recipe-library` | Hebrew AI-agent recipes with full text | https://recipes.gitshow.dev/mcp |
| `io.github.ofir09/tendy` | Open Israeli public tenders, requirements, deadlines and documents | https://tendy.co.il/mcp |
| `io.github.OjasKord/tender-mcp` | Active government tenders in UK, EU and US | https://tender-mcp-production.up.railway.app |
| `io.github.on-munseo/on-geungeo` | Korean statutes verbatim, medical law amendments, citation checks | https://onmunseo.kr/mcp/law |
| `io.github.ondraulehla/mcpcost` | Health and token cost of remote MCP registry servers | https://mcpcost.ulehla.dev/mcp |
| `io.github.onehumanbeing/hack123` | Hackathons, team-up posts and projects listed on Hack123 | https://hack123.henryht.sh/api/mcp |
| `io.github.op0ai/iconlab` | Over 324,000 Lucide-style icons as SVG | https://iconlab.skillkit.run/mcp |
| `io.github.open-mtor-atlas/mtor-atlas` | mTOR pathway studies, entities, claims and evidence labels | https://mtor-atlas-mcp.mtor-atlas.workers.dev/mcp |
| `io.github.OpenConverters/kelvin` | Power electronics component specs, selection and cross-references | https://kelvin.openconverters.com/mcp |
| `io.github.OptimNow/cloud-finops` | Cloud cost optimization guidance and waste-fixing runbooks | https://mcp.optimnow.io/mcp |
| `io.github.OrderlyNetwork/orderly-mcp` | Orderly Network documentation, contracts and SDK patterns | https://mcp.orderly.network/ |
| `io.github.orhansavash/zentria-flow-mcp` | US import tariff layers by HTS code and country of origin | https://zentriaflow.com/mcp |
| `io.github.outdoorithm/outdoorithm` | US campgrounds with availability, weather, safety and gear info | https://mcp.outdoorithm.com/mcp |
| `io.github.papjuli/xkcdai` | xkcd comics found by semantic search | https://xkcdai.onrender.com/mcp |
| `io.github.paradedb/mcp` | ParadeDB documentation, tutorials and examples | https://www.paradedb.com/mcp |
| `io.github.parallect/prxhub` | Shared research bundles and extracted claims on prxhub | https://prxhub.com/api/mcp |
| `io.github.parkragsterman/whyismy-org` | Sourced answers to everyday why-is-my questions on health, home, cars | https://whyismy.org/mcp |
| `io.github.pat-the-cat-cat/askbestie-beauty` | Makeup and beauty product popularity rankings and prices | https://askbestie.me/mcp |
| `io.github.pat-the-cat-cat/part-guide-ai` | AI models and tools popularity rankings and attributes | https://part.guide/ai/mcp |
| `io.github.paulieb89/pinescript-mcp` | Pine Script v6 documentation, functions and error explanations | https://pinescript-mcp.fly.dev/mcp |
| `io.github.paulieb89/uk-legal-mcp` | UK case law, legislation, Hansard debates, bills, votes, HMRC guidance | https://uk-legal-mcp.fly.dev/mcp |
| `io.github.pawel-kowalczyk/harness-atlas` | Wire-harness manufacturers, equipment suppliers, and component part equivalents | https://harnessatlas.com/api/mcp |
| `io.github.pcameron80/paintcolorhq-mcp` | Paint colors across 13 brands and closest cross-brand matches | https://www.paintcolorhq.com/api/mcp |
| `io.github.pcfhub/pcfhub` | Power Apps PCF controls and their documentation | https://pcfhub.dev/mcp |
| `io.github.pcmarts/recruiter-roles-mcp` | Recruiter and talent acquisition job listings and market stats | https://recruiterroles.com/api/mcp |
| `io.github.pdhimal1/askcradle` | Reviewed parenting guides from pregnancy through preschool | https://www.askcradle.com/mcp |
| `io.github.peterloomans/equivista` | Belgian company registry data, financials and relationships | https://equivista.be/mcp |
| `io.github.petitsolu/solubles` | French solutions journalism podcast on ecology, climate and society | https://mcp.csoluble.media/api/mcp |
| `io.github.pguerrerolinares/bizkaia-now` | Cultural and nightlife events in the Basque Country | https://euskadinow.com/mcp |
| `io.github.PilotSuite/crystalram-open-commons` | CrystalRAM public AI research cycles and Open Commons discussion threads | https://crystalram.ai/mcp |
| `io.github.pinkpwningclub/recipes` | Software options catalog and reproducible AI agent workflow recipes | https://softwaresausage.com/api/mcp |
| `io.github.pipeworx-io/abn-lookup` | Australian business register entities by ABN, ACN or name | https://gateway.pipeworx.io/abn-lookup/mcp |
| `io.github.pipeworx-io/alaska-code` | Alaska state statutes text by citation and topic | https://gateway.pipeworx.io/alaska-code/mcp |
| `io.github.pipeworx-io/altos` | US housing market inventory, prices, listings and pending sales | https://gateway.pipeworx.io/altos/mcp |
| `io.github.pipeworx-io/american-samoa-code` | American Samoa Code Annotated sections by citation or topic | https://gateway.pipeworx.io/american-samoa-code/mcp |
| `io.github.pipeworx-io/arcgis-hub` | Open government geospatial datasets and feature layer records | https://gateway.pipeworx.io/arcgis-hub/mcp |
| `io.github.pipeworx-io/ares-cz` | Czech companies by IČO or name, VAT reliability status | https://gateway.pipeworx.io/ares-cz/mcp |
| `io.github.pipeworx-io/arkansas-code` | Arkansas statutes text and felony sentencing guidelines | https://gateway.pipeworx.io/arkansas-code/mcp |
| `io.github.pipeworx-io/arquivo-pt` | Archived Portuguese web pages since 1996, full text | https://gateway.pipeworx.io/arquivo-pt/mcp |
| `io.github.pipeworx-io/arxiv` | arXiv preprint papers metadata and abstracts | https://gateway.pipeworx.io/arxiv/mcp |
| `io.github.pipeworx-io/asub-ax` | Official statistics tables for Åland Islands | https://gateway.pipeworx.io/asub-ax/mcp |
| `io.github.pipeworx-io/at-ris` | Austrian federal law provisions and court decisions | https://gateway.pipeworx.io/at-ris/mcp |
| `io.github.pipeworx-io/banking-regulations` | US banking and consumer finance regulations in 12 CFR | https://gateway.pipeworx.io/banking-regulations/mcp |
| `io.github.pipeworx-io/bing-news` | Recent news articles matching keywords | https://gateway.pipeworx.io/bing-news/mcp |
| `io.github.pipeworx-io/bnr-ro` | National Bank of Romania official exchange rates, current and historical | https://gateway.pipeworx.io/bnr-ro/mcp |
| `io.github.pipeworx-io/boardgamegeek` | Board game details, ratings, ranks and trending games | https://gateway.pipeworx.io/boardgamegeek/mcp |
| `io.github.pipeworx-io/brave-search` | General web pages and news via Brave's independent search index | https://gateway.pipeworx.io/brave-search/mcp |
| `io.github.pipeworx-io/brokercheck` | FINRA broker and firm registrations, employment history, disciplinary disclosures | https://gateway.pipeworx.io/brokercheck/mcp |
| `io.github.pipeworx-io/cali-elangdell` | Free Creative Commons US law school casebooks and course materials | https://gateway.pipeworx.io/cali-elangdell/mcp |
| `io.github.pipeworx-io/california-tax-appeals` | California Office of Tax Appeals opinions by statute or topic | https://gateway.pipeworx.io/california-tax-appeals/mcp |
| `io.github.pipeworx-io/censys` | Internet host scans, open services, and TLS certificate data | https://gateway.pipeworx.io/censys/mcp |
| `io.github.pipeworx-io/china-news` | News coverage from Chinese, Hong Kong, and Taiwanese publishers | https://gateway.pipeworx.io/china-news/mcp |
| `io.github.pipeworx-io/china-tax-policy` | Chinese tax laws, rules, and State Taxation Administration announcements | https://gateway.pipeworx.io/china-tax-policy/mcp |
| `io.github.pipeworx-io/chrome-web-store` | Chrome extension listings, ratings, user counts, and publishers | https://gateway.pipeworx.io/chrome-web-store/mcp |
| `io.github.pipeworx-io/chronicling-america` | Full text of historical digitized US newspapers | https://gateway.pipeworx.io/chronicling-america/mcp |
| `io.github.pipeworx-io/circl-vulnerability-lookup` | CVE and security advisory vulnerability records by id or product | https://gateway.pipeworx.io/circl-vulnerability-lookup/mcp |
| `io.github.pipeworx-io/clinicaltables` | Medical codes: ICD-10, LOINC, drugs, conditions, NPI provider registry | https://gateway.pipeworx.io/clinicaltables/mcp |
| `io.github.pipeworx-io/clinicaltrials` | ClinicalTrials.gov trials, eligibility, sponsors, phases, and posted results | https://gateway.pipeworx.io/clinicaltrials/mcp |
| `io.github.pipeworx-io/cn-law` | Mainland China laws, regulations, judicial interpretations, and guiding cases | https://gateway.pipeworx.io/cn-law/mcp |
| `io.github.pipeworx-io/cnpj-br` | Brazilian company registry records by CNPJ number | https://gateway.pipeworx.io/cnpj-br/mcp |
| `io.github.pipeworx-io/commons-wikimedia` | Wikimedia Commons media files, licenses, metadata, and categories | https://gateway.pipeworx.io/commons-wikimedia/mcp |
| `io.github.pipeworx-io/congress` | US Congress bills, laws, votes, members and committees | https://gateway.pipeworx.io/congress/mcp |
| `io.github.pipeworx-io/congressional-documents` | Full text of congressional hearings, reports, and Congressional Record | https://gateway.pipeworx.io/congressional-documents/mcp |
| `io.github.pipeworx-io/copernicus-cds` | Copernicus climate datasets catalogue like ERA5 and CMIP6 projections | https://gateway.pipeworx.io/copernicus-cds/mcp |
| `io.github.pipeworx-io/core-research` | Open-access research papers with abstracts and full-text links | https://gateway.pipeworx.io/core-research/mcp |
| `io.github.pipeworx-io/cornell-wex` | US legal term definitions from Cornell LII Wex encyclopedia | https://gateway.pipeworx.io/cornell-wex/mcp |
| `io.github.pipeworx-io/court-listener` | US court opinions, case law, dockets, and federal court filings | https://gateway.pipeworx.io/court-listener/mcp |
| `io.github.pipeworx-io/cricsheet` | Cricket match scorecards, player stats, and head-to-head records | https://gateway.pipeworx.io/cricsheet/mcp |
| `io.github.pipeworx-io/crossref` | Academic publication metadata by DOI, title, or journal | https://gateway.pipeworx.io/crossref/mcp |
| `io.github.pipeworx-io/crs-reports` | Congressional Research Service policy analysis reports in full text | https://gateway.pipeworx.io/crs-reports/mcp |
| `io.github.pipeworx-io/crtsh` | TLS certificates and subdomains from Certificate Transparency logs | https://gateway.pipeworx.io/crtsh/mcp |
| `io.github.pipeworx-io/dart-kr` | Korean corporate disclosures, financials, shareholders and insider holdings | https://gateway.pipeworx.io/dart-kr/mcp |
| `io.github.pipeworx-io/datacite` | DOI metadata for research datasets, software and data repositories | https://gateway.pipeworx.io/datacite/mcp |
| `io.github.pipeworx-io/dbpedia` | Structured Wikipedia-derived facts about entities via SPARQL | https://gateway.pipeworx.io/dbpedia/mcp |
| `io.github.pipeworx-io/dc-code` | District of Columbia statutes full text by citation or topic | https://gateway.pipeworx.io/dc-code/mcp |
| `io.github.pipeworx-io/de-gesetze` | German federal statutes and ordinances, structure and provision text | https://gateway.pipeworx.io/de-gesetze/mcp |
| `io.github.pipeworx-io/delaware-code` | Delaware state statutes full text and keyword search | https://gateway.pipeworx.io/delaware-code/mcp |
| `io.github.pipeworx-io/diffbot` | Company profiles from Diffbot Knowledge Graph: employees, revenue, industry | https://gateway.pipeworx.io/diffbot/mcp |
| `io.github.pipeworx-io/earth-search` | Sentinel, Landsat and NAIP satellite imagery catalogue by area and date | https://gateway.pipeworx.io/earth-search/mcp |
| `io.github.pipeworx-io/ebi-ols` | Biomedical ontology terms, definitions and hierarchies like GO, MONDO | https://gateway.pipeworx.io/ebi-ols/mcp |
| `io.github.pipeworx-io/ecfr` | US Code of Federal Regulations text and search | https://gateway.pipeworx.io/ecfr/mcp |
| `io.github.pipeworx-io/eol` | Species pages, common names and taxonomy from Encyclopedia of Life | https://gateway.pipeworx.io/eol/mcp |
| `io.github.pipeworx-io/epa-regulations` | US EPA environmental regulations in 40 CFR | https://gateway.pipeworx.io/epa-regulations/mcp |
| `io.github.pipeworx-io/epstein` | House Oversight Epstein investigation documents and flight logs | https://gateway.pipeworx.io/epstein/mcp |
| `io.github.pipeworx-io/esma-firds` | EU financial instrument reference data and MiFID firm authorisations | https://gateway.pipeworx.io/esma-firds/mcp |
| `io.github.pipeworx-io/eu-funding-tenders` | EU funding calls, Horizon Europe topics and external-action tenders | https://gateway.pipeworx.io/eu-funding-tenders/mcp |
| `io.github.pipeworx-io/euipo` | EU trademarks, Community designs and Nice/Locarno classifications | https://gateway.pipeworx.io/euipo/mcp |
| `io.github.pipeworx-io/eur-lex` | EU legislation article text and CJEU court judgments | https://gateway.pipeworx.io/eur-lex/mcp |
| `io.github.pipeworx-io/faa-regulations` | US Federal Aviation Regulations text in 14 CFR | https://gateway.pipeworx.io/faa-regulations/mcp |
| `io.github.pipeworx-io/fcc-ecfs` | FCC docket filings, comments and proceedings | https://gateway.pipeworx.io/fcc-ecfs/mcp |
| `io.github.pipeworx-io/fcc-regulations` | US FCC telecommunications rules in 47 CFR, full text | https://gateway.pipeworx.io/fcc-regulations/mcp |
| `io.github.pipeworx-io/fda-regulations` | US FDA regulations in 21 CFR, full text | https://gateway.pipeworx.io/fda-regulations/mcp |
| `io.github.pipeworx-io/ferc-elibrary` | FERC energy regulatory dockets, filings and orders | https://gateway.pipeworx.io/ferc-elibrary/mcp |
| `io.github.pipeworx-io/form5500` | US employee benefit and pension plan Form 5500 filings | https://gateway.pipeworx.io/form5500/mcp |
| `io.github.pipeworx-io/fr-judilibre` | French Cour de cassation and appeal court decisions | https://gateway.pipeworx.io/fr-judilibre/mcp |
| `io.github.pipeworx-io/france-geodata` | French communes, buildings, land cover and flood risk zones | https://gateway.pipeworx.io/france-geodata/mcp |
| `io.github.pipeworx-io/georgia-code` | Georgia state statutes from the Official Code of Georgia | https://gateway.pipeworx.io/georgia-code/mcp |
| `io.github.pipeworx-io/gnews` | Global news articles and top headlines by keyword | https://gateway.pipeworx.io/gnews/mcp |
| `io.github.pipeworx-io/gov-uk-content` | UK government guidance, policy and HMRC internal tax manuals | https://gateway.pipeworx.io/gov-uk-content/mcp |
| `io.github.pipeworx-io/guam-code` | Guam territorial statutes from the Guam Code Annotated | https://gateway.pipeworx.io/guam-code/mcp |
| `io.github.pipeworx-io/gwas-catalog` | SNP trait associations and genome-wide association studies | https://gateway.pipeworx.io/gwas-catalog/mcp |
| `io.github.pipeworx-io/hackernews` | Hacker News stories and comment discussions | https://gateway.pipeworx.io/hackernews/mcp |
| `io.github.pipeworx-io/hal-fr` | French open research papers, authors and labs in HAL | https://gateway.pipeworx.io/hal-fr/mcp |
| `io.github.pipeworx-io/herb-tcm` | Traditional Chinese Medicine herbs, ingredients, targets, diseases and evidence | https://gateway.pipeworx.io/herb-tcm/mcp |
| `io.github.pipeworx-io/hk-companies` | Hong Kong new company registrations and name changes | https://gateway.pipeworx.io/hk-companies/mcp |
| `io.github.pipeworx-io/httpstatus` | HTTP status code meanings and categories | https://gateway.pipeworx.io/httpstatus/mcp |
| `io.github.pipeworx-io/hudoc` | European Court of Human Rights case law and judgments | https://gateway.pipeworx.io/hudoc/mcp |
| `io.github.pipeworx-io/iati-datastore` | International aid projects, donors and transactions worldwide | https://gateway.pipeworx.io/iati-datastore/mcp |
| `io.github.pipeworx-io/ieee-standards` | IEEE standards and Xplore papers, articles, conference proceedings metadata | https://gateway.pipeworx.io/ieee-standards/mcp |
| `io.github.pipeworx-io/ifsc-in` | Indian bank branch details from IFSC codes | https://gateway.pipeworx.io/ifsc-in/mcp |
| `io.github.pipeworx-io/igdb` | Video game catalogue: games, companies, platforms, release info | https://gateway.pipeworx.io/igdb/mcp |
| `io.github.pipeworx-io/illinois-code` | Illinois Compiled Statutes full text by citation or topic | https://gateway.pipeworx.io/illinois-code/mcp |
| `io.github.pipeworx-io/india-law` | Indian statutes, regulator rules, and Supreme and High Court judgments | https://gateway.pipeworx.io/india-law/mcp |
| `io.github.pipeworx-io/indiana-code` | Indiana Code statutes text, topic search, historical versions | https://gateway.pipeworx.io/indiana-code/mcp |
| `io.github.pipeworx-io/indonesia-law` | Indonesian national laws, regulations, and Constitutional Court reviews | https://gateway.pipeworx.io/indonesia-law/mcp |
| `io.github.pipeworx-io/ip-australia` | Australian patents, trade marks and designs register records | https://gateway.pipeworx.io/ip-australia/mcp |
| `io.github.pipeworx-io/it-admin-courts` | Italian Consiglio di Stato and TAR administrative court rulings | https://gateway.pipeworx.io/it-admin-courts/mcp |
| `io.github.pipeworx-io/itunes-search` | Apple catalog of music, podcasts, apps, books, movies | https://gateway.pipeworx.io/itunes-search/mcp |
| `io.github.pipeworx-io/japan-law` | Japanese national laws and ordinances full text | https://gateway.pipeworx.io/japan-law/mcp |
| `io.github.pipeworx-io/jhtdb` | Reference turbulence simulation data values from Johns Hopkins databases | https://gateway.pipeworx.io/jhtdb/mcp |
| `io.github.pipeworx-io/kegg` | KEGG genes, pathways, compounds, drugs, diseases, enzymes | https://gateway.pipeworx.io/kegg/mcp |
| `io.github.pipeworx-io/kokkai-diet` | Japanese National Diet parliamentary speeches and meetings since 1947 | https://gateway.pipeworx.io/kokkai-diet/mcp |
| `io.github.pipeworx-io/kosis-kr` | South Korean official statistics tables and time series | https://gateway.pipeworx.io/kosis-kr/mcp |
| `io.github.pipeworx-io/kr-law` | South Korean national statutes, articles, and revision history | https://gateway.pipeworx.io/kr-law/mcp |
| `io.github.pipeworx-io/law-commission` | Law Commission England and Wales reform reports and consultations | https://gateway.pipeworx.io/law-commission/mcp |
| `io.github.pipeworx-io/law-feeds` | Curated law and courts news feeds | https://gateway.pipeworx.io/law-feeds/mcp |
| `io.github.pipeworx-io/louisiana-code` | Louisiana statutes, civil code, procedure codes and legislative bills | https://gateway.pipeworx.io/louisiana-code/mcp |
| `io.github.pipeworx-io/lyrics-ovh` | Song lyrics by artist and title | https://gateway.pipeworx.io/lyrics-ovh/mcp |
| `io.github.pipeworx-io/macvendors` | Hardware manufacturer for a MAC address OUI | https://gateway.pipeworx.io/macvendors/mcp |
| `io.github.pipeworx-io/marginalia` | Independent non-commercial web pages, personal sites, technical writing | https://gateway.pipeworx.io/marginalia/mcp |
| `io.github.pipeworx-io/massachusetts-code` | Massachusetts General Laws statute text by citation or topic | https://gateway.pipeworx.io/massachusetts-code/mcp |
| `io.github.pipeworx-io/mdn-search` | MDN web docs and browser compatibility data | https://gateway.pipeworx.io/mdn-search/mcp |
| `io.github.pipeworx-io/michigan-code` | Michigan Compiled Laws and Michigan Administrative Code rules | https://gateway.pipeworx.io/michigan-code/mcp |
| `io.github.pipeworx-io/monarch-initiative` | Diseases, genes, phenotypes and their associations in biomedical knowledge graph | https://gateway.pipeworx.io/monarch-initiative/mcp |
| `io.github.pipeworx-io/movies` | Movie details and TV show facts, episodes, schedules | https://gateway.pipeworx.io/movies/mcp |
| `io.github.pipeworx-io/msha-mines` | US mine records, inspections, violations and penalties from MSHA | https://gateway.pipeworx.io/msha-mines/mcp |
| `io.github.pipeworx-io/mygene-info` | Gene annotations, identifiers and species taxonomy | https://gateway.pipeworx.io/mygene-info/mcp |
| `io.github.pipeworx-io/nber-macrohistory` | Historical US macroeconomic time series from NBER archive | https://gateway.pipeworx.io/nber-macrohistory/mcp |
| `io.github.pipeworx-io/ncbi-datasets` | NCBI genome assemblies, gene records and organism taxonomy | https://gateway.pipeworx.io/ncbi-datasets/mcp |
| `io.github.pipeworx-io/ncbi-eutils` | PubMed, gene, nucleotide and GEO records across Entrez databases | https://gateway.pipeworx.io/ncbi-eutils/mcp |
| `io.github.pipeworx-io/nci-evs` | NCI Thesaurus cancer research concepts, codes and hierarchies | https://gateway.pipeworx.io/nci-evs/mcp |
| `io.github.pipeworx-io/new-jersey-code` | New Jersey statutes text with amendment history and topic search | https://gateway.pipeworx.io/new-jersey-code/mcp |
| `io.github.pipeworx-io/new-mexico-code` | New Mexico Statutes Annotated 1978 sections and chapters | https://gateway.pipeworx.io/new-mexico-code/mcp |
| `io.github.pipeworx-io/new-york-code` | New York Consolidated Laws statute text by citation | https://gateway.pipeworx.io/new-york-code/mcp |
| `io.github.pipeworx-io/nih-reporter` | NIH-funded research grants, funding history and linked publications | https://gateway.pipeworx.io/nih-reporter/mcp |
| `io.github.pipeworx-io/nihr` | UK NIHR health research awards, funding and award holders | https://gateway.pipeworx.io/nihr/mcp |
| `io.github.pipeworx-io/nl-rechtspraak` | Dutch court decisions full text by ECLI or court | https://gateway.pipeworx.io/nl-rechtspraak/mcp |
| `io.github.pipeworx-io/nlrb` | US NLRB labor cases, unfair labor practice charges, elections | https://gateway.pipeworx.io/nlrb/mcp |
| `io.github.pipeworx-io/north-carolina-code` | North Carolina General Statutes and state constitution text | https://gateway.pipeworx.io/north-carolina-code/mcp |
| `io.github.pipeworx-io/octopart` | Electronic component specs, distributor pricing and availability | https://gateway.pipeworx.io/octopart/mcp |
| `io.github.pipeworx-io/oeis` | Integer sequences, definitions and terms from OEIS | https://gateway.pipeworx.io/oeis/mcp |
| `io.github.pipeworx-io/oklahoma-code` | Oklahoma Statutes text, full-text search and titles | https://gateway.pipeworx.io/oklahoma-code/mcp |
| `io.github.pipeworx-io/openaire` | EU research publications, datasets, software and funded projects | https://gateway.pipeworx.io/openaire/mcp |
| `io.github.pipeworx-io/openfda` | FDA drug adverse events, approvals, labels, recalls, shortages | https://gateway.pipeworx.io/openfda/mcp |
| `io.github.pipeworx-io/openfoodtox` | EFSA toxicological reference values for chemicals in food and feed | https://gateway.pipeworx.io/openfoodtox/mcp |
| `io.github.pipeworx-io/openremedies` | Sourced treatments, approved medicines, off-label uses and trials per condition | https://gateway.pipeworx.io/openremedies/mcp |
| `io.github.pipeworx-io/opentargets` | Disease, drug target and drug associations from Open Targets | https://gateway.pipeworx.io/opentargets/mcp |
| `io.github.pipeworx-io/openverse` | Creative Commons licensed images and audio with attribution details | https://gateway.pipeworx.io/openverse/mcp |
| `io.github.pipeworx-io/pakistan-law` | Pakistan federal statutes, Act sections and High Court judgments | https://gateway.pipeworx.io/pakistan-law/mcp |
| `io.github.pipeworx-io/paperswithcode` | Machine learning research papers, trending papers and code implementations | https://gateway.pipeworx.io/paperswithcode/mcp |
| `io.github.pipeworx-io/peeringdb` | Internet networks, ASNs, exchanges and colocation facilities | https://gateway.pipeworx.io/peeringdb/mcp |
| `io.github.pipeworx-io/peppol` | Peppol e-invoicing participant registrations and accepted document types | https://gateway.pipeworx.io/peppol/mcp |
| `io.github.pipeworx-io/pipeworx-faq` | Pipeworx product info, pricing, limits and setup guides | https://gateway.pipeworx.io/pipeworx-faq/mcp |
| `io.github.pipeworx-io/planetary-computer` | Satellite imagery and Earth-observation datasets from Microsoft Planetary Computer | https://gateway.pipeworx.io/planetary-computer/mcp |
| `io.github.pipeworx-io/plos` | Open-access scientific articles across all PLOS journals | https://gateway.pipeworx.io/plos/mcp |
| `io.github.pipeworx-io/poshmark-comps` | Poshmark sold and active listing prices for resale items | https://gateway.pipeworx.io/poshmark-comps/mcp |
| `io.github.pipeworx-io/pubtator` | Biomedical entities, relations and annotated PubMed literature | https://gateway.pipeworx.io/pubtator/mcp |
| `io.github.pipeworx-io/puerto-rico-code` | Puerto Rico statutes and laws text by citation or keyword | https://gateway.pipeworx.io/puerto-rico-code/mcp |
| `io.github.pipeworx-io/reactome` | Biological pathways, reactions and participating molecules from Reactome | https://gateway.pipeworx.io/reactome/mcp |
| `io.github.pipeworx-io/realestateapi` | US property details, owners, values, sales and mortgages | https://gateway.pipeworx.io/realestateapi/mcp |
| `io.github.pipeworx-io/reddit-archive` | Historical Reddit posts, comments and subreddit activity since 2005 | https://gateway.pipeworx.io/reddit-archive/mcp |
| `io.github.pipeworx-io/regulations-gov` | US federal regulatory dockets, rule documents and public comments | https://gateway.pipeworx.io/regulations-gov/mcp |
| `io.github.pipeworx-io/research-chain` | Open full text, license, datasets, code and citations for papers | https://gateway.pipeworx.io/research-chain/mcp |
| `io.github.pipeworx-io/retractions` | Retracted scientific papers and retraction status by DOI | https://gateway.pipeworx.io/retractions/mcp |
| `io.github.pipeworx-io/rhode-island-code` | Rhode Island General Laws statute text by citation | https://gateway.pipeworx.io/rhode-island-code/mcp |
| `io.github.pipeworx-io/ror` | Research organizations registry: universities, institutes, funders, identifiers | https://gateway.pipeworx.io/ror/mcp |
| `io.github.pipeworx-io/scotcourts` | Scottish court and tribunal judgments since 1999 | https://gateway.pipeworx.io/scotcourts/mcp |
| `io.github.pipeworx-io/sec-adv` | SEC Form ADV investment adviser firms and representatives | https://gateway.pipeworx.io/sec-adv/mcp |
| `io.github.pipeworx-io/sec-insider` | SEC Form 4 insider stock purchases and sales | https://gateway.pipeworx.io/sec-insider/mcp |
| `io.github.pipeworx-io/sec-regulations` | US securities regulations text in 17 CFR | https://gateway.pipeworx.io/sec-regulations/mcp |
| `io.github.pipeworx-io/semanticscholar` | Academic papers, citations, and authors from Semantic Scholar | https://gateway.pipeworx.io/semanticscholar/mcp |
| `io.github.pipeworx-io/south-carolina-code` | South Carolina state statutes full text by citation | https://gateway.pipeworx.io/south-carolina-code/mcp |
| `io.github.pipeworx-io/south-dakota-code` | South Dakota codified laws by citation or topic | https://gateway.pipeworx.io/south-dakota-code/mcp |
| `io.github.pipeworx-io/stats-nz` | New Zealand official statistics datasets and census data | https://gateway.pipeworx.io/stats-nz/mcp |
| `io.github.pipeworx-io/studio-ghibli` | Studio Ghibli films, characters, locations, species, vehicles | https://gateway.pipeworx.io/studio-ghibli/mcp |
| `io.github.pipeworx-io/tatoeba` | Multilingual example sentences and their translations | https://gateway.pipeworx.io/tatoeba/mcp |
| `io.github.pipeworx-io/tax-regulations` | US Treasury IRS tax regulations in 26 CFR | https://gateway.pipeworx.io/tax-regulations/mcp |
| `io.github.pipeworx-io/texas-ag-opinions` | Texas Attorney General opinions, status, and statute interpretations | https://gateway.pipeworx.io/texas-ag-opinions/mcp |
| `io.github.pipeworx-io/themeparks` | Live theme park wait times, schedules, attraction data | https://gateway.pipeworx.io/themeparks/mcp |
| `io.github.pipeworx-io/trade-compliance` | US customs rulings and antidumping/countervailing duty orders | https://gateway.pipeworx.io/trade-compliance/mcp |
| `io.github.pipeworx-io/trademarks` | US federal trademark records, status, owners and prosecution history | https://gateway.pipeworx.io/trademarks/mcp |
| `io.github.pipeworx-io/trimet` | Portland TriMet live arrivals, stops, vehicles and service alerts | https://gateway.pipeworx.io/trimet/mcp |
| `io.github.pipeworx-io/tw-law` | Taiwan national statutes and Constitution text in Chinese and English | https://gateway.pipeworx.io/tw-law/mcp |
| `io.github.pipeworx-io/ucsc-genome` | Reference genome assemblies, annotation tracks and DNA sequences | https://gateway.pipeworx.io/ucsc-genome/mcp |
| `io.github.pipeworx-io/uk-caselaw` | Full text of UK court judgments and tribunal decisions | https://gateway.pipeworx.io/uk-caselaw/mcp |
| `io.github.pipeworx-io/uk-charity-commission` | Registered charities in England and Wales: details, finances, trustees | https://gateway.pipeworx.io/uk-charity-commission/mcp |
| `io.github.pipeworx-io/uk-trade-tariff` | UK commodity codes, import duty rates, VAT and tariff quotas | https://gateway.pipeworx.io/uk-trade-tariff/mcp |
| `io.github.pipeworx-io/uk-tribunals` | UK first-tier and upper tribunal decisions full text | https://gateway.pipeworx.io/uk-tribunals/mcp |
| `io.github.pipeworx-io/ukri-gtr` | UKRI research grants, funded organisations and resulting publications | https://gateway.pipeworx.io/ukri-gtr/mcp |
| `io.github.pipeworx-io/unpaywall` | Open-access status and free legal copies of papers by DOI | https://gateway.pipeworx.io/unpaywall/mcp |
| `io.github.pipeworx-io/us-national-archives` | US federal government permanent records and digitised archival files | https://gateway.pipeworx.io/us-national-archives/mcp |
| `io.github.pipeworx-io/utah-code` | Utah state statutes full text by citation or topic | https://gateway.pipeworx.io/utah-code/mcp |
| `io.github.pipeworx-io/valorant` | VALORANT agents, abilities, weapons and maps reference data | https://gateway.pipeworx.io/valorant/mcp |
| `io.github.pipeworx-io/vendor-signals` | Recent software vendor changelogs, release notes and announcements | https://gateway.pipeworx.io/vendor-signals/mcp |
| `io.github.pipeworx-io/w3c` | W3C and WHATWG web standards specifications and their status | https://gateway.pipeworx.io/w3c/mcp |
| `io.github.pipeworx-io/washington-code` | Washington state statutes, administrative rules and legislative bills | https://gateway.pipeworx.io/washington-code/mcp |
| `io.github.pipeworx-io/who-ictrp` | Clinical trial registrations from WHO international registries | https://gateway.pipeworx.io/who-ictrp/mcp |
| `io.github.pipeworx-io/wikidata` | Structured facts about entities from Wikidata | https://gateway.pipeworx.io/wikidata/mcp |
| `io.github.pipeworx-io/wikidata-sparql` | Wikidata structured facts via SPARQL queries, officeholders, classes | https://gateway.pipeworx.io/wikidata-sparql/mcp |
| `io.github.pipeworx-io/wikifeed` | Wikipedia on-this-day events, featured articles, most-read pages | https://gateway.pipeworx.io/wikifeed/mcp |
| `io.github.pipeworx-io/wikimedia-rest` | Wikipedia article summaries, full content, references and related pages | https://gateway.pipeworx.io/wikimedia-rest/mcp |
| `io.github.pipeworx-io/wikipathways` | Biological pathways mapping genes, proteins and metabolites | https://gateway.pipeworx.io/wikipathways/mcp |
| `io.github.pipeworx-io/wikipedia` | Wikipedia encyclopedic articles, summaries and full text | https://gateway.pipeworx.io/wikipedia/mcp |
| `io.github.pipeworx-io/wikiquote` | Sourced quotations from Wikiquote by person or topic | https://gateway.pipeworx.io/wikiquote/mcp |
| `io.github.pipeworx-io/wikiviews` | Wikipedia article pageview counts and most viewed articles | https://gateway.pipeworx.io/wikiviews/mcp |
| `io.github.pipeworx-io/wiktionary` | Word definitions, etymology and pronunciations from multilingual Wiktionary | https://gateway.pipeworx.io/wiktionary/mcp |
| `io.github.pipeworx-io/worldbank-climate` | Country historical climate observations and CMIP6 temperature and precipitation projections | https://gateway.pipeworx.io/worldbank-climate/mcp |
| `io.github.pipeworx-io/zillow` | US home values, rents and housing market metrics by region | https://gateway.pipeworx.io/zillow/mcp |
| `io.github.pjtribot-blip/socle-architecture` | 20th-21st century Baltic and Finnish buildings, architects, essay notes | https://pierrejeantribot.com/api/mcp |
| `io.github.ply-ui-ng/ply-ui` | Ply Angular and Tailwind UI components and usage | https://mcp.ply-ui.com/mcp |
| `io.github.pmndrs/docs` | Docs and examples for react-three-fiber, drei, zustand, jotai | https://docs.pmnd.rs/api/mcp |
| `io.github.pournasserian/mcp-my-site` | Content of one website indexed by a crawler | https://ai.pournasserian.com/mcp |
| `io.github.pradeep-anantha/venuvidya` | Carnatic flute lessons and syllabus in Kannada and English | https://venuvidya-backend-production.up.railway.app/api/mcp/ |
| `io.github.prakhar1605/carrerlift` | Indian jobs and internships, plus international intern roles | https://www.carrerlift.in/api/mcp |
| `io.github.praveenjuge/vadivam` | Outline icons searchable by name, tag or category | https://vadivam.praveenjuge.com/mcp |
| `io.github.privatebydefault/default-privacy` | How private apps are, privacy tools and breaches | https://mcp.defaultprivacy.com |
| `io.github.privatelawattorneys/wiki-private-law` | Residence programmes, tax regimes, banks and legal forms by country | https://wiki.private.law/mcp |
| `io.github.proa-web/docs` | Proa Rust framework documentation | https://proa.so/mcp |
| `io.github.psinglap/websearch-api-eval` | Benchmark results comparing You.com, Tavily, Exa and Parallel search APIs | https://websearch-api-eval.psberkeleymba.workers.dev/mcp |
| `io.github.QAInsights/jmeter-docs` | Apache JMeter documentation, properties, scripting recipes and error fixes | https://docs.jmeter.ai/api/mcp |
| `io.github.quantisnow/sec-edgar-mcp` | SEC EDGAR filings full text, insider trades, 13F, 8-K | https://www.quantisnow.com/api/v1/mcp |
| `io.github.quickman924/shanglan-womenswear` | Shanglan women's clothing factory profile, MOQ, styles and guides | https://customgarmentmanufacturer.com/api/mcp |
| `io.github.rabyavalla/lifestyle-medicine-knowledge` | ACLM lifestyle medicine guidance on diet, exercise and health | https://web-production-ae61.up.railway.app/mcp/lifestyle-medicine-knowledge |
| `io.github.rainbow686/china-export-rebate-mcp` | China export tax rebate rates by HS code | https://china-export-rebate-mcp.rainbow686.workers.dev/mcp |
| `io.github.rarasAI/raras` | Rare diseases, phenotypes, genes, Brazilian SUS coverage, trials, literature | https://raras.org/api/mcp |
| `io.github.Ravesteijntjes/qquickpick` | Movies and TV shows by mood, genre, cast, awards and streaming availability | https://qquickpick.com/mcp |
| `io.github.ray999/knowledge-graph` | Directory of AI tools, models and agents with community feedback | https://kg.zhiyong.dev/mcp |
| `io.github.RayceRossum/getregisters` | NDIS pricing, care and licensing rules with official citations and register previews | https://getregisters.com/api/v1/mcp |
| `io.github.rayhyman333-blip/cynthia` | Owner-verified facts and Planet Leads Academy course content | https://belong-blackjack-premium-painting.trycloudflare.com/mcp |
| `io.github.re-fagiano/bloodyhopes-campfire` | Historical ballads, lyrics and critical research corpus | https://bloodyhopes.com/mcp |
| `io.github.realist99/dolfdarts-mcp` | Rules, scoring and strategy for 200+ dart games | https://dolfdarts.com/mcp/mcp |
| `io.github.realmint-io/mcp` | Tokenized real-world assets scores and listings across chains | https://mcp.realmint.io/mcp |
| `io.github.reesehammer/umbra-mcp` | Umbra open SAR satellite imagery archive | https://api.umbra-py.space/mcp |
| `io.github.reunion-one/india-real-estate` | India RERA rules, stamp duty and registration charges by state | https://mcp.reunionhq.in/mcp |
| `io.github.revolist/revogrid-mcp` | RevoGrid data grid documentation and usage knowledge | https://mcp.rv-grid.com |
| `io.github.revolist/revogrid-mcp-pro` | RevoGrid DataGrid docs, examples, features and migration notes | https://mcp.rv-grid.com/pro |
| `io.github.rezearcher/jobs-mcp-server` | Live open job postings across company applicant tracking systems | https://assetfactory-jobs-x402.sigrunner.workers.dev/mcp |
| `io.github.rico-c/youshow-pte` | PTE Academic question types, samples, format and score requirements | https://pte.youshowedu.com/api/mcp |
| `io.github.rizwanqsf-sketch/promptbase-marketplace` | AI prompt products listed on PromptBase.art | https://promptbase.art/mcp |
| `io.github.rmngl/runchr` | Curated agent stacks with tools, prompts and install plans | https://api.runchr.com/mcp |
| `io.github.robd-hub/agent-report-card` | Independent A-F quality grades for AI agents | https://grader.designimp.com/api/mcp |
| `io.github.robertoyanguas-ops/arxiv-digest-mcp` | ArXiv AI, computer science and math papers | https://arxiv-digest-72343955726.us-central1.run.app/mcp/arxiv-digest |
| `io.github.robertoyanguas-ops/serp-extract-mcp` | Live web and news search results | https://serp-extract-72343955726.us-central1.run.app/mcp/serp-extract |
| `io.github.romulusfoundry/grantsonar` | Open US federal, state, and foundation grant opportunities | https://grantsonar.com/api/mcp |
| `io.github.RRGU26/bankregpulse-mcp-server` | US banking regulation news, digests and comment deadlines | https://lexregpulse.com/mcp |
| `io.github.rt1966/showmestepbystep` | 409 step-by-step how-to tutorials | https://www.showmestepbystep.com/api/mcp |
| `io.github.RustamIsmail/healthy-aging-atlas` | Evidence-ranked supplement research by health goal, with citations | https://healthyagingatlas.com/api/mcp/ |
| `io.github.saagpatel/portfolio-mcp` | Saagar Patel's essays, book chapters, projects and benchmark results | https://mcp.saagarpatel.dev/mcp |
| `io.github.sacrosaunt/redra` | Current class-action settlements with official source links | https://mcp.redra.ai/mcp |
| `io.github.Sagar27888/google-maps-mcp-server` | Business names, addresses, phones, ratings and hours from Google Maps | https://google-maps-mcp-server.vercel.app/mcp |
| `io.github.sam1siam/ruagentic-directory` | Directory of MCP servers, clients and AI agents | https://ruagentic.com/mcp |
| `io.github.sandeepkelvadi/marketing-skills-directory` | 340+ marketing and SEO skills for Claude Code | https://marketingskills.directory/wp-json/mkt/v1/mcp |
| `io.github.Santurce-Software-LLC/birds-of-puerto-rico` | Puerto Rico bird species guide entries and families | https://birdsofpuertorico.com/mcp |
| `io.github.SaqibNaseer404/wiselyarcade` | Free learning games catalog by age and skill | https://wiselyarcade.com/mcp |
| `io.github.sarthakjain004/headstart` | Tech job postings, hiring trends and role skill requirements | https://imposeidon-headstart-search.hf.space/mcp |
| `io.github.sathya-sankaran/twelveswaras` | Carnatic and Hindustani raaga scales, notes and identification | https://twelveswaras.com/mcp |
| `io.github.schedjoules/calendars` | Public holidays, school holidays, sports fixtures and TV schedules | https://www.schedjoules.com/mcp |
| `io.github.scraping-api-plans/web-data-plan-finder` | API plan pricing and conditions for scraping, search, TTS, email | https://plans.intoperson.com/mcp |
| `io.github.seanmeverett/evergences` | Evergences memos, site content, API guides and public agent memories | https://evergences.com/api/mcp/ |
| `io.github.sellrock-de/steamwebapi` | Steam Market API docs, schemas, products and games | https://mcp.steamwebapi.com/mcp |
| `io.github.servicewindowapp/servicewindow` | Southwest Florida food truck listings | https://krmfxedkxoyzkeqnijcd.supabase.co/functions/v1/mcp |
| `io.github.sha-net/community-board` | Local community listings, classifieds, services and events | https://mcp.shavitnetzer.com/mcp |
| `io.github.shawmena-dotcom/creative-commons-images` | Openly licensed images with license and credit lines | https://commonkite.cybermax-tools.workers.dev/mcp |
| `io.github.shibley/aisotools` | 3,000+ AI tools to search and compare | https://aisotools.com/api/mcp |
| `io.github.ShirishChinch/agentexchange` | Questions and answers written by AI agents on technical problems | https://yapperium.pages.dev/mcp |
| `io.github.shopsavvy/shopsavvy-mcp-server` | Product prices across retailers, price history, reviews and buying guides | https://api.shopsavvy.com/mcp |
| `io.github.Shuaigle/roomnology-forum` | Taiwanese Traditional Chinese community forum articles and comments | https://api.roomnology.com/mcp |
| `io.github.sigaihealth/cancer-support-hub` | Free cancer support resources across Washington State | https://cancersupport.sig.ai/api/mcp |
| `io.github.sigaihealth/ocean` | Marine datasets, ocean AI models, observations and forecasts | https://ocean.sig.ai/api/mcp |
| `io.github.simms2/pressbox-news-wire` | Published press releases and newsrooms with sources | https://pressbox.com/mcp |
| `io.github.simonwbird/roamworthy` | UK caravan, motorhome and campervan models and dealer stock | https://vemdbhnkofoolbwslqpj.supabase.co/functions/v1/mcp |
| `io.github.sina158/spectre-markets` | Daily gamma levels and session paths for NQ, ES, BTC, ETH | https://spectre.markets/mcp |
| `io.github.singularitystudiosdev/askagent` | Verbatim error messages with root causes and fixes | https://askagent.dev/mcp |
| `io.github.sirleroHQ/catalog` | Sirlero AI services, editorial stories and writers | https://sirlero.com/mcp |
| `io.github.sitebox/kids-stay` | Kid-friendly Japanese hotels with verified family facilities | https://mcp.kidsstay.workers.dev/mcp |
| `io.github.sitegpt/sitegpt-docs` | SiteGPT setup, features, API reference and troubleshooting | https://sitegpt.ai/docs/mcp |
| `io.github.skillselion/skillselion-mcp` | Community Claude Code skills, MCP servers and plugin marketplaces | https://mcp.skillselion.com/mcp |
| `io.github.sksareen/smartipedia-mcp` | Smartipedia AI-native open encyclopedia articles | https://smartipedia.com/mcp |
| `io.github.skylight-9/fixlore` | Agent-shared verified fixes for errors and troubleshooting problems | https://fix.mimxo.com/mcp |
| `io.github.SlambertDK/shelfatlas-catalog` | Danish grocery offers, prices, stores and products by EAN | https://api.shelfatlas.com/api/v1/mcp |
| `io.github.slshults/gpra-chord-charts` | Guitar chord diagrams for 12,708 chord names | https://mcp.guitarpracticeroutine.com/mcp |
| `io.github.slshults/shakespeare-monologues` | Shakespeare monologues, plays, paraphrases and summaries | https://mcp.shakespeare-monologues.org/mcp |
| `io.github.smukh/agent-arena` | On-chain ERC-8004 AI agent registry and reputation across chains | https://agentarena.site/api/mcp |
| `io.github.SoapyRED/freightutils` | ADR dangerous goods, HS codes, UN/LOCODE, Incoterms, airports, freight specs | https://www.freightutils.com/api/mcp |
| `io.github.sobuk2500-max/agent-bay` | Public agent questions, attempts and verified results | https://theagentsbay.com/mcp/public/ |
| `io.github.Solvelangseth/kildeverk` | Norwegian public data: statistics, weather, transit, laws, companies, parliament | https://kildeverk.fly.dev/mcp |
| `io.github.solvettle/solvettle` | Problems AI agents solved and confirmed fixes | https://solvettle.com/mcp |
| `io.github.sonpiaz/openaffiliate-mcp` | Affiliate programs and commission details | https://openaffiliate.dev/api/mcp |
| `io.github.SpaceFrontiers/mcp` | Cited search over papers, books, patents, standards and discussions | https://mcp.machinelibrary.ai/ |
| `io.github.Spacemandomains/mcp-registry-search` | Every MCP server listed in the official Model Context Protocol registry | https://mcpregistrysearchwilfredleejr.vercel.app/api/mcp |
| `io.github.speak-able/schoolorder-catalog` | AI and edtech subscriptions Korean schools can buy, with prices | https://schoolorder.kr/mcp |
| `io.github.spikinglabs/symbola` | Software build packs, their design decisions and build steps | https://symbola.sh/mcp |
| `io.github.spree/ecommerce-docs` | Spree Commerce developer docs for headless ecommerce | https://spreecommerce.org/docs/mcp |
| `io.github.Srikarmk/keystone` | What arXiv papers build on, dispute and assume, from LaTeX source | https://keystone-research.vercel.app/api/mcp |
| `io.github.stableotto/scrubshifts` | US nursing and allied-health job listings | https://scrubshifts.com/mcp |
| `io.github.stackwares/casama` | Casama documentation, API reference and gallery of bot add-ons | https://api.casama.ai/mcp/docs |
| `io.github.stand-out-of-my-sun/diogenes-neural-search-engine-mcp` | Web search results, research dossiers, news and citations | https://diogenesgateway.com/mcp/neural-search-engine |
| `io.github.steve-in-tandem/govcon-mcp` | US government contracting codes, FAR rules, set-asides and procurement portals | https://www.getintandem.io/api/mcp |
| `io.github.Steven3265/homechecker-guides` | Australian homebuyer guides and sourced property purchase checklists | https://mcp.homechecker.com.au/mcp |
| `io.github.Steven3265/moyneross` | Commercial property capital research and building element technical guidance | https://mcp.moyneross.com/mcp |
| `io.github.StonesofCreation/stackswap` | About 400 B2B go-to-market software tools: costs, vendors and overlaps | https://stackswap.ai/api/mcp |
| `io.github.StraightLineGolfPro/straight-line-golf-pro-mcp` | Straight Line Golf Pro public coaching pages and resources | https://straight-line-golf-pro-mcp.vercel.app/mcp |
| `io.github.StroybatPing/aicatalog` | Directory of thousands of AI tools with details and categories | https://aicatalog.com.ua/api/v1/mcp |
| `io.github.studioKR-0123/risingtests` | Fact answers checked against official sources, with source links | https://risingtests.com/mcp |
| `io.github.sunholo-data/ailang-docs` | AILANG language reference, stdlib, examples and benchmarks | https://mcp.ailang.sunholo.com/mcp/ |
| `io.github.SunRainSnow/labtestsuperstore` | US lab test catalog, collection sites and reference range context | https://labtestsuperstore-mcp.vercel.app/api/mcp |
| `io.github.superlabs-x/bitpal` | BitPal stablecoin checkout docs, API spec, webhooks and errors | https://mcp.bitpal.io/mcp |
| `io.github.superlowburn/agentrank` | MCP servers, agent tools, and skills ranked by maintenance signals | https://agentrank-ai.com/mcp |
| `io.github.SuresoftTechnologies/suresoft-cover` | SURESOFT COVER code coverage product features, editions and FAQ | https://apps.suresofttech.com/cover/mcp |
| `io.github.SuresoftTechnologies/suresoft-ct` | SURESOFT CT C/C++ unit and integration testing product details | https://apps.suresofttech.com/ct/mcp |
| `io.github.SuresoftTechnologies/suresoft-static` | SURESOFT STATIC static analysis product features and FAQ | https://apps.suresofttech.com/static/mcp |
| `io.github.sustany/casemagic` | US federal court case status, judges, dockets and deadlines | https://casemagic.ai/mcp |
| `io.github.svenkatreddy/ramayana-mcp` | Valmiki Ramayana verses in four languages | https://ramayana-mcp.vercel.app/api/mcp |
| `io.github.Swervie/swervie` | Cross-retailer product specs, scores, live prices and buy links | https://us-central1-swervie-prod.cloudfunctions.net/mcp |
| `io.github.TatianaTchouakam/jobmesh` | Open job postings aggregated from ATS and job boards worldwide | https://jobmesh.world/mcp |
| `io.github.tbrajkovic/fixatia-property-search` | European real estate auction properties by country, price, ROI | https://mcp.fixatia.com/api/mcp |
| `io.github.team-earth/datagraph` | Structured urban locality data for civic problem-solving | https://api.datagraph.city/mcp |
| `io.github.teamhandyapps-oss/postlaunchkit` | Reviewed free tools and product launch directories | https://postlaunchkit.com/mcp |
| `io.github.tensorpass/aiconnect-docs` | AI Connect SDK quickstarts, reference, wallet protocol and MCP tools | https://tensorpass.app/mcp |
| `io.github.TensorsWillFlow/verbaterm` | Citation-checked reviews of public company policies and terms | https://verbaterm.com/mcp |
| `io.github.tettertotter/fundinglandscape` | Open US grants, government contracts and private foundation giving | https://fundinglandscape.com/api/mcp |
| `io.github.thaohienhomes/pho-research-tools` | Verified scientific papers, evidence, datasets and research tools | https://mcp.pho.chat/mcp |
| `io.github.thechancerylaneproject/tclp-mcp` | Climate-aligned contract clauses from Chancery Lane Project | https://mcp.chancerylaneproject.org/mcp |
| `io.github.theguysaccount/3ndgam3` | Public research communities, agent activity, and discussion threads | https://3ndgam3.org/api/mcp |
| `io.github.theguysaccount/charitology` | Published charity research, nonprofit benefits and sources | https://os.charitology.org/mcp |
| `io.github.theguysaccount/impactline` | Enacted public laws and their implementation evidence | https://app.impactline.org/api/mcp |
| `io.github.theguysaccount/realrep` | Public civic records and World Bank indicators with citations | https://app.realrep.org/api/mcp |
| `io.github.theguysaccount/swissmote` | Published Swissmote job openings | https://api.swissmote.com/v2/api/public/mcp |
| `io.github.theguysaccount/unredactus` | Public document metadata and snapshot provenance | https://unredactus.com/api/mcp |
| `io.github.theindianappguy/gita-mahabharata-mcp` | Bhagavad Gita verses and Mahabharata passages in Sanskrit and English | https://dharma-mcp.iag.workers.dev/mcp |
| `io.github.theluckystrike/bank-check` | FDIC bank insurance status, history and deposit coverage | https://bank-check.zovo.one/mcp |
| `io.github.theluckystrike/charity-check` | US nonprofit tax status, finances and officer pay | https://charity-check.zovo.one/mcp |
| `io.github.theluckystrike/fdic-bank-health-financials-mcp` | FDIC bank insurance status, financials, failed banks and branches | https://fdic-bank-health-financials-mcp.lipmichal.workers.dev/mcp |
| `io.github.theluckystrike/flood-zone-lookup-fema-flood-map-mcp` | FEMA flood zones and insurance rules for US addresses | https://flood-zone-lookup-fema-flood-map-mcp.lipmichal.workers.dev/mcp |
| `io.github.theluckystrike/ip-lookup` | Ownership and network details for IP addresses | https://ip-lookup.zovo.one/mcp |
| `io.github.theluckystrike/lei-lookup` | Legal Entity Identifier records and renewal dates | https://lei-lookup.zovo.one/mcp |
| `io.github.theluckystrike/npi-lookup` | US healthcare provider NPI registry records | https://npi-lookup.zovo.one/mcp |
| `io.github.theluckystrike/ofac-screening` | OFAC sanctions list entries and name screening | https://ofac-screening.zovo.one/mcp |
| `io.github.theluckystrike/paper-finder` | Academic papers, citation counts and references from Crossref | https://paper-finder.zovo.one/mcp |
| `io.github.theluckystrike/tariff-lookup` | US HTS import tariff codes and duty rates | https://tariff-lookup.zovo.one/mcp |
| `io.github.TheRundown/documentation` | Official TheRundown sports data API documentation | https://docs.therundown.io/mcp |
| `io.github.thiazzz/maker-machines-atlas` | Maker machine research, comparisons and buying guidance | https://makermachinesatlas.com/mcp |
| `io.github.thiazzz/smart-glasses-atlas` | Smart glasses specifications, comparisons, and regional retailer links | https://smartglassesatlas.com/mcp |
| `io.github.thunderbid/socketlist-mcp` | Directory of 800+ open-source MCP servers with install configs | https://socketlist.pages.dev/mcp |
| `io.github.timescale/pg-aiguide` | PostgreSQL documentation, best practices and ecosystem tools | https://mcp.tigerdata.com/docs |
| `io.github.tinh2/skills-hub` | Catalog of AI agent skills with details and instructions | https://api.skills-hub.ai/mcp |
| `io.github.tintun2602/veldora` | Norwegian companies, tenders, addresses, laws and exchange rates | https://veldora.no/mcp |
| `io.github.tinyprocessing/hirelog` | Hiring processes, ATS quirks and red flags by company | https://hirelog.dev/mcp |
| `io.github.tiptreesystems/lacuna-research-mcp` | ML research papers, directions, authors, venues and benchmarks | https://lacuna.tiptreesystems.com/api/mcp |
| `io.github.tireniajilore/nycfoodie` | Editorial NYC restaurant recommendations, guides and ratings | https://nycfoodie-production.up.railway.app/mcp |
| `io.github.TJLDC/unmei-tarot-mcp` | Rider-Waite-Smith tarot card meanings in Japanese and English | https://www.unmei-tarot.com/api/mcp |
| `io.github.togo-framework/togo` | ToGO Go and React framework docs and plugins | https://mcp.to-go.dev/mcp |
| `io.github.tonbistudio/agentwikis-mcp` | Curated agent-readable wikis and skills with provenance | https://agentwikis.com/mcp |
| `io.github.tony88pisa/jarvis-tools` | Web research across GitHub, Hacker News, Wikipedia, arXiv | https://jarvis-proxy.jarvis-studio.workers.dev/mcp |
| `io.github.TonyChen56/paperbanana-prompts` | Research figure prompt templates from PaperBanana | https://paperbanana-prompts-mcp.873217126.workers.dev/mcp |
| `io.github.TravelType/travel-poi` | Global cities, countries and travel points of interest | https://mcp.traveltype.app |
| `io.github.tresor4k/leavesheet-certified-payroll` | Davis-Bacon prevailing wage determinations and certified payroll rules | https://app.tabletemplates.com/api/mcp |
| `io.github.trip2g/trip2g` | Markdown notes folder served with search and sourced answers | https://trip2g.com/_system/mcp |
| `io.github.troyhunt/hibp` | Data breach exposure for emails, domains and passwords | https://haveibeenpwned.com/mcp |
| `io.github.trymhaak/microsoftradar` | Microsoft service status, incident timelines and product changes | https://microsoftradar.com/mcp |
| `io.github.u00dxk2/agentic-directory` | Directory of agentic AI tools with comparisons | https://agentic.ai/mcp |
| `io.github.ukmgranger/agent-commons` | Agent-shared reusable findings and open research questions | https://agent-commons.martin-granger-44f.workers.dev/mcp |
| `io.github.unibio-intelligence/biomedmcp` | Genes, drugs, diseases, variants, clinical trials and biomedical literature | https://biomedmcp.unibiointelligence.com/mcp |
| `io.github.unicodef1wn/nopaywall` | Verified free AI offers, student plans and free model APIs | https://nopaywall.io/mcp |
| `io.github.UnityNodes/blobpedia` | Celestia proposals, docs, forum threads and whitepapers | https://blobpedia.org/mcp |
| `io.github.UnityNodes/canton-ccpedia` | Canton Network proposals, docs, forum threads and whitepapers | https://ccpedia.xyz/mcp |
| `io.github.UnityNodes/near-pedia` | NEAR Protocol docs, deprecations, governance, standards and ecosystem projects | https://near-pedia.xyz/mcp |
| `io.github.upstash/context7` | Up-to-date library and framework documentation | https://mcp.context7.com/mcp |
| `io.github.usliberty/joint-genesis-mcp` | Physician reviewed research on joint pain and osteoarthritis | https://mcp.usliberty.com/mcp |
| `io.github.utilify-io/utilify-mcp` | Texas utility providers, plans and pricing by address | https://utilify.io/mcp |
| `io.github.ux-llc/uxsearch` | US government auction sold prices, live auctions and buying guides | https://uxsearch.app/mcp |
| `io.github.vanshulgoyal101/ctx` | GitHub repository code and documentation site passages | https://ctx.vanshul.com/mcp |
| `io.github.vecture-be/belgium-data-desk` | Belgian open datasets, Statbel statistics, air, rivers, weather, trains | https://data.vecture.be/mcp |
| `io.github.vhspace/agentbase` | Knowledge shared by AI agents on bugs and workarounds | https://mcp.agentbase.tools/mcp |
| `io.github.viren040/trucommerce-catalogue` | Indian brand product identities with official source links | https://trucommerce-catalogue-pilot.netlify.app/mcp |
| `io.github.voidly-ai/voidly-hosted` | Global internet censorship index, country status, and incidents | https://api.voidly.ai/mcp |
| `io.github.Vonage/vonage-documentation-mcp` | Vonage API documentation, SDKs, tutorials and troubleshooting | https://documentation-mcp.vonage.dev/mcp |
| `io.github.VrilLabs/vercel-oss-registry` | Projects funded by the Vercel Open Source Program | https://vercel-oss.vril.dev/mcp |
| `io.github.Vuena/vuena-assets` | Free CC0 low-poly 3D game models catalog | https://vuena-assets.test-games.workers.dev/mcp |
| `io.github.Vultax/vultax-research` | Published crypto and prediction-market studies and datasets | https://vultax.com/vi-mcp |
| `io.github.warao-shikyo/joino-japan-events` | Local events, festivals and tourist spots across Japan | https://joino.me/mcp |
| `io.github.wdfdaivd/anclum` | Catalogue of MCP servers, agent skills and AI tools | https://anclum.com/mcp |
| `io.github.wellknownmcp/ia-asso` | 1.26M active French associations from the official RNA registry | https://ia-asso.fr/api/mcp |
| `io.github.wescorp/grandpasai` | Research articles on age reversal, robotics, AI, and space | https://grandpasai.com/mcp |
| `io.github.Witzelfitz/regiobrett` | Events, courses and local offers in Eastern Switzerland | https://regiobrett.ch/api/mcp |
| `io.github.wjabrac/xomni-market` | AI capabilities on AWS Marketplace and the MCP Registry | https://xomnimarket.com/mcp |
| `io.github.Wonderfulian/kbv-server` | Korean import requirements by HS code and Korean company status | https://kbv-server-f7vfitmlkq-du.a.run.app/mcp |
| `io.github.worklore/worklore` | Reproducible developer stories about AI agents, tools and practices | https://worklore.dev/mcp |
| `io.github.workopia/workopia-mcp` | Millions of live jobs from company career pages in 90 countries | https://workopia.io/api/mcp-jobs |
| `io.github.wvdsh/wavedash` | Wavedash documentation for building and publishing browser games | https://mcp.wavedash.com/mcp |
| `io.github.wywy-llc/gas-library-hub` | Google Apps Script libraries with AI-generated summaries | https://appscripthub.com/api/mcp |
| `io.github.x3allamerican/x3-compliance-mcp` | US federal regulations text: FMCSA, OSHA, PHMSA, Coast Guard rules | https://mcp.x3api.com/mcp |
| `io.github.xiaoba-dev/atlaxy` | AI products, models, agents, and organizations with explainable scores | https://api.atlaxy.ai/mcp |
| `io.github.xyzzylabs/tc39-mcp` | ECMAScript ECMA-262 and ECMA-402 spec clauses, grammar, and TC39 proposals | https://mcp.xyzzylabs.ai/tc39/mcp |
| `io.github.xyzzylabs/wasm-mcp` | WebAssembly specification: instructions, types, sections, proposals | https://mcp.xyzzylabs.ai/wasm/mcp |
| `io.github.YaakovTzedek/tzedek-ai-mcp` | Practical AI guides, courses, learning paths and AI news | https://tzedek.me/mcp |
| `io.github.yadasa/afrotech-guide` | AfroTech 2026 events, sessions, jobs, and attendees | https://afrotech.guide/mcp |
| `io.github.Yarmoluk/ckg-agentforce` | Salesforce AgentForce concepts and their dependencies | https://ckg-agentforce.onrender.com/mcp |
| `io.github.Yarmoluk/ckg-nvidia-ai` | NVIDIA AI concepts across 20 domains with source provenance | https://ckg-nvidia-ai.onrender.com/mcp |
| `io.github.Yarmoluk/ckg-nvidia-nemoclaw` | NVIDIA NemoClaw concepts, runtimes, policies and dependencies | https://ckg-nvidia-nemoclaw.onrender.com/mcp |
| `io.github.yaroslavnas-hue/animal-slots-uk` | Reviews of animal-themed slot games on animal-slots.uk | https://animal-slots.uk/mcp |
| `io.github.yc-droid/fundscout` | Indian mutual fund schemes, latest AMFI NAVs, and returns | https://fundscout.salesup.workers.dev/mcp |
| `io.github.yc-droid/grantscout` | Open and upcoming US federal grant opportunities from Grants.gov | https://grantscout.salesup.workers.dev/mcp |
| `io.github.YGao2005/scholar-feed-mcp` | CS/AI/ML papers, citations, authors and full text | https://mcp.scholarfeed.org/mcp?src=mcp-registry |
| `io.github.yhay81/public-data-catalog` | Japanese open government data from e-Gov portal and statistics dashboards | https://public-data-catalog-mcp.yusuke8h.workers.dev/mcp |
| `io.github.yonatangross/orchestkit` | OrchestKit documentation, skills and installation across agent hosts | https://orchestkit.dev/api/mcp |
| `io.github.YourLifewithAI/arcology-knowledge-node` | Engineering knowledge for building a mile-high arcology city | https://arcology-mcp.fly.dev/mcp |
| `io.github.yuli3/oiyo-news` | Korean daily tech, AI and market news briefs | https://news-oiyo.pages.dev/mcp |
| `io.github.zation/agent-radar` | Rated AI tools with recommendations and explanations | https://agent-radar.zation1.workers.dev/api/mcp |
| `io.github.zaxarovcom/thisispaper` | Curated architecture, design, photography, and art projects | https://www.thisispaper.com/intelligence/api/mcp |
| `io.github.zeit-dev/canton-projects` | Canton Network ecosystem projects and categories | https://canton.wiki/mcp |
| `io.github.zeit-dev/hoodl2-projects` | Robinhood Chain ecosystem projects and categories | https://hoodl2.com/mcp |
| `io.github.zeit-dev/perps-projects` | Perpetuals ecosystem projects and categories | https://perps.ai/mcp |
| `io.github.zeit-dev/pmwisdom-projects` | Prediction market projects directory | https://pmwisdom.com/mcp |
| `io.github.zeit-dev/tempoatlas-projects` | Tempo blockchain ecosystem projects and categories | https://tempoatlas.net/mcp |
| `io.github.zeroatflops/flopsindex-mcp` | GPU rental reference prices for spot, on-demand and DePIN | https://app.flopsindex.com/mcp |
| `io.github.zzn199216/worldrole` | Remote and overseas job listings with eligibility checks | https://mcp.worldrole.work/mcp |
| `io.griddo/ax-docs` | Griddo backoffice documentation for content authors | https://ax.mcp.griddo.io/mcp |
| `io.growthvector/mcp` | SEO, GEO, ads, email marketing guides, tools and techniques | https://growthvector.io/mcp |
| `io.haystackapp/jobs` | Live job listings and employer application response facts | https://haystackapp.io/mcp |
| `io.iasi/mcp` | Local Iași info: flights, events, restaurants, museums, air quality, jobs | https://mcp.iasi.io/mcp |
| `io.imagekit/devtools` | ImageKit developer documentation and transformations | https://devtools-mcp.imagekit.io/mcp |
| `io.insourcia/insourcia` | French company financials, directors, ownership, M&A and insolvency | https://mcp.insourcia.io/mcp |
| `io.jobsbase/jobs` | Builder job listings where one person owns engineering, product, QA | https://jobsbase.io/mcp |
| `io.jsonpad/docs` | JSONPad docs, API, SDK and CLI references | https://mcp.jsonpad.io/docs |
| `io.kendor/docs` | Kendor coding interview platform docs: live coding, AI agents, repos | https://mcp.kendor.io/docs |
| `io.launchpadhq/launchpad-hq` | Sourced facts on AI tools, pricing and free alternatives | https://www.launchpadhq.io/mcp |
| `io.lexlint/lexlint` | Jurisdiction-specific laws governing software, with citations | https://mcp.lexlint.io/mcp |
| `io.makerradar/mcp` | Launched products directory, alternatives, comparisons, launch weeks and makers | https://api.makerradar.io/mcp |
| `io.mammoth/docs` | Mammoth Analytics documentation | https://mammoth.io/docs/mcp/ |
| `io.mcp-marketplace/search` | 4,000+ security-scanned MCP servers | https://mcp-marketplace.io/api/mcp/mcp |
| `io.mcprating/search` | MCP servers with test results, required keys, tools and token cost | https://mcprating.io/mcp/ |
| `io.mediawork/mediawork` | Post-production and distribution vendors directory | https://mcp.mediawork.io/mcp |
| `io.memorysync/docs` | MemorySync integration documentation | https://docs.memorysync.io/mcp |
| `io.motomarks/mcp` | Car brand logos and automotive brand data | https://motomarks.io/api/mcp |
| `io.nightbreak/forge` | Nightbreak Minecraft plugin wiki, source code, and config schemas | https://forge.nightbreak.io/mcp |
| `io.offermagnet/jobs` | Live job postings with visa sponsorship stance | https://offermagnet.io/mcp |
| `io.openlegaldata/de` | German court decisions, laws and citation relationships | https://de.openlegaldata.io/mcp |
| `io.openvidu/docs` | Official OpenVidu documentation by version, with changelog and pricing | https://docs-mcp.openvidu.io/mcp |
| `io.pandex/law` | Official legislation and case law with historical versions | https://api.pandex.io/mcp |
| `io.pepbank/pepbank` | Peptide studies, clinical trials, findings and community usage | https://pepbank.io/mcp |
| `io.philidor/defi-vaults` | 700+ DeFi vaults with risk scores and protocol analysis | https://mcp.philidor.io/api/mcp |
| `io.phishdestroy/cti` | Phishing domain reports, evidence and impersonated brands | https://phishdestroy.io/api/mcp.php |
| `io.protoperfect/labs` | Protoperfect Labs research papers, documentation, and glossary | https://protoperfect.io/api/mcp |
| `io.publicapis/directory` | 1,500+ public APIs with docs, auth and free-tier info | https://publicapis.io/mcp |
| `io.pxl8/records` | Verified fighter records and fight cards | https://api.pxl8.io/sports-data/mcp |
| `io.qt.qt-docs-mcp/qt-documentation` | Qt 5 and Qt 6 framework and product documentation | https://qt-docs-mcp.qt.io/mcp |
| `io.recall365/recall365` | Official global product recalls and FDA import alerts | https://app.recall365.io/mcp |
| `io.salessignals/awards` | UK public sector IT contract awards, buyers, suppliers, end dates | https://salessignals.io/mcp |
| `io.schematik/schematik` | Electronics parts catalogue and hardware build guides | https://www.schematik.io/mcp |
| `io.seaworthy/mcp` | Disability insurance facts, carriers, riders, and specialty coverage guides | https://mcp.seaworthy.io/mcp |
| `io.serverdex/serverdex` | Directory of MCP servers, tools, install configs and GitHub facts | https://serverdex.io/mcp |
| `io.sigmaprep/worksheets` | Free printable math worksheets from pre-algebra to calculus | https://www.sigmaprep.io/api/mcp |
| `io.stobox/intelligence-graph` | Real-world asset tokenization, security tokens, standards and regulation | https://mcp.stobox.io/mcp |
| `io.stockmap/stockmap` | Model-based US stock calls, sectors and crypto market reads | https://stockmap.io/mcp |
| `io.theparse/parse` | Tiered cited public research record with source passages and open questions | https://theparse.io/mcp |
| `io.tooloracle/law` | US, EU and UK case law, Federal Register, SEC filings and bills | https://tooloracle.io/law/mcp/ |
| `io.tooloracle/researchoracle` | Scientific papers, arXiv preprints, authors and DOI metadata | https://tooloracle.io/news2/mcp/ |
| `io.tracetail/tracetail` | TraceTail browser fingerprinting docs, pricing, and integration code | https://tracetail.io/mcp |
| `io.usefulapi/aqarsas` | Saudi real estate transactions, prices and market statistics | https://aqarsas.usefulapi.io/mcp |
| `io.usefulapi/clinicaltrialsgov` | ClinicalTrials.gov registered studies, sites and outcomes | https://clinicaltrialsgov.usefulapi.io/mcp |
| `io.usefulapi/cobalt-intelligence` | US business entity records from Secretary of State filings | https://cobalt-intelligence.usefulapi.io/mcp |
| `io.usefulapi/dailymed` | FDA drug labels, NDCs, and packaging from DailyMed | https://dailymed.usefulapi.io/mcp |
| `io.usefulapi/document360` | Articles and categories in a company's Document360 knowledge base | https://document360.usefulapi.io/mcp |
| `io.usefulapi/helpdocs` | Articles in a company's HelpDocs knowledge base | https://helpdocs.usefulapi.io/mcp |
| `io.usefulapi/helpjuice` | Articles and categories in a company's Helpjuice knowledge base | https://helpjuice.usefulapi.io/mcp |
| `io.usefulapi/huggingface` | Hugging Face models, datasets, Spaces, collections and research papers | https://huggingface.usefulapi.io/mcp |
| `io.usefulapi/knowledgeowl` | A company's KnowledgeOwl knowledge-base articles, glossary, and snippets | https://knowledgeowl.usefulapi.io/mcp |
| `io.usefulapi/loyjoy` | Company knowledge catalogs, articles and indexed knowledge sources in LoyJoy | https://loyjoy.usefulapi.io/mcp |
| `io.usefulapi/nppes-npi-registry` | US healthcare providers and organizations by NPI | https://nppes-npi-registry.usefulapi.io/mcp |
| `io.usefulapi/openfda` | openFDA drug, device, food and adverse event data | https://openfda.usefulapi.io/mcp |
| `io.usefulapi/peopledatalabs` | People, company, and job posting profiles from People Data Labs | https://peopledatalabs.usefulapi.io/mcp |
| `io.usefulapi/pubmed-ncbi-e-utilities` | Biomedical research articles, abstracts and citations from PubMed | https://pubmed-ncbi-e-utilities.usefulapi.io/mcp |
| `io.usefulapi/rxnorm` | Drug names, ingredients and interactions from RxNorm | https://rxnorm.usefulapi.io/mcp |
| `io.usefulapi/simplyrets` | MLS real estate listings, open houses and market statistics | https://simplyrets.usefulapi.io/mcp |
| `io.usefulapi/youtube-data` | Public YouTube videos, channels, playlists and comments | https://youtube-data.usefulapi.io/mcp |
| `io.usefulapi/zenserp` | Google web, news, image and shopping search results | https://zenserp.usefulapi.io/mcp |
| `io.uxjobs/jobs` | Live UX and product design job listings with salary statistics | https://mcp.uxjobs.io/mcp |
| `io.vascue/public-knowledge-search` | Vascue public docs on healthcare operations, insurance claims and booking | https://www.vascue.io/mcp/search |
| `io.vectree/diagrams` | Interactive concept diagrams explaining how things work | https://vectree.io/mcp |
| `io.viseon/semantic-intelligence` | VISEON products, services, people, FAQs and articles as a knowledge graph | https://viseon.io/mcp |
| `io.voiceaiagents/directory` | Voice AI agent vendors with pricing, features and comparisons | https://www.voiceaiagents.io/api/mcp |
| `io.whatic/datasheets` | IC datasheet specs, parametric part search and price tiers | https://whatic.io/mcp |
| `ir.bijack/loadboard` | Active public freight loads, halls and available drivers in Iran | https://mcp.bijack.ir/mcp |
| `is.eignast/eignast` | Iceland properties for sale with details and price history | https://eignast.is/mcp |
| `it.asapdevs/site` | ASAPDevs software house offers, case studies, blog and pricing | https://asapdevs.it/api/mcp |
| `it.giornatamondiale/world-days` | Italian world and international days with dates and sources | https://giornatamondiale.it/mcp |
| `it.matricedeldestino/matrice-del-destino` | Destiny matrix guides and calculators from an Italian site | https://matricedeldestino.it/mcp |
| `it.occasioni/bandi` | Italian public grants, incentives, deadlines and relocation programmes | https://occasioni.it/mcp |
| `it.proofprofile/proofit-free` | Catalogue of 10 million recordings from before 2022 | https://proofprofile.it/mcp |
| `it.taxcompass/taxcompass` | Italian tax rules from primary sources with citations | https://api.taxcompass.it/mcp |
| `jobs.aitrainers/search` | Open paid AI training jobs from many platforms | https://aitrainers.jobs/mcp |
| `jobs.aitraining/ai-training-jobs` | Open AI training jobs, platforms and advertised hourly pay | https://aitraining.jobs/api/mcp |
| `jobs.robottraining/robot-training-jobs` | Open robot training jobs and hourly pay by work type | https://robottraining.jobs/api/mcp |
| `jobs.superintelligence/frontier-ai` | Open frontier AI lab roles and hiring organizations | https://superintelligence.jobs/mcp |
| `jp.afdb/mcp` | Japanese point-site reward offers, conditions and yen values | https://mcp.afdb.jp/mcp |
| `jp.co.roundup-inc/knowledge` | Japanese SME web marketing insights, Q&A, and podcast excerpts | https://roundup-knowledge-mcp.bitter-sea-955b.workers.dev/mcp |
| `jp.i-fukuoka/tokunabi-fukuoka` | Fukuoka local events, campaigns and sales with articles | https://tokunabi-fukuoka-mcp.tokunabi-fukuoka-mcp.workers.dev/mcp |
| `ke.co.firmledger/firmledger` | Verified company records, profiles, relationships, news and jobs | https://mcp.firmledger.co.ke/mcp |
| `kr.agenthub/with` | Korean AI tools, pricing and task manuals for solo businesses | https://agenthub.kr/api/mcp |
| `kr.bluebutton/community` | Korean AI practitioner community posts on AI adoption and development | https://community.bluebutton.kr/mcp |
| `kr.io.jimin/korea-public-data` | Korean chemical regulation by CAS number, GHS, K-REACH lists | https://mcp.jimin.io.kr/mcp |
| `kr.lifelaw/kr-law` | South Korean laws, court cases, tax rulings and interpretations | https://mcp.lifelaw.kr/mcp |
| `kz.mytender/tenders` | Kazakhstan public tenders, customers and past contract prices | https://mytender.kz/api/mcp |
| `land.moss/alpha-mcp` | Korean crypto and macro media analysis, daily briefs and market data | https://alpha.moss.land/api/mcp |
| `law.ukimmigration/uk-immigration-tools` | UK visa going rates, sponsor licences, fees, and right to work | https://www.ukimmigration.law/api/mcp/ |
| `legal.loupe/citation-lookup` | Verification of US legal citations and case names | https://loupe.legal/mcp-public |
| `live.max4/max4live` | Max for Live devices for Ableton Live | https://mcp.max4.live/mcp |
| `live.tarenraider/taren-raider` | Taren Raider stream status, schedule, VODs and merch | https://tarenraider.live/mcp |
| `living.heidi/stays` | heidi.living furnished monthly stays in Los Angeles and FAQs | https://heidi.living/mcp |
| `lk.postage/postage` | Sri Lanka Post rates, COD fees, post offices and prohibited items | https://postage.lk/mcp |
| `loans.hospital/hospital-loans` | FHA-insured hospital loans from HUD files and Section 242 rules | https://hospital.loans/mcp |
| `lol.twoweeks/elon-musk-predictions` | Elon Musk's dated predictions, quotes, sources and verdicts | https://twoweeks.lol/mcp/v1 |
| `ls.ip/ipls-ip-lookup-service` | IP geolocation, ASN, ISP and DNS records | https://ip.ls/mcp |
| `lt.apibase/pirkimai` | Active Lithuanian public procurement tenders by CPV code | https://apibase.lt/api/pirkimai/mcp |
| `lt.atviri-teises-aktai/lithuanian-law` | Lithuanian laws article by article, definitions and Seimas votes | https://atviri-teises-aktai.lt/mcp |
| `lt.gov.dataportal.guides/docs` | Lithuanian Data Portal user guide and Data API documentation | https://guides.dataportal.gov.lt/api/mcp |
| `lu.chathome/chathome` | Luxembourg property listings, market data and housing costs | https://chathome.lu/api/mcp |
| `ma.madda/law` | Moroccan legislation article by article in Arabic and French | https://madda.ma/mcp |
| `makeup.pro/mcp` | Directory of makeup artists, salons, schools and brands worldwide | https://pro.makeup/api/mcp |
| `market.plati.mcp/digimarket` | plati.market digital goods catalogue with product and seller details | https://mcp.plati.market/mcp |
| `marketing.b2binfluencer/b2b-influencers` | B2B creators, newsletters, podcasts, brand sponsorships and prices | https://b2binfluencer.marketing/mcp |
| `markets.bobby/free` | US stock briefs, comparisons and market context | https://bobby.markets/mcp/free |
| `md.mostlyright/datasets` | Open reproducible datasets with schemas, samples and queries | https://mostlyright.md/api/mcp |
| `me.gaborharsanyi/knowledge` | Gabor Harsanyi's professional expertise, credentials and job fit evidence | https://mcp.gaborharsanyi.me/mcp |
| `me.ryanlindsey/ryanlindsey-me` | Ryan Lindsey's resume, case studies and published writing | https://mcp.ryanlindsey.me/mcp |
| `media.thecoop/the-coop` | iGaming industry news, supplier profiles, payment providers, events, glossary | https://thecoop.media/mcp |
| `mk.najdikola/cars` | Used-car listings and price estimates in North Macedonia | https://najdikola.mk/mcp |
| `mn.unegui/listings` | Classified listings and new housing developments in Mongolia | https://mcp.unegui.mn/mcp |
| `mobile.claw/ai-tools` | AI coding and app-building tools pricing, comparisons and guides | https://claw.mobile/mcp |
| `mobile.forex/brokers` | Forex broker regulation, spreads, fees, comparisons and trading glossary | https://forex.mobile/mcp |
| `mx.com.petify/ai-connect` | Mexican pet products, services and editorial pet care articles | https://connect.petify.com.mx/mcp |
| `mx.lomitos/adopciones` | Dogs and cats available for adoption in Mexican shelters | https://lomitos.mx/mcp |
| `net.activedns/activedns` | Historical DNS observations for domains, IPs, networks and ASNs | https://activedns.net/mcp |
| `net.balford/ask` | Metal stamping, deep drawing and design-for-manufacturing engineering answers | https://balford.net/ask/mcp |
| `net.claudecodemods/mods-registry` | Claude Code mods, plugins, hooks, skills and install guides | https://claudecodemods.net/api/mcp |
| `net.continental/expiring-domains` | Expiring and deleted domains with SEO backlink metrics | https://www.continental.net/mcp |
| `net.deallabs/city-data` | City places, station exits and last train times in Korea | https://deallabs.net/mcp |
| `net.digiadapt/adtech-intel` | Daily AdTech news on DSPs, SSPs, CTV and TV OEMs | https://digiadapt.net/mcp |
| `net.effecthub/catalog` | AI tools catalog with pricing, liveness and quality scores | https://effecthub.net/api/mcp |
| `net.gamedev/mcp` | GameDev.net forums, tutorials, postmortems, game industry news and shader projects | https://gamedev.net/mcp/ |
| `net.genebe/genebe-mcp` | Human genetic variant classification, ACMG criteria, genes and consequences | https://mcp.genebe.net/v1/mcp |
| `net.gunpartpicker/gunpartpicker` | US firearm parts prices, ammo, FFL dealers and state gun laws | https://gunpartpicker.net/api/mcp |
| `net.haldata/mcp-dir` | Japanese directory of retail and e-commerce MCP servers with recipes | https://mcp-dir-search-bqaj3tfejq-an.a.run.app/mcp |
| `net.homeschooltools/curriculum` | Homeschool curricula details, comparisons and reviews | https://homeschooltools.net/mcp |
| `net.hostveritas/hosting-research` | Web hosting provider facts, pricing and comparisons with sources | https://hostveritas.net/mcp |
| `net.iq/mcp` | Catalog of MCP servers, Apify actors and x402 API endpoints | https://api.iq.net/mcp |
| `net.izoprofil.www/product-catalog` | Building materials product specs and PLN prices | https://www.izoprofil.net/wp-json/site-ai/v1/mcp |
| `net.k4tech/docs` | Medius control protocol, device behavior and Rust library documentation | https://medius.k4tech.net/mcp |
| `net.keplerbot/kepler` | Kepler OGame bot scripting API function signatures and examples | https://keplerbot.net/mcp |
| `net.libertycity/mods` | GTA game mods catalog with details and install instructions | https://libertycity.net/agent/mcp |
| `net.myopl/pickleball-public-knowledge` | Official 2026 USA Pickleball rules, ratings, courts and help articles | https://api.myopl.net/mcp |
| `net.olothea/olothea` | Provisional collaborative research publications, questions and knowledge claims | https://olothea.net/api/mcp |
| `net.onlinewebdirectory/registry` | How websites treat AI agents: bot walls, robots, llms.txt | https://onlinewebdirectory.net/mcp |
| `net.paisan/paisan` | Latin American manufacturers, exporters and their product catalogs | https://paisan.net/api/mcp |
| `net.particular/particular-docs-mcp` | NServiceBus and Particular Service Platform documentation | https://docs.particular.net/mcp |
| `net.pelikani/pelikani` | Kosovo real-estate listings for sale and rent with prices | https://pelikani.net/mcp |
| `net.pendingdelete/mcp` | Pending delete and dropped domain names with drop times | https://mcp.pendingdelete.net/mcp |
| `net.plety/plety-guides` | Guides on licensing UK company records to AI buyers | https://plety.net/mcp |
| `net.prieco/search` | General web search results from independent EU search engine | https://prieco.net/mcp |
| `net.rafsoft/faktura-vat` | Faktura VAT invoicing software knowledge base and Polish KSeF e-invoicing | https://www.rafsoft.net/api/mcp/ |
| `net.repleader/mcp` | US federal dockets, judges, MDLs, state case law and legal news | https://repleader.net/mcp/v1 |
| `net.seaready/seaready` | SIRE 2.0 inspection questions, PSC checklists and vetting deadlines | https://seaready.net/mcp |
| `net.softhills/mcp` | Softhills 3D/2D visualization SDK docs, APIs and code examples | https://ai.softhills.net/mcp |
| `net.somantic/immobiliensuche` | German property listings and address value estimates | https://www.somantic.net/api/mcp/ |
| `net.tradebasis/automotive-appraisal` | US VIN decoding and dealer research on used car finance | https://tradebasis.net/mcp |
| `net.umbhost/umbhost-kb-mcp` | UmbHost help articles on Umbraco hosting, DNS, email and SSL | https://kb.umbhost.net/mcp |
| `net.vaguslab/research` | Vagus nerve stimulation research passages and consumer device comparison | https://vaguslab.net/mcp |
| `net.vareen/vaia` | vareen.net products, technical data and comparisons | https://vareen.net/a/mPBZZ1Sg9UDKK1_O/mcp |
| `net.zainahmed/docs-mcp` | Developer documentation, TypeScript SDK guides, OpenAPI specs, architecture blueprints | https://zainahmed.net/mcp/docs |
| `network.caper/caper-wiki` | Caper wiki and DAO knowledge base on Radix | https://caper.network/api/mcp |
| `network.fmcg/fmcg-network` | USDA food nutrients, FDA recalls and EU food and cosmetics labelling rules | https://mcp.fmcg.network/mcp |
| `network.tolla/tolla` | Directory and market stats of paid x402 APIs | https://tolla.network/mcp |
| `network.wellknown/wellknown` | Index of AI agents and MCP servers with liveness and capabilities | https://wellknown.network/mcp |
| `news.agingresearch/agingresearch-news` | Aging research papers, trials, grants, drug pipelines and longevity news | https://agingresearch.news/api/mcp |
| `news.apprised/site` | AI-written news briefs, daily reports and breaking headlines | https://apprised.news/mcp |
| `news.asha/asha-news` | Source-backed news archive with Palestine and conflict coverage | https://asha.news/api/v1/mcp |
| `news.pollar/pollar-news` | Independent European news, explainers, daily briefs and storylines | https://mcp.pollar.news/mcp |
| `news.polymath/polymath-news` | Curated current news on tech, AI, business, policy, media | https://mcp.polymath.news/mcp |
| `news.theaftermath/news` | Essays on what AI means for living and working | https://theaftermath.news/mcp |
| `nl.abonnement-goedkoop/offers` | Dutch Sim Only, phone and internet tv offers compared | https://www.abonnement-goedkoop.nl/mcp |
| `nl.boekenbase/catalogus` | Dutch book catalog with ISBN metadata and new releases | https://boekenbase.nl/mcp |
| `nl.cryptopeildatum/peildatum` | Crypto EUR prices on Dutch box 3 reference date | https://cryptopeildatum.nl/mcp |
| `nl.intermediair.www/jobs` | Dutch job postings on Intermediair | https://www.intermediair.nl/mcp |
| `nl.kamertaal/dutch-parliament-tweede-kamer` | Everything said in Dutch House of Representatives debates since 1995 | https://kamertaal.nl/mcp |
| `nl.kentekenkompas/vehicle-knowledge` | Dutch vehicle models, comparisons, terminology and cited sources | https://api.kentekenkompas.nl/mcp |
| `nl.marketingburos/marketingburos` | Dutch marketing agencies by specialism, city and cases | https://mcp.marketingburos.nl/mcp |
| `nl.nationalevacaturebank.www/jobs` | Dutch job postings on Nationale Vacaturebank | https://www.nationalevacaturebank.nl/mcp |
| `nl.statischeberekening/geodata` | Dutch building data, soil investigations and wind zones by address | https://statischeberekening.nl/mcp-geodata |
| `nl.thelistaccess/events` | Public Dutch event calendar by artist, city, venue, date | https://thelistaccess.nl/api/mcp |
| `nl.topvacaturebank/vacatures` | Dutch job vacancies, salaries, job descriptions and employers | https://www.topvacaturebank.nl/mcp |
| `no.cantara/wiki` | Norwegian open-source community wiki articles from 2008 to 2022 | https://mcp.cantara.no/mcp |
| `no.kollegia/jobbsok` | Norwegian job listings, salaries and employers | https://kollegia.no/mcp |
| `no.kulturbase/catalogue` | Playable Nordic cultural programmes and recordings | https://kulturbase.no/mcp |
| `no.momentsapp/events` | Public event listings in Norwegian and other cities | https://momentsapp.no/api/v1/public/mcp |
| `no.razem/articles` | Polish-language news articles about life in Norway | https://www.razem.no/wp-json/razem-norge/v1/mcp |
| `now.carejobs/healthcare-jobs` | US healthcare job openings, posted pay and employer visa records | https://carejobs.now/api/mcp |
| `now.estateplan/estateplan-now` | U.S. estate planning law firms, services and published prices | https://www.estateplan.now/api/mcp |
| `now.exam/past-papers` | Cambridge, AQA, Edexcel past paper questions and mark schemes | https://exam.now/mcp |
| `now.salesjobs/mcp` | Open sales jobs with posted base pay and OTE | https://salesjobs.now/api/mcp |
| `np.com.nischaldhakal/mcp-check` | Graded directory of public MCP servers and spec compliance reports | https://mcp.nischaldhakal.com.np/mcp |
| `one.asel.agents/public-folder` | Cited findings and open requests shared by agents | https://agents.asel.one/mcp |
| `one.nicheof/network` | Private web search plus Niche of One network posts and guides | https://mcp.nicheof.one/network |
| `online.meal-planner/public-recipes` | Free dinner recipes searchable by ingredient | https://www.meal-planner.online/wp-json/ksl-mp/v1/mcp-public |
| `online.pandus/accessibility` | WCAG 2.2 and axe-core accessibility rule explanations | https://pandus.online/mcp |
| `online.reflib/reflib` | Sections of reference corpora searchable by text | https://mcp.reflib.online/mcp |
| `online.sasame/research` | SaSame public website knowledge and open outcome demands | https://live-vps.sasame.online/public-mcp |
| `online.waply/public` | Waply WhatsApp for Kommo docs, guides, plans, and message pricing | https://waply.online/mcp |
| `org.agenticpress/mcp` | AI model deprecations, runtime end-of-life, cloud quotas and AI law deadlines | https://agenticpress.org/mcp |
| `org.agentpub/papers` | AI-authored research papers with peer review | https://mcp.agentpub.org/mcp/ |
| `org.agentsindex/agentsindex` | MCP servers and AI agents by task, with status and tools | https://agentsindex.org/mcp |
| `org.ai-agent-engineering/articles` | Articles on building, securing and running AI agents | https://ai-agent-engineering.org/api/mcp |
| `org.alaskajobs/board` | Alaska public-sector jobs, salaries and state pay schedule | https://alaskajobs.org/mcp |
| `org.americandefault/research` | U.S. household finance indicators, county distress scores and indexes | https://mcp.americandefault.org/mcp |
| `org.aquaview/aquaview-mcp` | Global oceanographic and environmental datasets and observations | https://mcp.aquaview.org/mcp |
| `org.askcerebrum/cerebrum` | Scientific literature answers with citations and paper reception | https://askcerebrum.org/mcp |
| `org.belgium-art/guide-and-transfer` | Belgian places, culture and sourced travel answers | https://belgium-art.org/wp-json/belgium-art-agent/v1/mcp |
| `org.bibooks/bibooks` | Free bilingual audiobooks with parallel text for language learners | https://bibooks.org/mcp |
| `org.biketherail/trails` | US rail-trails, trailheads, facts and closures | https://biketherail.org/mcp |
| `org.billcommons/bill-commons` | US state bills full text, sponsors, votes and legislative history | https://mcp.billcommons.org/mcp |
| `org.brainkb/brainkb` | Neuroscience knowledge graphs | https://mcp.brainkb.org/mcp |
| `org.breakwire/breakwire` | API and SDK breaking changes, deprecations, advisories, and error fixes | https://breakwire.org/mcp |
| `org.btcdecoded/intelligence` | Cited Bitcoin development and governance discussion record | https://mcp.btcdecoded.org/mcp |
| `org.bull-run/bullrun` | Global stocks, UCITS ETF costs and overlap, company news and macro | https://mcp.bull-run.org/mcp |
| `org.casimo/mcp` | US casino terms, observed changes, and source-backed facts | https://casimo.org/mcp |
| `org.celo/docs-mcp` | Celo blockchain developer documentation | https://docs.celo.org/mcp |
| `org.climateinsightsdirectory/climate-energy-research` | Civil-society climate and energy reports, policy briefs, and analyses | https://climateinsightsdirectory.org/api/mcp?utm_source=mcp-registry&utm_medium=mcp |
| `org.codethrift/codethrift` | Public-domain code written by AI agents | https://codethrift.org/mcp |
| `org.colorid/paint-colors` | Paint colors across 35 brands and RAL, matched by hex | https://colorid.org/mcp |
| `org.communicatingpalestine.palianswers/palianswers` | Sourced answers to common claims and myths about Palestine | https://palianswers.communicatingpalestine.org/mcp |
| `org.cyberdetails/vulnerability-intelligence` | Known software vulnerabilities, CVEs, exploitation evidence and affected versions | https://cyberdetails.org/mcp |
| `org.davisstirling/davisstirling` | California HOA law: Davis-Stirling Act text and court decisions | https://davisstirling.org/mcp |
| `org.dictionaryofml/dictionary` | Machine learning term definitions and cross-references | https://dictionaryofml.org/mcp |
| `org.dosefacts/dosefacts` | Medicine fact sheets, ingredients and conditions, India focused | https://dosefacts.org/mcp |
| `org.druxtjs/docs` | Druxt documentation and API reference | https://druxtjs.org/mcp |
| `org.edufeed/nope-mcp` | German open educational resources and learning materials | https://mcp.edufeed.org/mcp |
| `org.everroad/dealers` | Utah franchise car dealer hours, fees, services, and state fee law | https://everroad.org/mcp |
| `org.fairappraisers/mcp` | US appraisers by location, specialty and intended use | https://mcp.fairappraisers.org/mcp |
| `org.frosh/mcp` | Frosh private MediaWiki product docs and blog | https://frosh.org/mcp |
| `org.gamblemath/quant-lab` | Casino slot RTP data and UKGC licence register lookups | https://gamblemath.org/mcp |
| `org.glolaw/glo-law` | U.S. court opinions, statutes, regulations and corrections policies | https://mcp.glolaw.org/mcp |
| `org.gramnews/catalogue-app` | Telegram channels, bots, mini apps, sticker packs directory | https://gramnews.org/mcp |
| `org.hangel/hangel` | Turkish NGOs, events, volunteering, open grants, civil-society library, disaster info | https://hangel.org/api/mcp |
| `org.hospitalaid/hospitalaid` | US hospital charity care policies and sliding fee eligibility | https://hospitalaid.org/mcp |
| `org.hostedmcp/directory` | MCP servers and agent skills catalog with install configs | https://api.hostedmcp.org/mcp |
| `org.ilsontvote/mcp` | Parliamentary votes, member voting records, laws and petitions | https://www.ilsontvote.org/mcp |
| `org.imqueue/mcp` | Official @imqueue documentation, packages, and release status | https://mcp.imqueue.org/mcp |
| `org.japanlaw/japanese-law` | Japanese statutes with English translations, provisions and amendments | https://japanlaw.org/mcp |
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
| `org.myzucoins/my-zucoins` | Zucoin Splitchain guides, wallet help, developer docs and news | https://myzucoins.org/mcp |
| `org.nexuspolitics/nexus-politics` | German and EU laws, MPs, votes, elections, council decisions | https://nexuspolitics.org/mcp |
| `org.nyuengelberg/corpus` | IP and innovation law scholarship from NYU's Engelberg Center | https://corpus.nyuengelberg.org/mcp |
| `org.onthebooks/onthebooks` | US municipal codes and local ordinances cited by chapter and section | https://onthebooks.org/mcp |
| `org.openindianalaw/indiana-code` | Indiana statutes, administrative code, appellate cases and local rules | https://mcp.openindianalaw.org/mcp |
| `org.opennih/opennih` | NIH grants 1985-2026 by topic, investigator, institution and funding trends | https://mcp.opennih.org/mcp |
| `org.opentrademarks/trademarks` | US, EU and Israeli trademark register records | https://mcp.opentrademarks.org/mcp |
| `org.oravan/mcp` | US Congress bills in plain language and representative lookup | https://oravan.org/api/mcp/mcp |
| `org.parlamente/drucksachen` | Papers and protocols of German federal, state and EU parliaments | https://mcp.parlamente.org/mcp |
| `org.pinnacleblooms/ask` | Child development milestones, warning signs, and ICF code references | https://ask-mcp.pinnacleblooms.org/mcp |
| `org.plantdatabases/askbrassica` | Brassica and canola genes, GWAS, expression, SNPs, germplasm and papers | https://askbrassica.plantdatabases.org/mcp |
| `org.plantdatabases/askpulse` | Pulse and legume genes, QTL, GWAS, expression, germplasm and papers | https://askpulse.plantdatabases.org/mcp |
| `org.plantdatabases/askwheat` | Wheat genes, pangenome, QTL, expression, GWAS, germplasm and papers | https://askwheat.plantdatabases.org/mcp |
| `org.projectnoosphere/noosphere` | Versioned how-tos and findings shared by AI agents | https://projectnoosphere.org/mcp |
| `org.prostitutionlaws/prostitutionlaws` | Prostitution and sex-work laws, penalties and reforms worldwide | https://prostitutionlaws.org/mcp |
| `org.remoteimpact/jobs` | Verified remote jobs at impact organizations | https://remoteimpact.org/mcp/ |
| `org.roadtag/road-tag` | Community-reported accessibility road barriers in Taiwan | https://roadtag.org/api/mcp-public |
| `org.rrmacademy/library` | Peer-reviewed articles on restorative reproductive medicine | https://mcp.rrmacademy.org/mcp |
| `org.scoutee/scoutee` | Open public tenders in Europe and EU CPV procurement codes | https://scoutee.org/api/mcp/public |
| `org.sophiacommons/directory` | Waldorf schools, biodynamic farms, Camphill communities and anthroposophical events | https://sophiacommons.org/mcp |
| `org.steinerhatgesagt/steiner-hat-gesagt` | Rudolf Steiner collected works full text with citations | https://steinerhatgesagt.org/mcp |
| `org.tansolutions.railcrossingatlas/crossings` | US railroad crossings, equipment, train activity and road traffic | https://railcrossingatlas.tansolutions.org/mcp |
| `org.thebgdb/mcp` | Board game details, designers, awards, rules and tutorials | https://mcp.thebgdb.org/mcp |
| `org.theowf/forum` | Agent-reported tool failures, workarounds and troubleshooting answers | https://theowf.org/mcp |
| `org.thevalleydesk/directory` | Healthcare research, software and clinical studies in Delaware Valley | https://thevalleydesk.org/mcp |
| `org.thewaterhub/site` | The Water Hub water dataset with search and statistics | https://thewaterhub.org/mcp |
| `org.thewileyrule/public` | 7-OH and kratom research, product tests, FDA actions, state laws | https://thewileyrule.org/mcp |
| `org.tickets4pets/events` | US live events, ticket price index and city event listings | https://tickets4pets.org/mcp |
| `org.toolwork/toolwork` | Tools, APIs, SDKs and MCP servers for tasks | https://mcp.toolwork.org/mcp?ref=mcp-registry |
| `org.totto/javabin-archieve` | Origins of javaBin and JavaZone Norwegian Java community, 1998 to 2007 | https://mcp-javabin-archieve.fly.dev/mcp |
| `org.totto/knowledge` | Thor Henning Hetland's signed knowledge web on software topics | https://mcp.totto.org/mcp |
| `org.townindex/directory` | US coastal local businesses, hours, services and licenses | https://townindex.org/api/mcp |
| `org.ukrfish.sk/sudnokontrol` | Ukrainian ship registry vessel records and statistics | https://api.sk.ukrfish.org/mcp |
| `org.unpatentable/library` | Public-domain invention disclosures usable as open prior art | https://unpatentable.org/mcp |
| `org.uscodex/uscodex` | US Code, CFR, public laws, bills, and executive orders | https://uscodex.org/mcp |
| `org.verifiedhandles/verified-handles` | Official social media accounts and identifiers of people and organisations | https://verifiedhandles.org/mcp |
| `org.vicp-registry/vicp-registry` | US vaccine court VICP decisions, statistics, and attorneys | https://vicp-registry.org/mcp |
| `org.videohistoryproject/research` | Experimental video history records, sources, and citations | https://www.videohistoryproject.org/mcp |
| `org.wikibrand/wikibrand` | Brand logos, colors, typefaces and tone of voice from brand websites | https://wikibrand.org/api/mcp |
| `org.wikioo/art-search` | Artworks, artist biographies, museums and art movements | https://direct.wikioo.org/mcp/ |
| `org.wikiprompt/mcp` | Curated AI prompts by model, style and type | https://mcp.wikiprompt.org/mcp |
| `page.afterimage/afterimage` | Stored readable copies of public web pages | https://afterimage.page/mcp |
| `page.copybook/copybook` | Prompts, rules and skills for coding agents | https://copybook.page/mcp/account |
| `party.wakidokoro/chiikawa` | Chiikawa manga episodes, characters and story arcs | https://wakidokoro.party/mcp |
| `pe.iw.around/businesses` | Local businesses in Israel with prices, services, and contacts | https://around.iw.pe/mcp |
| `pl.agentrynku/gpw` | Warsaw Stock Exchange prices, financial ratios, dividends, and earnings calendar | https://agentrynku.pl/api/mcp |
| `pl.fractio/katalog` | Fractional executives in Poland, engagement requests, rates and guides | https://fractio.pl/mcp |
| `pl.numertel/numertel` | Polish phone number reputation, spam, scam domains and official numbers | https://numertel.pl/api/mcp |
| `pl.podwojne-napiecie/articles` | Articles published on Podwójne Napięcie | https://podwojne-napiecie.pl/mcp |
| `pl.prawnet/prawnet` | Polish case law, statutes with history, tax rulings, court statistics | https://api.prawnet.pl/mcp |
| `pl.sladami-roberta/maklowicz` | Restaurants and attractions from Robert Maklowicz travel episodes | https://www.sladami-roberta.pl/api/mcp |
| `pl.spokojnierodzice/spokojnie` | Polish answers on normal child development for ages 0-36 months | https://spokojnie-mcp.vercel.app/api/mcp |
| `pl.supplemental/foodlaw` | EU and Polish food supplement law, health claims and novel foods | https://mcp.supplemental.pl/mcp |
| `pl.testyangielskiego/testy` | English tests and practice questions for Polish learners by CEFR level | https://testyangielskiego.pl/mcp |
| `pl.testyelektryka/testy` | Polish electrician exam ELE.02 and SEP G1 lessons and questions | https://testyelektryka.pl/mcp |
| `pl.testyniemieckiego/testy` | German tests and practice questions for Polish learners by CEFR level | https://testyniemieckiego.pl/mcp |
| `pl.testypolskiego/testy` | Polish language tests for foreigners and B1 state exam prep | https://testypolskiego.pl/mcp |
| `pl.vanauto/campers` | Camper and rental listings with specs and prices | https://mcp.vanauto.pl/mcp |
| `pro.appboard/appboard` | Community-ranked software products, alternatives, and trending launches | https://api.appboard.pro/api/mcp |
| `pro.cribsheet/cribsheet` | Hourly on-chain AI exam scores, answers and seals | https://cribsheet.pro/mcp |
| `pro.cursosgratis/cursos-gratis` | Free Spanish-language online courses, rankings and learning paths | https://cursosgratis.pro/mcp |
| `pro.dsgvo/dsgvo-pro` | German and EU digital law statutes including GDPR and AI Act | https://dsgvo.pro/api/mcp |
| `pro.hostboost/hostboost` | Airbnb listing optimization guides on photos, titles, pricing, ranking | https://hostboost.pro/mcp |
| `pro.investormatch/investor-match-public` | Venture capital investor directory and fundraising guides | https://investormatch.pro/mcp/public |
| `pro.laspi/directory` | Directory of owner-confirmed small businesses | https://laspi.pro/api/v1/mcp/directory |
| `realestate.rak/catalog` | Off-plan property projects, developers and areas in Ras Al Khaimah | https://www.rak.realestate/mcp |
| `review.migrationagent/find-a-migration-agent` | Registered Australian migration agencies and agents by location or MARN | https://migrationagent.review/mcp?channel=mcp-registry |
| `ro.autoid/autoid-support` | AutoID product catalog, specifications and technical support | https://mcp.autoid.ro/mcp |
| `ro.builtin/startups` | Startups, founders and communities in Romania and Moldova | https://www.builtin.ro/mcp |
| `rocks.dreamland/help` | DreamLand MUD help articles, items, news and online players | https://dreamland.rocks/mcp/help |
| `rocks.iching/hexagram-mcp` | I Ching 64 hexagrams and eight trigrams | https://mcp.iching.rocks/mcp |
| `rs.ferritin/rustdoc` | Rust standard library and crates.io crate documentation | https://ferritin.rs/mcp |
| `rs.heade/lookup` | Domain, IP and AS hosting, DNS, registration, email and TLS data | https://heade.rs/mcp |
| `rs.malinica/classifieds` | Serbian classified listings by category and location | https://api.malinica.rs/mcp |
| `ru.firmoteka/companies` | Russian company registry details and annual financials | https://firmoteka.ru/mcp |
| `ru.gentender/tenders` | Russian public procurement tenders, documents and domestic manufacturer registry | https://gentender.ru/mcp |
| `ru.krasoft/zakupki` | Russian public procurement tenders, contracts and market data | https://zakupki.krasoft.ru/api/mcp |
| `ru.paydadosh/dictionary` | Ingush–Russian word meanings, inflections and corpus example sentences | https://mcp.paydadosh.ru/mcp |
| `ru.sexpreparat/mcp` | Articles, research and reader Q&A on sex and health | https://sexpreparat.ru/api/mcp |
| `ru.skillfoxx/catalog` | Catalog of AI agent skills, MCP servers and CLI tools | https://skillfoxx.ru/api/mcp |
| `ru.wwhois/whois-mcp` | WHOIS and RDAP domain registration data and IP geolocation | https://wwhois.ru/backend/mcp |
| `ruhr.transparent/ratsinformationen` | Ruhr area council records and German parliamentary papers | https://mcp.transparent.ruhr/mcp |
| `run.antibody/antibody-run` | Verified fixes for software error messages and problems | https://antibody.run/mcp |
| `sa.daall/mnaqasat` | Saudi government tenders, agencies, winners and market reports | https://mnaqasat.daall.sa/mcp |
| `sale.finda/findasale` | Yard sales, auctions, estate sales and items listed for sale | https://mcp.finda.sale/mcp |
| `science.pith/pith` | Reviews, claims and flaws of arXiv papers | https://pith.science/mcp |
| `se.helsama/helsama` | Hemp and CBD knowledge base, products and open lab data | https://helsama.se/mcp |
| `se.remotejobb/jobs` | Open remote and hybrid jobs in Sweden with apply links | https://remotejobb.se/mcp |
| `sg.evaa.beacon/beacon` | Beacon by EVAA offers and articles on AI search visibility | https://beacon.evaa.sg/mcp |
| `sg.homejourney/listings` | Singapore property listings, HDB and condo prices, rental yields, buying guides | https://ai-apps.homejourney.sg/mcp/public |
| `sg.spill/deals` | Current Singapore promotions, discounts, freebies and 1-for-1 deals | https://spill.sg/mcp |
| `sh.alchemylab.horizon/briefing` | AI news and AI regulation across EU, US, UK and Asia | https://horizon.alchemylab.sh/api/mcp |
| `sh.financier/financier-docs` | Financier developer documentation | https://financier.sh/mcp/docs |
| `sh.glim/glim` | Live web, Twitter, Reddit, GitHub, Amazon, YouTube and Telegram content | https://glim.sh/mcp |
| `sh.knowngood/knowngood` | Websites where agents can act, with verified capability reports | https://knowngood.sh/mcp |
| `sh.logoapi/logos` | Company logos and favicons by domain or brand name | https://logoapi.sh/mcp |
| `sh.secretstore/public-docs` | Secret Store product documentation, install commands and MCP setup | https://secretstore.sh/api/mcp/public |
| `sh.seoskills/catalog` | Catalog of SEO agent skills | https://seoskills.sh/api/mcp |
| `sh.stipple/stipple-tenders` | Australian and New Zealand government tenders, awards and buyer signals | https://www.stipple.sh/mcp-tenders |
| `sh.tibia/tibiawiki-mcp` | Tibia game creatures, items, NPCs, quests, spells and houses | https://mcp.tibia.sh/wiki |
| `sh.watermelon/ui` | Free React, Tailwind and shadcn UI components with source | https://mcp.watermelon.sh/mcp |
| `si.digitalgarden/notes` | Alicia's notes on Houdini, Three.js, OpenUSD, and AI workflows | https://mcp.digitalgarden.si/mcp |
| `si.melb/data` | Melbourne public holidays, small business AI help, events, and local answers | https://data.melb.si/mcp |
| `si.quickmatch/quickmatch` | AI tools for game development: pricing, features, engines, licensing | https://mcp.quickmatch.si/mcp |
| `si.socialswarm/directory` | GitHub projects welcoming AI agent contributions | https://socialswarm.si/mcp |
| `si.thinkhard/prompt-tools` | Tested prompt templates for work tasks and AI glossary terms | https://thinkhard.si/mcp |
| `site.aefact/aefact` | Korean law changes, Bank of Korea figures and verified facts | https://aefact.site/mcp |
| `site.ayushrai.life/docs` | Public documentation pages on life.ayushrai.site | https://life.ayushrai.site/mcp/docs |
| `site.ayushrai.life/product` | Ayush Rai's public profile, projects and contact info | https://life.ayushrai.site/mcp/product |
| `site.caliperui/caliper` | Caliper UI React component docs, props and install commands | https://caliperui.site/mcp |
| `site.chatgpt.lorh89.the-knowledge-commons/evidence` | Sourced evidence on MCP, Cloudflare D1, SQLite, Malaysian demographics | https://the-knowledge-commons.lorh89.chatgpt.site/api/agent/mcp |
| `site.chatgpt.sarath0210.shekkizh-agent-exchange/agent-exchange` | Tools and hosted agents by task with documentation | https://shekkizh-agent-exchange.sarath0210.chatgpt.site/api/mcp |
| `site.chatgpt.unamed.othernet-reunion/othernet` | La Réunion information with cited sources | https://othernet-reunion.unamed.chatgpt.site/api/mcp |
| `site.chatgpt.wildoakdigital.mega-ultimate-job-search/mega-ultimate-job-search` | Open remote, hybrid and on-site job postings with pay | https://mega-ultimate-job-search.wildoakdigital.chatgpt.site/connect/mcp |
| `site.failegal/fai-legal` | Pakistani case law, statutes and legal drafting templates | https://failegal.site/mcp |
| `site.star365/hq` | Web, GitHub, YouTube and Reddit search plus live page reading | https://mcp.star365.site/mcp |
| `sk.autoisto/used-cars` | Used cars for sale in Slovakia with typical asking prices | https://www.autoisto.sk/mcp |
| `so.anteroom/anteroom` | Frontier AI vendor commitments, safety frameworks, and AI regulatory provisions | https://mcp.anteroom.so/mcp |
| `so.coreloop/directory` | Business directory with profiles, services and opening hours | https://coreloop.so/api/mcp/coreloop-directory |
| `so.falcon/frontier-reference` | Frontier design terms, file formats, companies, and design jobs | https://falcon.so/api/mcp |
| `so.growthgenie/growth-genie-docs` | Growth Genie documentation: MCP tools, OAuth, scopes, errors, CLI | https://docs.growthgenie.so/mcp |
| `so.ruling/ruling` | AI agents' pricing, licenses, integrations and community scores | https://ruling.so/mcp |
| `software.distribute/distribute-software` | Daily tech news, AI lab releases and company coverage | https://distribute.software/mcp |
| `solutions.avineon/mcp` | FME transformers, FME documentation, licensing and Avineon geospatial services | https://agents.avineon.solutions/mcp |
| `space.bytetrail/bytetrail` | AI papers, AI news, dev-tool adoption and startup funding rounds | https://bytetrail.space/mcp |
| `space.hf.hoyant-su-agentic-rl/agentic-rl` | Agentic reinforcement learning papers, credit assignment methods and CLI benchmark tasks | https://hoyant-su-agentic-rl.hf.space/gradio_api/mcp/ |
| `space.innovativework/iw-mcp` | Innovative Workspace AI services, prices, FAQs, team and case studies | https://mcp.innovativework.space/mcp |
| `space.monon/additive-atlas` | Food additive regulations in Japan, the EU, and the US | https://api.additiveatlas.monon.space/mcp |
| `space.spontanno/events` | Concerts, theatre and standup events in Russian cities | https://spontanno.space/mcp |
| `stream.aidata/site-search` | AI Data Stream documentation, blog, changelog, and pricing | https://aidata.stream/mcp |
| `studio.ghosty/docs` | Ghosty Studio documentation and OpenAPI specification | https://www.ghosty.studio/mcp/docs |
| `swiss.openhelvetia/gateway` | Swiss federal law from Fedlex and political linked data with sources | https://mcp.openhelvetia.swiss/mcp |
| `tax.990/nonprofit-lookup` | IRS records on US nonprofits, exempt status and Form 990 financials | https://990.tax/mcp |
| `tc.mcp/mcp-tc` | Directory of MCP servers with install commands and tools | https://mcp.tc/mcp |
| `team.leanscale/gtm-knowledge` | Go-to-market operations playbooks, benchmarks, case studies, and podcast episodes | https://mcp.leanscale.team/mcp |
| `tech.ace-bl/site-mcp` | Public pages and products of the Ace website | https://ace-bl.tech/mcp |
| `tech.filmcraft/video-editing-assistant` | Video editor shortcuts, hardware compatibility and export presets | https://filmcraft.tech/api/mcp |
| `tech.geosensor.atlas/absence-index` | Measured rates of web services lacking machine-readable capabilities | https://atlas.geosensor.tech/mcp |
| `tech.machinepulse/machinepulse` | MCP ecosystem stats, package download trends, and GitHub trending | https://machinepulse.tech/mcp |
| `tech.michaelbarber/site-mcp` | Public pages of the BL Sports website | https://michaelbarber.tech/mcp |
| `tech.progeofde/vps-deals` | Cheap VPS plan prices and providers compared | https://progeofde.tech/mcp |
| `tech.railcore/developers` | RailCore Indian Railways API documentation, endpoints, errors and code samples | https://mcp.railcore.tech/developers/mcp |
| `tech.saasoffers/deals` | Verified startup deals, discounts and credits on SaaS tools | https://saasoffers.tech/api/mcp |
| `tech.silon/docs` | Silon messaging API reference, operations and SDK guides | https://silon.tech/mcp |
| `tech.tailor/mcp` | Tailor Platform documentation | https://mcp.tailor.tech/ |
| `tech.tresbien/drupal-code-query` | Drupal core API changes, change records, issues and contrib code usage | https://mcp.tresbien.tech/mcp |
| `tech.ydb-qdrant.pets/codex-pets-ydb-qdrant` | Community Codex pet packs and install instructions | https://pets.ydb-qdrant.tech/mcp |
| `tn.qanun/qanun-mcp` | Tunisian laws, codes and JORT legal announcements with citations | https://qanun.tn/mcp |
| `today.lmk/commerce` | Cross-merchant product prices, price history, and deals | https://lmk.today/api/ucp/mcp |
| `tools.awesome/mcp` | Curated directory of SaaS and AI tools | https://awesome.tools/mcp |
| `tools.grokbot/connectors` | Grok Bot connectors, install methods, and test status | https://mcp.grokbot.tools/mcp |
| `tools.i-gaming/igaming-data` | iGaming slot specs, RTP, providers, regulators, news and jobs | https://mcp.i-gaming.tools/mcp |
| `tools.klaro/jobs` | Doctor jobs in Germany, pay tables, licensing rules and exam dates | https://klaro.tools/mcp |
| `tools.magne/catalog` | Curated APIs, MCP servers and models searchable by task | https://magne.tools/mcp |
| `tools.valksor/anglo` | Old English word senses and declension/conjugation tables from Wiktionary | https://anglo.valksor.tools/mcp |
| `tools.valksor/interslavic` | Interslavic dictionary with translations into Slavic languages and paradigms | https://interslavic.valksor.tools/mcp |
| `tools.valksor/norse` | Old Norse word senses and inflection tables from Wiktionary | https://norse.valksor.tools/mcp |
| `tools.valksor/panembrivdienu` | Latvian public holidays, working days and leave entitlement 2026-2027 | https://panembrivdienu.valksor.tools/mcp |
| `top.skillaria/skillaria` | AI, DevOps, Linux and Git courses and guides | https://skillaria.top/mcp |
| `top.toolboxes/ai-tools-directory` | Curated AI tools by industry, use case, and pricing tier | https://ai-tools-mcp.toolboxes.top/mcp |
| `top.verseworks/verseworks` | Chinese web novels, chapters and world-building codex | https://verseworks.top/mcp |
| `top.yixiaojian.wanbao/wanbao-house` | Public everyday service requests and Wanbao platform guides | https://wanbao.yixiaojian.top/mcp |
| `tr.com.kariwood.www/catalog` | Kariwood plywood product specifications and technical documents | https://www.kariwood.com.tr/mcp |
| `travel.mytour/agentic-id` | Luxury hotels, ships and trains identified by Agentic ID and GDS codes | https://mytour.travel/mcp |
| `travel.sorted/docs` | Sorted Travel developer docs for API, MCP, SDK and auth | https://sorted.travel/docs/mcp |
| `tube.binge/bingetube` | Short vertical drama series with recommendations | https://binge.tube/mcp |
| `tv.guidedoc/documentary-database` | Documentary films, filmmakers, topics, and articles | https://guidedoc.tv/mcp |
| `tw.meang/meang` | Taiwan long-term care facilities by city and district | https://meang.tw/mcp |
| `ua.com.finposter/finance` | Ukrainian loans, deposits, banks, exchange rates and financial guides | https://finposter.com.ua/mcp |
| `ua.org.chertov/chertov` | Chertov and Vorobyov physics problems with worked solutions | https://www.chertov.org.ua/mcp |
| `uk.co.boatsite/boatsite` | UK boats for sale listings and comparable price ranges | https://www.boatsite.co.uk/api/mcp-server |
| `uk.co.clearpostcode/postcodes` | UK postcode locations, councils, wards, constituencies and places | https://api.clearpostcode.co.uk/mcp |
| `uk.co.cruisify/cruise-search` | Cruises sold in the UK with itineraries, sailings and prices | https://www.cruisify.co.uk/mcp |
| `uk.co.establishedfinance/finance-reference` | UK Bank Rate history, R&D tribunal cases, invoice decline reasons | https://establishedfinance.co.uk/mcp |
| `uk.co.fortsu/mcp` | UK running shoe specs, prices and price history | https://www.fortsu.co.uk/mcp |
| `uk.co.getmovely/getmovely` | England and Wales homes, sold prices, EPC, tenure, stamp duty, area data | https://getmovely.co.uk/mcp |
| `uk.co.herstack/herstack` | UK women's midlife health guidance with PubMed evidence | https://herstack.co.uk/api/mcp |
| `uk.co.manchestertonight/whats-on` | Manchester gigs, club nights, theatre, events, and venues | https://manchestertonight.co.uk/mcp |
| `uk.co.mortgageexplained/mortgage-reference` | Indicative UK mortgage lender criteria by borrower scenario | https://mortgageexplained.co.uk/mcp |
| `uk.co.remedybridge/housing-repair-tools` | UK tenant rights on repairs, damp, Awaab's Law and complaint deadlines | https://remedybridge.co.uk/mcp/ |
| `uk.co.sisoco/gleif-lei-parent-company` | LEI records and parent companies from GLEIF, UK/FR companies | https://api.sisoco.co.uk/mcp/lei |
| `uk.co.therightaccountant/accountancy-research` | Aggregate research on UK accountancy firms ownership, size, filings | https://therightaccountant.co.uk/mcp |
| `uk.co.verifera/job-search` | Live job adverts in UK, US, Netherlands and Portugal | https://mcp.verifera.co.uk/mcp |
| `uk.co.vettedhome/property-guides` | UK guides to property problems and home energy decisions | https://vettedhome.co.uk/mcp |
| `uk.crash-slots/animal-slots-uk` | Reviews of animal-themed online slot games | https://animal-slots.uk/mcp |
| `uk.crash-slots/best-online-slots-uk` | Reviews of online slot games | https://best-online-slots.uk/mcp |
| `uk.crash-slots/best-payout-slots-uk` | Reviews of high payout slot and crash games | https://best-payout-slots.uk/mcp |
| `uk.crash-slots/casino-slots-games-co-uk` | Reviews of casino slot and crash games | https://casino-slots-games.co.uk/mcp |
| `uk.crash-slots/crash-games-co-za` | Reviews of crash and slot games for South Africa | https://crash-games.co.za/mcp |
| `uk.crash-slots/crash-slots-uk` | Reviews of crash and slot games | https://crash-slots.uk/mcp |
| `uk.crash-slots/crashgames-casino-at` | German-language reviews of crash and slot games for Austria | https://crashgames-casino.at/mcp |
| `uk.crash-slots/egyptian-slots-uk` | Reviews of Egyptian-themed slot games | https://egyptian-slots.uk/mcp |
| `uk.crash-slots/fruit-slots-uk` | Reviews of fruit-themed slot and crash games | https://fruit-slots.uk/mcp |
| `uk.crash-slots/fun-slots-uk` | Reviews of online slot and crash games | https://fun-slots.uk/mcp |
| `uk.crash-slots/medium-volatility-slots-uk` | Reviews of medium volatility slot games | https://medium-volatility-slots.uk/mcp |
| `uk.crash-slots/megaways-slots-uk` | Reviews of Megaways slot games | https://megaways-slots.uk/mcp |
| `uk.crash-slots/new-slotgames-uk` | Reviews of new online slot and crash games | https://new-slotgames.uk/mcp |
| `uk.crash-slots/non-uk-slots-uk` | Reviews of non-UK online slot games | https://non-uk-slots.uk/mcp |
| `uk.crash-slots/nongamstop-slots-uk` | Reviews of non-GamStop slot and crash games | https://nongamstop-slots.uk/mcp |
| `uk.crash-slots/owocowe-automaty-pl` | Polish-language reviews of fruit slot games | https://owocowe-automaty.pl/mcp |
| `uk.crash-slots/scatter-slots-uk` | Reviews of scatter slot and crash games | https://scatter-slots.uk/mcp |
| `uk.crash-slots/slots-oesterreich-at` | German-language slot and crash game reviews for Austria | https://slots-oesterreich.at/mcp |
| `uk.dumaguete/places` | Places with categories and coordinates from OpenStreetMap | https://dumaguete.uk/mcp |
| `uk.energynorth/journal` | Guides on electrical safety, EICRs and EV chargers in London | https://energynorth.uk/api/mcp |
| `uk.rickymoorhouse/blog` | Blog posts on API architecture, API Connect, SRE, AI | https://mcp.rickymoorhouse.uk/mcp |
| `uk.thaidata/mcp` | UK Thai restaurant hygiene ratings and city statistics | https://thaidata.uk/mcp |
| `us.aflink/search` | U.S. Air Force and DoD website quick links | https://api.aflink.us/mcp |
| `us.buildability/mcp` | US address-level zoning, flood zones, permitting and buildability | https://buildability.us/api/mcp |
| `us.darimarket/research` | Sports player stat hit rates, today's games, betting term explainers | https://darimarket.us/api/mcp/research |
| `us.govtube/govtube` | What US officials said on camera, with transcripts and timestamps | https://api.govtube.us/mcp |
| `us.raydn/news` | Latest financial and world news stories and full articles | https://raydn.us/mcp |
| `us.recalert/mcp` | US product recalls from CPSC, FDA, NHTSA and FSIS | https://ajlswjtsikbnpicienyu.supabase.co/functions/v1/mcp |
| `us.shprd.mcp/bible` | World English Bible text, verse search and verse of the day | https://mcp.shprd.us/mcp |
| `us.unfreeze/atlas` | Graded research studies on middle managers and organizational change | https://unfreeze.us/mcp |
| `uz.pactum/legal` | Uzbekistan law explainers, state fees, statutory deadlines, legal terms | https://pactum.uz/mcp |
| `vc.unicornscreener/unicorn-screener` | Startup scores, analysis, and public research memos | https://unicornscreener.vc/api/mcp |
| `vn.congluatviet/phap-luat` | Vietnamese legal documents, article text and legal effect status | https://congluatviet.vn/mcp |
| `vn.since98/zalo-business-reference` | Zalo ZBS message prices, OA plans, sending rules, error codes | https://since98.vn/api/mcp/zalo |
| `wedding.latido/latido` | Hungarian wedding vendors, venues, budgets and planning checklist | https://latido.wedding/mcp |
| `wiki.agenticweb/probe` | Agentic web standards, glossary, comparisons and spec changes | https://agenticweb.wiki/mcp |
| `wiki.apologetics/apologetics-wiki` | Bible verses, Greek and Hebrew word studies, Christian apologetics articles | https://apologetics.wiki/mcp |
| `wiki.golova/registry` | Event and AV equipment specs, compatibility, weight and power | https://golova.wiki/api/mcp |
| `wiki.lodestar/lodestar` | Lessons other AI agents learned doing real tasks | https://api.lodestar.wiki/mcp |
| `wiki.radix/radix-wiki` | Radix DLT community wiki | https://radix.wiki/api/mcp |
| `wiki.riemann/riemannwiki` | Status, verifications and reactions to Lean Riemann Hypothesis proof | https://riemann.wiki/mcp |
| `wiki.rust/rust-wiki` | Rust game items, skin prices, loot tables, servers, mechanics | https://rust.wiki/mcp |
| `wiki.sinapsi/sinapsi` | Verified public wikis with cited sections and provenance | https://sinapsi.wiki/mcp/hub/ |
| `wiki.swarmindex/boards` | Agent discussion boards, their rules, status and join steps | https://swarmindex.wiki/mcp |
| `wiki.themeparks/mcp` | Theme park ride wait times, status, opening hours and history | https://api.themeparks.wiki/mcp |
| `wiki.wallstreet/canon` | Finance term definitions, reference tables and deterministic formulas | https://canon.wallstreet.wiki/mcp |
| `wiki.wowdb/mcp` | WoW Forever items, recipes, abilities, and quests | https://wowdb.wiki/api/mcp |
| `wine.beyond/beyond-wine` | No and low alcohol specialty beverages, producers, and people | https://beyond.wine/mcp |
| `wine.spillthe.www/wineries` | 20,000 wineries worldwide with regions, hours and tasting fees | https://www.spillthe.wine/mcp |
| `work.agentexchange/finder` | Live pay-per-call x402 APIs, prices and seller demand | https://store.agentexchange.work/finder/mcp |
| `work.aitpm/knowledge` | AI, architecture, governance, and technical product management articles | https://mcp.aitpm.work/mcp |
| `work.aitrainer/jobs` | Open AI training and RLHF jobs with pay statistics | https://aitrainer.work/mcp |
| `work.resumebooster/jobs` | Open job postings from employers' hiring systems and hiring records | https://bwhdazbotpblihdxcmho.supabase.co/functions/v1/agent-mcp |
| `works.jobsweep/jobsweep` | Open job listings from company career sites worldwide | https://jobsweep.works/mcp |
| `works.narrate/public` | Impact management glossary, metrics, sources and articles from Narrate | https://narrate.works/mcp/public |
| `world.jobo/job-search` | Live open job listings from employer career sites | https://jobs-mcp.jobo.world/mcp |
| `world.wheelofheaven.mcp/corpus` | Comparative mythology encyclopedia, primary texts and datasets | https://mcp.wheelofheaven.world/mcp |
| `ws.overflo/overflows` | CVEs, CISA KEV, EPSS and vulnerable or malicious open-source packages | https://mcp.overflo.ws/mcp |
| `xyz.agoreum/agoreum-public` | Directory of AI agents and services with reputation | https://agoreum.xyz/api/v1/mcp/public |
| `xyz.aitrainingjobs/jobs` | Open AI training jobs, platforms, screening and pay rates | https://aitrainingjobs.xyz/mcp |
| `xyz.bd5d/bd5d-archive` | Early BrainDrops releases, artists, holdings, and editorial research | https://bd5d.xyz/mcp |
| `xyz.bizclaw/business-directory` | Company directory with profiles and categories | https://bizclaw.xyz/mcp |
| `xyz.cozu/cozu` | Free CC BY 3D models with downloads and credit lines | https://cozu.xyz/mcp |
| `xyz.darksearch/search` | Full-text search of web pages published on IPFS | https://www.darksearch.xyz/mcp |
| `xyz.jakelawrence.www/research` | Research studies, open-data releases and verifiable claims on AI and civic data | https://www.jakelawrence.xyz/mcp |
| `xyz.krimskrams/fcc-license-search` | FCC radio licenses by company, call sign and status changes | https://fcc-license-search.krimskrams.xyz/mcp |
| `xyz.krimskrams/grant-search` | US federal grants and EU funding opportunities | https://grant-search.krimskrams.xyz/mcp |
| `xyz.loadbay/loadbay` | Catalog of open-source AI agent harnesses, MCP servers and SDKs | https://loadbay.xyz/api/mcp |
| `you.curo/peptide-research` | Peptide study findings, evidence summaries, dosing reports and lab COAs | https://mcp.curo.you/mcp |
| `za.co.getlawed/sa-law` | South African judgments, Acts, municipal by-laws and zoning schemes | https://getlawed.co.za/api/mcp/law |
| `za.co.netbrainis/catalogue` | Netbrain products: JVM tooling, ML models, compliance APIs | https://www.netbrainis.co.za/mcp |
| `za.co.theahg/ahg-archives` | Archival descriptions, authority records and digitized documents from AtoM catalogues | https://mcp.theahg.co.za/public/mcp |
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
