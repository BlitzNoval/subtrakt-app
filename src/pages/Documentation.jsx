import React from 'react';
import '../styles/Documentation/Documentation.css'; // Import the CSS for styling
import '../styles/Documentation/Documentation2.css'; // Import the CSS for styling

const Documentation = ({ screenSize }) => {
  return (
    <div className="documentation-page">
      <div className="documentation-header">
        <h1>Development Documentation</h1>
        <p>Comprehensive explanation of my thought process and rationale behind the architecture, design and features implementation throughout the web app. The development spanned over 3.5 weeks of work built upon the foundation and premise shown in Assignment 2.</p>
      </div>

      {/* Development Timeline */}
            <div className="documentation-section">
        <h2>Changes From Assignment 2</h2>
        
        <div className="subsection">
          <h3>Reduced Charts</h3>
          <p> Reduced the amount of charts on both the Budget and Usage pages.</p>
          <p> The reasoning behind this is purely clutter. When coding it, it became a hard thing to balance visual data efficiently with so many charts all over the place. I found the two charts I had were plenty enough to convey the information I wanted the user to have.</p></div>

        <div className="subsection">
          <h3>Color Changes</h3>
           <h4>Reasoning</h4>
          <p>I made a couple changes to the color palette, specifically the metric cards. The reason behind this was to accommodate a visual tone across the app which I hadn’t accounted for in the Assignment 2 documentation. I don't want this app to feel like a modern, corporate shill app - I want it to be an interactive experience where users can engage with data in a way that makes sense and is visually pleasing. It also helped to align with Dark Mode and Colorblind Mode.</p>
        </div>
      </div>

       {/* Development Timeline */}
            <div className="documentation-section">
        <h2>Personal Development Journey</h2>
        
        <div className="subsection">
        <h3>The Reality of My Previous Work</h3>
        <p>
          If I’m being honest - the React coding test kicked my butt. From so many factors-bad day, no sleep, and a not-so-simple test-I took a big hit on my IM mark. IM is one of my favourite modules in terms of technical learning and I enjoy it. React was overwhelming at first, and a lot of my code was and still is messy. Looking back at my earlier work, I can see massive gaps in my code and understanding. My thinking lacked a technical understanding that held me back.
        </p>
        <p>
          When I got Assignment 2, I knew I had a foundation to redeem myself, but I knew the implementation would be where I proved to myself I can get the marks and create something good. I made a conscious decision that this final project would be different. The final project needed to be good and solid. I wasn’t going to submit something half-finished or poorly thought out.
        </p>
      </div>

        <div className="subsection">
        <h4>Reasoning</h4>
        <p>
          Over the weeks of development, I took a different approach. I built in small sections, I didn’t rush the code. I spent a couple of days trying to understand my app in terms of a mental model - how the states would flow, when I would use local vs context, how I would structure components for reusability.
        </p>
        <p>
          I researched a lot of React tutorials and industry professional guides and looked at complex states that would help with my app, as well as the accessibility implementation. I spent hours doing this and creating the folder structure in my head and learning their patterns. When I ran into a wall, I would instantly pull up as many solutions as possible to see what would work for me. I knew there are trade-offs to this, but by the end of it there are 0 errors in my project.
        </p>
        <p>
          Every decision came from this research and my understanding of React. My coding strength is still awful, but I took my time and had a lot of patience and bug fixing to get to this point. If I had to rebuild any component or code in this app, it would take me another 3 weeks. 😅
        </p>
        <p>
          But I have a much better understanding of the internal structure of my code and how my future code should be. What's different about this project isn't the final quality -it's that I can explain every decision I made. I know why I chose <u>useReducer</u> over <u>useState</u> for the subscription context. I understand why I separated my features into their own folders. I can defend my accessibility implementation and responsiveness choices. This isn't just working code—it’s code I understand and am proud of. This project represents not just what I can build now, but how I want to approach development in my career.
        </p>
        </div>
      </div>

      {/* Development Timeline */}
      <div className="documentation-section">
        <h2>Development Timeline and Process</h2>
        
        <div className="subsection">
          <h3>Phase 1: Foundation</h3>
          <p>I started with the normal React setup and established the basic pages with no content. The first thing I wanted to get going was the navigation between pages and how the routing should seem seamless. At the time I had the requirement of dynamic routing and having pages with "different" URLs using React Router V6 which is what we were told to use. The pages themselves were separate, but you would never be removed from the main navigation at any point in time. It was at this point when I realized that this was going to be a big app in terms of feature + design coherence. I made a mental note to remember that.</p>
          
          <p>I set up the initial component structure with Sidebar.jsx as the ground zero for the project and the folder organization. I separated my folder into components, pages and CSS for the time being that was good enough, I also created a skeleton for what would become the global Context (SubscriptionContext.js) which would be the brain behind the information passing throughout the app.</p>
        </div>

        <div className="subsection">
          <h3>Phase 2: Core Features</h3>
          <p>I cannot stress this enough, my entire app was CSS barren for the best part of a week. I had taken a decision to create building blocks for myself as that's how I usually work with code and building the entire backend functionality before touching any CSS. I had my core features planned out already from Assignment 2, I just needed to work through each page and do it. However, something that I recognized early is a lot of features were overlapping into other pages, meaning modular, reusable components would be crucial to dev time as well as redundancy.</p>
          
          <p>I started with the Dashboard as it was the most exciting no other reason, in hindsight I should've started with the Subscriptions Tab which is where the core of data would be pulled across to all the other tabs. Nonetheless, the easiest way to get my idea of a bento grid across was to break the blocks into grids, this required some CSS but purely functional. I took apart each block meticulously shifting the positions around as well as setting up functionality for core information to be pulled from the global state manager such as subscription numbers, logos, dates, times and labels.</p>
          
          <p>Something I was working on alongside this was the accessibility features as I knew they were going to be a heavy task and I wanted to do it right, I had implemented 4 by the end of the project essentially, they were all hardcoded, but I took a lot of research in doing dark mode and dyslexia mode. The large text mode was easy to implement, the hardest was the colorblind mode as I had to find the correct tones and blending to make it all match. I couldn't do multiple colorblind modes, so I stuck to the most common one, Deuteranopia. Deuteranopia is a form of red-green color blindness which my app features prominently alongside a mix of broken-down hues of green and blues.</p>
          
          <p>I tried to make a lot of my app text based as well as using color indicators but that will be discussed in the CSS section of this. Once I was done with this section of the dashboard and getting a couple of good things done with the accessibility options, I decided to move over to the Subscriptions page where I could start developing the app experience and running some fun data through it.</p>
        </div>
      </div>

      {/* Subscriptions Page */}
      <div className="documentation-section">
        <h2>Subscriptions Page</h2>
        
        <p>The initial concept of the page started with CRUD operations, broken down like so:</p>
        <ul className="feature-list">
          <li><strong>Create:</strong> Create the new subscription, allow the user to input the data themselves. At this stage, there are no input constraints or validations applied.</li>
          <li><strong>Read:</strong> Transfer said inputs into a logical format aka. a table where everything could be displayed in a readable fashion.</li>
          <li><strong>Update:</strong> Allow the user to edit said data and make changes which would reflect in the table instantaneously.</li>
          <li><strong>Delete:</strong> Allow the user to remove a subscription and not have it stuck in a loop of waiting for the page to update to reflect the deletion.</li>
        </ul>
        
        <p>This whole system would run through modal popups which would be helpful for form validation when I came to it, I did it by combining both the Context with useReducer for predictable state updates.</p>
        
        <p>This was an active choice over useState for the reason of how many calculations would occur from the derived states. The recalculation that was occurring with every edit, every new subscription added, every single metric necessitated the useReducer hook which allowed me to manage frequent automatic recalculations, particularly with edits and deletes, allowing for a range of action-based state changes. To finish the loop, I decided to sync the state with LocalStorage.</p>
        
        <div className="image-placeholder">
          <p className="placeholder-text"><img src="/images/Doc/Subscription.png" alt="Form validation logic code" /></p>
        </div>
      </div>

      {/* Modal System */}
      <div className="documentation-section">
        <h2>Modal System</h2>
        
        <p>The modal system was apart of a component system which would be seen throughout development.</p>
        
        <div className="image-placeholder">
          <p className="placeholder-text"><img src="/images/Doc/Modal.png" alt="Form validation logic code" /></p>
        </div>
        
        <p>As seen here I went for a navigable tab interface, splitting basic information from detail data. This was not hard to do, but I wanted more advanced implementation within the component itself. Making use of the knowledge I had learnt from last year in IM3, It wasn't a challenge to implement form validation, checking for invalid inputs or negative values was priority as if information was inputted that wasn't correctly formatted it would reflect across the entire app.</p>
        
        <p>One of my favourite features is the Auto-population. I know it's not the most complex task but for me it was my first time attempting it at this level its embedded in the Add Subscription modal. Essentially, it's a dropdown which shows the available subscriptions which are supported on the platform (more on this in the data section). It makes use of smart defaults when selected predefined services, the user can choose between manually inputting a subscription which isn't available but if they choose the predefined service, it will autofill the fields for them.</p>
        
        <div className="subsection">
          <h3>Form Validation Logic</h3>
          <div className="image-placeholder">
            <p className="placeholder-text"><img src="/images/Doc/Form.png" alt="Form validation logic code" /></p>
          </div>
        </div>
      </div>

      {/* Chart Integration */}
      <div className="documentation-section">
        <h2>Chart Integration – Visual representation of budget limits & usage vs value</h2>
        
        <p>Moving on from the subscriptions page is the next two pages which consist of the same format with different use cases. The Budget page shows the spending of the user and allows editable budget option while showing the user if they have exceeded their limit and where they can save and what they should look at cancelling, this information is presented in a doughnut chart.</p>
        
        <p>The Usage page take the hours spent on a subscription (manually inputted by the user) and makes calculations to determine the value. The usage/time to have a value per hour of usage. This is presented in a doughnut chart as well.</p>
        
        <p>Both charts make use of react-chartjs-2 and update with the subscriptions state. It detects over budgeting by using the total subscription cost and putting it against the set price and has a visual indication of this. In addition to that the category tags are used in the breakdown of the charts to show distribution of spending/usage.</p>
        
        <p>On the budget page there are two cards which are automatic identifiers of the spending extremes (highest, lowest) it represents them to show the user where they have spread their financial management over.</p>
      </div>

      {/* Usage Analytics Engine */}
      <div className="documentation-section">
        <h2>Usage Analytics Engine</h2>
        
        <p>The usage page is where I tried to flex in terms of my ability to do math (it was a horrible mistake :D). It takes the users inputted usage hours and transforms them into meaningful value metrics.</p>
        
        <p>The core system converts the various frequencies (daily, weekly, monthly) into standardized monthly hours. It then calculates the value the user gets per rand spent.</p>
        
        <p>The function fetches the user tracked usage from the global state and brings it into the calculation. It takes away any non-numeric characters (there shouldn't be any, but its just a check to ensure the formula doesn't get wrecked by a system glitch) it also helps with removing the currency R if it appears and makes the math is consistent. It then puts int in a monthlyHours / price * 10, this improve the readability of the pricing in the chart eg. 2.5 hours per R10 spent.</p>
        
        <p>It then pushes it to the chart and keeps everything concise for the visual display and it can be used anywhere within the app. Its reused in the SubscriptionDetails.jsx.</p>
        
        <p>This score of per R spent is where my subscription management app stands apart from the rest it shows actual insights into your subscriptions and spots the underused or overpriced subscriptions, empowering smarter budget decision by weighing cost vs utility.</p>
        
        <p>To put a nice little ribbon on it all there are usage patterns which show nice cute insights into the users behaviour and makes them question usage as well as real world application.</p>
        
        <div className="subsection">
          <h3>Real-World Application:</h3>
          <p>This engine asks critical questions for the users subscription management:</p>
          <ul className="feature-list">
            <li>"Am I getting value from my Netflix subscription at R179/month?"</li>
            <li>"Which service gives me the most entertainment hours per rand?"</li>
            <li>"What should I cancel based on actual usage vs. cost?"</li>
          </ul>
        </div>
      </div>

      {/* Search and Filter System */}
      <div className="documentation-section">
        <h2>Search and Filter System</h2>
        
        <p>The Search/Filter system was easy to implement, it used the same thought process as the auto population but instead of searching and was filtering. I also implemented the filter by criteria, price category etc. the filter could be stacked to help with larger sets of subscriptions so a user can identify subscriptions with more fine tuning. I added a debouncing feature, this means filtering only triggers after a short pause in typing, reducing unnecessary calculations.</p>
        
        <p>I ran into a lot of problems with the filter non persisting when I left the Subscriptions page. This was frustrating for usability and damaged the UX design of the app, as if I left the page for just a second, I would lose all my criteria. In addition to a filter persistence by using sorting the current filter state in localStorage or global context, meaning the filters were never unapplied.</p>
        
        <p>The addition of some visual feedback in terms of the counter was just a small design challenge I took on for myself on how I could indicate to the user the filters were always active and allow them to have constant feedback that their filters were being applied in real time.</p>
      </div>

      {/* Responsive Design Architecture */}
      <div className="documentation-section">
        <h2>Responsive Design Architecture</h2>
        
        <p>One thing I challenged myself with doing this time was building a responsive app. In the past in assignments and personal projects, I had always fallen short in terms of responsive sometimes even resulting in unusable functionality. I set out to build a system which I could not only use for this but also any future projects. The system I have in place isn't perfect, but its complexity is just at its start, it's a combination of CSS Grid and Flexbox for bento aesthetic I was aiming for as well as a bunch of JavaScript-driven breakpoints. Since Tailwind or Bootstrap wasn't available custom code was my next best option. What I have is functional, but it could go deeper, I want it to be scalable and modular.</p>
        
        <p>The way it works is as follows. The breakpoints are declared as constant, handing the reigns over to them have complete control over the responsive logic. It allows for a finer line drawn between design behaviours when going through different sizes. The useResponsive hook tracks window dimensions and determines the breakpoint at any given moment.</p>
        
        <p>I wanted to avoid hard coding as that would stick this whole system to this project alone and as stated before that's not the aim of this. I wanted the components and pages to avoid having to rely on utility classes but rather have a system which dynamically assigns responsive behaviours to CSS properties (content padding, sidebar width, navbar height etc.) based on the assign breakpoint. This is the big one, the components can adapt visually without having to re-render :D</p>
        
        <p>Was a game changer for the layout I had, as well as avoiding a thousand lines of media queries and classes.</p>
        
        <p>I still have the media queries as fallbacks but purely built in there for core component CSS fallback not overall functionality. This system I have right now allows any component to access the useResponsive hook and be aware of the current breakpoint.</p>
        <p>This video was a big help in doing all of this: <a href="https://www.youtube.com/watch?v=2VmvONbjDNU">"Create a Custom React Hook to Add Responsive Features to an Application"</a></p>
        <div className="image-placeholder">
          <p className="placeholder-text"><img src="/images/Doc/Responsiveness.png" alt="Form validation logic code" /></p>
        </div>
        
        <p>This system allows modular with new rules for other screen sizes to be added later right now it supports mobile through to 4k and the normal sizes in between</p>
        
        <p>It's like a puppet show except the strings aren't being pulled by me frantically behind the curtain -- it's a weird choreography that the system knows where it needs to be. Each component moves where it needs to be as the screen size shifts, without me having to rewrite a new act every time.</p>
        
        <p><strong>It's not just responsive - it's orchestrated.</strong></p>
      </div>

      {/* File Architecture and Structure */}
      <div className="documentation-section">
        <h2>File Architecture and Structure</h2>
        
        <div className="code-block">
          <pre>
{`src/
├── components/ — Reusable UI components
├── features/ — Feature-specific component groups
│    ├── Dashboard/
│    ├── Subscriptions/
│    ├── Budget/
│    ├── Usage/
│    └── Settings/
├── pages/ — Top-level route components
├── context/ — Global state management
├── utils/ — Utilities and helpers
└── styles/ — Organized CSS architecture`}
          </pre>
        </div>
        
        <p>Each page has its own dedicated organization. It's called feature-based organization, the components are grouped by functionality it allowed me to have total control over development of individual components and features within them. I created clear boundaries between UI, logic and components.</p>
        
        <p>Once again my reasoning behind this is future expansion, I plan on revisiting this app, and this system allows me to get right into things without having to relearn the entire code structure, I can just reference the intense organizational elements. I broke down the Feature specific components by page by having the system set up as a 3 tier component architecture:</p>
        
        <div className="tier-system">
          <div className="tier">
            <h4>Tier 1</h4>
            <ul className="feature-list">
              <li>Minimal logic</li>
              <li>Imports and renders Main feature components</li>
              <li>Route Entry Point</li>
            </ul>
          </div>
          
          <div className="tier">
            <h4>Tier 2</h4>
            <ul className="feature-list">
              <li>Feature orchestration and main logic</li>
              <li>State management for the feature</li>
              <li>Composition of all sub-components</li>
              <li>Where all component logic would get routed to, the sub-components would route to this main composer</li>
            </ul>
          </div>
          
          <div className="tier">
            <h4>Tier 3</h4>
            <ul className="feature-list">
              <li>Specific functionality implementation</li>
              <li>Pure components when possible</li>
              <li>Individual feature logic (form validation, chart rendering, etc.)</li>
              <li>Direct styling application</li>
              <li>Example: form validation or chart logic, as well as all the content for the pages sections</li>
            </ul>
          </div>
        </div>
        
        <div className="subsection">
          <h3>CSS Organization Philosophy:</h3>
          <p>Alongside all that the CSS styles were also broken down by sections (headers, footers, grid, form, metric cards etc.) if it had a component, it had a style sheet. This was perfect for modifying specific functionality easily.</p>
        </div>
        
        <div className="pros-cons">
          <div className="pros">
            <h4>Advantages</h4>
            <ul className="feature-list">
              <li>In my head this structure makes sense its how I mapped out the actual website in my head</li>
              <li>Its easy to add new features without restructuring</li>
              <li>A lot of the code is reusable in other components meaning I could reference multiple imports without having to redo any logic or styling. Such as the filter system being able to go across multiple pages</li>
            </ul>
          </div>
          
          <div className="cons">
            <h4>Drawbacks</h4>
            <ul className="feature-list">
              <li>There are a ton of files at first it was a little daunting to deal</li>
              <li>It did take me time to learn where everything was is to efficiently interact with the system</li>
              <li>Import Complexity was tough to manage when I didn't understand the routing and folder referencing</li>
            </ul>
          </div>
        </div>
        
        <div className="personal-note">
          <p><strong>Personal note:</strong> the more I used and learnt it and burned file locations into my mind the easier it became, and I didn't have to scroll through lines of code to find components or CSS I could easily swap.</p>
          <p>The long-term benefits of this is when I visit this project again I will have easy integration into the system as well as if I'm work with someone else on this.</p>
        </div>
      </div>

      {/* Accessibility */}
      <div className="documentation-section">
        <h2>Accessibility</h2>
        
        <p>Accessibility, where do I begin. This was a core consideration throughout development not an afterthought. As shown by my implementation of 4 comprehensive accessibility modes each addressing a separate issue. Each one was done with extensive research backing as well as careful implementation.</p>
        
        <p>As stated in Assignment 2 I would try my best to adhere to WCAG guidelines, taking into account that I didn't just want to go through a checklist, I wanted to create genuine inclusivity.</p>
        
        <div className="accessibility-modes">
          <div className="accessibility-mode">
            <h4>1. Dark Mode</h4>
            <p>A given in the modern climate of OS systems having built in detection for dark mode settings. It also helps reduce a heavy white space app with considering eye sensitivity on an app where you might spend a bit of time.</p>
            <p><strong>Challenge:</strong> Maintaining the identity of the website while inverting colours while also having everything remain visible and functional.</p>
          </div>
          
          <div className="accessibility-mode">
            <h4>2. Dyslexia Mode</h4>
            <p><strong>Readability & Accessibility</strong></p>
            <p>In my other module HOSAG I have dedicated a significant amount of time into Dyslexia in technology, so I had the foundational understanding of this and how to create a space which would help with this. I didn't get a chance to test it with someone who has dyslexia but, it improves the font by using OpenDyslexic font as well as double-spacing words and line height. Essentially helping in an environment where a lot of information can be on the screen it helps to have visuals such as charts and icon/color representation.</p>
          </div>
          
          <div className="accessibility-mode">
            <h4>3. Colorblind Mode</h4>
            <p>As spoken about earlier this was one of the earliest developed features in the app, it prominently features purple and green to combat colorblind problems for Deuteranopia.</p>
            
            <p>The design philosophy for this goes beyond just changing colors I implemented multiple information channels:</p>
            <ul className="feature-list">
              <li>Colour + Text</li>
              <li>Colour + Icons</li>
              <li>Patterns + Colour</li>
              <li>High Contrast Colours</li>
            </ul>
          </div>
          
          <div className="accessibility-mode">
            <h4>4. Large Text Mode *</h4>
            <p><strong>Visual Accessibility</strong></p>
            <p>This is the only mode, which is still a bit underwhelming on the app, I didn't get a chance to appropriately test and size everything, it's still there but I would put an asterisk next to it saying still under development. The purpose of this is to help with the smaller text on the screen and the numbers which a significant amount of people would struggle to read. However, this requires a monumental effort in changing the padding of all the cards to accommodate larger text.</p>
          </div>
        </div>
        
        <div className="subsection">
          <h3>User Experience:</h3>
          <p>The combination support allows multiple modes to be active simultaneously it handles it pretty well there are still some bugs specifically with the large text mode and how it interacts with the dyslexia mode.</p>
          <p>Easy to activate, it's a simple toggle on and off no need for reloading or any smoke and mirrors.</p>
        </div>
      </div>

      {/* Dynamic Routing */}
      <div className="documentation-section">
        <h2>Dynamic Routing</h2>
        
        <p>I have to be honest I forgot this was a requirement so its implementation is a bit haphazard but its not out of place. I didn't do the navigation with dynamic routing as they all exist within the same context routing. However the Subscriptions Details which can be accessed through the subscriptions table via actions or clicking on the relevant subscription.</p>
        
        <p>This takes you to a dynamically routed page which has its parameter search for the subscription and checks for the details and shows them in a panel. I did to proper handling of invalid subscriptions which don't have enough information it takes you to an error state. Its also instant loading as the content is dynamically transferred from all the pages into the page and shown to the user. It has a lot of features inside of it which are pulled from the context, but it also has a unique function which I had some fun coding in.</p>
        
        <p>The How to Cancel is a tiny button apart of the action's menu, it take the Subscription input and puts it as a String and transfer it to google:</p>
        
        <div className="example-block">
          <p><strong>Example:</strong> Disney+ Premium</p>
          <p>[Click "How to cancel button"]</p>
          <p><strong>Google Search =</strong> How to cancel "Disney+ Premium" Subscription</p>
        </div>
        
        <p>I wanted this feature to take the user directly to a cancel page but that would have me have the cancel pages in my JSON file.</p>
        
        <p>The Subscription Details page also contains logic to track any other relevant subscription in terms of category and show it to allow seamless navigation between subscriptions.</p>
      </div>

      {/* Loading States */}
      <div className="documentation-section">
        <h2>Loading States</h2>
        
        <p>I used smoke and mirrors for this I will admit, all the loading states are fake and are apart of making the user feel as if their data is connected to the internet, when in fact it's all a nice little JSON file with all the data. There are some points where loading is real, like with the charts but all the other pages are content heavy with cards so it's easy to pull the data.</p>
      </div>

      {/* Development Challenges */}
      <div className="documentation-section">
        <h2>Development Challenges & Solutions</h2>
        
        <div className="challenge">
          <h4>Challenge 1: Complex State Synchronization</h4>
          <p><strong>Problem:</strong> Multiple components needed access to calculated metrics</p>
          <p><strong>How I solved this:</strong> Centralized calculations in Context with automatic recalculation.</p>
        </div>
        
        <div className="challenge">
          <h4>Challenge 2: Form UX Complexity</h4>
          <p><strong>Problem:</strong> Subscription form had many fields with complex validation</p>
          <p><strong>Solution:</strong> Multi-tab interface with service search integration.</p>
        </div>
        
        <div className="challenge">
          <h4>Challenge 3: No API with the information I needed</h4>
          <p><strong>Problem:</strong> There is no API that exists of all the subscriptions that exists with all the tiers, pricing, plans etc. This was a struggle to deal with so I decided to do the following</p>
          <p><strong>Solution:</strong> I made use of AI and my knowledge to create a JSON file with as many subscriptions as I could possibly add without it becoming egregious. I tried to cover all the possibilities to show off the capabilities. In the future if I come back to this I will develop my own API so I can pull information so much easier than hardcoding.</p>
        </div>

        {/* References */}
        <div className="documentation-section">
          <h2>References</h2>
          <ul>
            <li>
              I got all icons from{' '}
              <a href="https://www.iconsdb.com/" target="_blank" rel="noopener noreferrer">
                https://www.iconsdb.com/
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Documentation;