document.addEventListener('DOMContentLoaded', function () {

  /* ============================================
     Footer year
     ============================================ */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================
     Mobile hamburger menu
     ============================================ */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ============================================
     Active nav state on scroll
     ============================================ */
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = ['top', 'field-guide', 'mind', 'real-life', 'daily-dose', 'store', 'about']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function updateActiveNav() {
    var scrollPos = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current.id);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ============================================
     Reveal on scroll
     ============================================ */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ============================================
     Back to top
     ============================================ */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     Shared modal (articles + legal)
     ============================================ */
  var modalOverlay = document.getElementById('modal-overlay');
  var modalEyebrow = document.getElementById('modal-eyebrow');
  var modalTitle = document.getElementById('modal-title');
  var modalBody = document.getElementById('modal-body');
  var modalClose = document.getElementById('modal-close');
  var lastFocused = null;

  function openModal(eyebrow, title, bodyHtml) {
    lastFocused = document.activeElement;
    modalEyebrow.textContent = eyebrow;
    modalTitle.textContent = title;
    modalBody.innerHTML = bodyHtml;
    modalOverlay.hidden = false;
    modalBody.scrollTop = 0;
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalOverlay.hidden) closeModal();
  });

  /* ============================================
     Inside The Mind — articles (10)
     ============================================ */
  var articles = [
    {
      tag: 'Behaviour',
      title: 'Why People Suddenly Change Their Energy',
      excerpt: 'A shift in warmth or effort rarely comes from nowhere.',
      body: [
        'When someone\u2019s energy changes toward you, it can feel sudden \u2014 but it rarely is. More often, something built up quietly before it became visible: a boundary that was crossed, a need that went unmet, or simply less capacity than before.',
        'One reason people don\u2019t announce the shift is that explaining it feels like starting a conflict they\u2019d rather avoid. So the change shows up in tone and effort instead of words.',
        'Noticing the change matters more than reacting to it. Sometimes the useful question isn\u2019t "what did I do," but "what changed around them" \u2014 because not every shift is about you.'
      ]
    },
    {
      tag: 'Observation',
      title: 'What Silence Can Reveal',
      excerpt: 'What someone doesn\u2019t say often carries real weight.',
      body: [
        'Silence gets read as absence, but it\u2019s rarely empty. A pause before answering, a topic someone avoids, a question they redirect \u2014 these are all information, if you\u2019re paying attention.',
        'Research on conversation suggests people often manage silence deliberately, using it to think, to protect themselves, or to avoid saying something they can\u2019t take back.',
        'The skill isn\u2019t filling silence faster. It\u2019s getting comfortable enough to sit inside it and actually notice what it\u2019s telling you.'
      ]
    },
    {
      tag: 'Attachment',
      title: 'Why People Pull Away',
      excerpt: 'Distance is sometimes protection, not rejection.',
      body: [
        'People pull away for very different reasons: overwhelm, fear of depending on someone, or simply needing space to process something on their own.',
        'It can look identical from the outside \u2014 less texting, shorter replies, more distance \u2014 even though the underlying reason is completely different from person to person.',
        'Instead of assuming the worst explanation, it often helps to ask directly, once, calmly. Not everyone will answer honestly, but most people respond better to a calm question than to silence followed by accusation.'
      ]
    },
    {
      tag: 'Boundaries',
      title: 'The Psychology of Being Less Available',
      excerpt: 'Availability quietly shapes how you\u2019re treated.',
      body: [
        'Constant availability can be mistaken for generosity, but it often removes any incentive for others to plan around you, respect your time, or notice your effort.',
        'Being less available isn\u2019t about playing games. It\u2019s about having a life full enough that your attention is actually worth something to the people who get it.',
        'People tend to value what requires a small amount of effort to reach. That doesn\u2019t mean withholding \u2014 it means not offering everything before it\u2019s asked for.'
      ]
    },
    {
      tag: 'Validation',
      title: 'Why Some People Need Constant Validation',
      excerpt: 'The need to be reassured usually points somewhere else.',
      body: [
        'A constant need for approval often traces back to environments where love, attention or safety felt conditional \u2014 tied to performance, mood, or being "enough" in some way.',
        'This isn\u2019t a character flaw. It\u2019s a pattern that made sense at some point and never fully updated.',
        'Where this shows up isn\u2019t always obvious: overexplaining, apologizing for having needs, or feeling anxious after a normal, neutral silence from someone else.'
      ]
    },
    {
      tag: 'Perception',
      title: 'Why We Notice Changes In People\u2019s Behaviour',
      excerpt: 'Small shifts stand out more than we expect.',
      body: [
        'Humans are unusually good at detecting change in familiar people \u2014 a slightly flatter tone, a delayed reply, less eye contact. This sensitivity likely developed because reading allies and threats mattered for survival.',
        'The risk is over-interpreting: turning one flat mood into a full story about what someone thinks of you.',
        'A useful habit is to notice the change, name it privately, and wait for a pattern before drawing a conclusion from a single moment.'
      ]
    },
    {
      tag: 'Self-Awareness',
      title: 'What Your Reactions Reveal About You',
      excerpt: 'How you respond says more than what happened.',
      body: [
        'The event itself is often less revealing than the reaction to it. Two people can face the same comment \u2014 one shrugs, one spirals \u2014 and the difference usually says more about their history than about the comment.',
        'Strong reactions are worth treating as information. What got touched? Was it really about this moment, or something older that this moment resembled?',
        'This isn\u2019t about suppressing feeling. It\u2019s about getting curious about it before acting on it.'
      ]
    },
    {
      tag: 'Communication',
      title: 'Why Overexplaining Can Hurt Your Position',
      excerpt: 'More words don\u2019t always mean more credibility.',
      body: [
        'Overexplaining often comes from a good place \u2014 wanting to be understood, to avoid conflict, to seem reasonable. But too much justification can read as uncertainty, even when the underlying point is solid.',
        'A short, calm answer usually carries more authority than a long one, because it signals you don\u2019t need permission to hold your position.',
        'Explaining once is communication. Explaining repeatedly to the same person is often an attempt to convince yourself.'
      ]
    },
    {
      tag: 'Boundaries',
      title: 'Why People Sometimes Respect Boundaries More Than Explanations',
      excerpt: 'A clear line often lands better than a long reason.',
      body: [
        'An explanation invites negotiation. A boundary, stated plainly, usually doesn\u2019t \u2014 and that clarity is often what makes it easier for other people to respect.',
        'When a boundary comes wrapped in justification, it can start to sound like a request for permission rather than a decision that\u2019s already been made.',
        'This doesn\u2019t mean context is never useful. It means the boundary itself should be able to stand without three paragraphs propping it up.'
      ]
    },
    {
      tag: 'Attention',
      title: 'Why Attention Changes The Way People Behave',
      excerpt: 'Being watched shifts behaviour, often without anyone noticing.',
      body: [
        'People tend to act differently when they know they\u2019re being observed \u2014 more polished, more careful, sometimes more generous. Psychologists have studied versions of this for decades under different names.',
        'This is worth remembering both ways: someone\u2019s public behaviour may not match how they act when attention is gone, and your own habits are worth examining for the same reason.',
        'A useful test of character, for anyone, is what stays the same when the audience disappears.'
      ]
    }
  ];

  var articleGrid = document.getElementById('article-grid');
  if (articleGrid) {
    articles.forEach(function (a) {
      var btn = document.createElement('button');
      btn.className = 'article-card';
      btn.setAttribute('aria-label', 'Read article: ' + a.title);
      btn.innerHTML =
        '<span class="article-tag">' + a.tag + '</span>' +
        '<h3>' + a.title + '</h3>' +
        '<p>' + a.excerpt + '</p>' +
        '<span class="article-read">Read \u2192</span>';
      btn.addEventListener('click', function () {
        openModal(a.tag, a.title, a.body.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
      });
      articleGrid.appendChild(btn);
    });
  }

  /* ============================================
     Real Life (12 cards)
     ============================================ */
  var truths = [
    { tag: 'Friendship', text: 'The friends who last are rarely the loudest ones \u2014 they\u2019re the ones who show up the same way in quiet seasons.' },
    { tag: 'Attraction', text: 'People are often drawn to calm more than charm. Calm suggests there\u2019s nothing to prove.' },
    { tag: 'Respect', text: 'Respect that has to be demanded usually isn\u2019t respect. It\u2019s compliance with a deadline.' },
    { tag: 'Communication', text: 'Most conflict isn\u2019t about the topic on the surface. It\u2019s about feeling unheard underneath it.' },
    { tag: 'Ambition', text: 'Discipline quietly outperforms motivation, because motivation doesn\u2019t show up on the hard days.' },
    { tag: 'Social Behaviour', text: 'People often treat you the way you\u2019ve shown them is acceptable \u2014 not the way you deserve.' },
    { tag: 'Loneliness', text: 'Being surrounded by people and still feeling unseen is one of the quieter, more common forms of loneliness.' },
    { tag: 'Confidence', text: 'Real confidence doesn\u2019t need an audience. If it disappears the moment no one\u2019s watching, it was performance.' },
    { tag: 'Boundaries', text: 'A boundary you never enforce isn\u2019t a boundary. It\u2019s a preference people learn to ignore.' },
    { tag: 'Growth', text: 'Growth often looks like doing less, not more \u2014 fewer distractions, fewer obligations that were never really yours.' },
    { tag: 'Relationships', text: 'Consistency is unglamorous, which is exactly why it\u2019s rare, and exactly why it matters.' },
    { tag: 'Human Nature', text: 'People rarely change because they were told to. They change when staying the same finally costs more.' }
  ];

  var truthsGrid = document.getElementById('truths-grid');
  if (truthsGrid) {
    truths.forEach(function (t) {
      var card = document.createElement('div');
      card.className = 'truth-card';
      card.innerHTML = '<span class="truth-tag">' + t.tag + '</span><p class="truth-text">' + t.text + '</p>';
      truthsGrid.appendChild(card);
    });
  }

  /* ============================================
     Quotes (12)
     ============================================ */
  var quotes = [
    'Not every change in someone\u2019s energy deserves a reaction.',
    'Sometimes observation tells you more than confrontation ever will.',
    'People reveal themselves slowly. Pay attention.',
    'Peace becomes powerful when you stop needing everyone to understand you.',
    'The calmest person in the room is usually the one who has already thought it through.',
    'Distance isn\u2019t always punishment. Sometimes it\u2019s just clarity.',
    'You don\u2019t need the last word to win the conversation.',
    'What you tolerate quietly teaches people how far they can go.',
    'Some people don\u2019t need to be confronted. They need to be observed a little longer.',
    'The version of you that stops explaining is usually the version that finally believes itself.',
    'A calm exit says more than an angry goodbye ever could.',
    'Being understood is nice. Being at peace without it is stronger.'
  ];

  var quoteText = document.getElementById('quote-text');
  var quoteNew = document.getElementById('quote-new');
  var quoteCopy = document.getElementById('quote-copy');
  var quoteShare = document.getElementById('quote-share');
  var quoteStatus = document.getElementById('quote-status');
  var lastQuoteIndex = -1;

  function showRandomQuote() {
    var i;
    do { i = Math.floor(Math.random() * quotes.length); } while (i === lastQuoteIndex && quotes.length > 1);
    lastQuoteIndex = i;
    if (quoteText) {
      quoteText.style.opacity = '0';
      window.setTimeout(function () {
        quoteText.textContent = '\u201C' + quotes[i] + '\u201D';
        quoteText.style.opacity = '1';
      }, 180);
    }
  }
  showRandomQuote();

  if (quoteNew) quoteNew.addEventListener('click', showRandomQuote);

  if (quoteCopy) {
    quoteCopy.addEventListener('click', function () {
      var text = quoteText ? quoteText.textContent : '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          quoteStatus.textContent = 'Quote copied.';
        }).catch(function () {
          quoteStatus.textContent = 'Could not copy. Please copy manually.';
        });
      } else {
        quoteStatus.textContent = 'Copying isn\u2019t supported on this browser.';
      }
      window.setTimeout(function () { quoteStatus.textContent = ''; }, 3000);
    });
  }

  if (quoteShare) {
    quoteShare.addEventListener('click', function () {
      var text = quoteText ? quoteText.textContent : '';
      if (navigator.share) {
        navigator.share({ text: text, title: 'Calm Authority' }).catch(function () {});
      } else {
        quoteStatus.textContent = 'Sharing isn\u2019t supported on this browser. Quote copied instead.';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text);
        }
        window.setTimeout(function () { quoteStatus.textContent = ''; }, 3500);
      }
    });
  }

  /* ============================================
     Daily Dose (40 entries, no consecutive repeat)
     ============================================ */
  var doses = [
    'Notice who gives you peace and who constantly makes you prove your value.',
    'Say less today. Watch what people reveal when you stop filling the silence.',
    'Do something uncomfortable without telling anyone you did it.',
    'Not every situation needs your explanation.',
    'Pay attention to how people behave when they no longer need anything from you.',
    'Try going one full day without explaining yourself when you don\u2019t need to.',
    'Listen to understand today, not to prepare your reply.',
    'Do one small thing you\u2019ve been postponing. Momentum often starts before motivation.',
    'Put your phone away for 20 minutes and sit with your own thoughts.',
    'Give someone genuine credit today without expecting anything back.',
    'Say less than you want to. Let your actions carry the rest of the message.',
    'Ask who you\u2019re becoming, not just what you\u2019re achieving.',
    'Rest isn\u2019t the opposite of progress. It\u2019s part of it.',
    'Notice the difference between being ignored and being given space.',
    'Practice finishing a thought before reacting to it out loud.',
    'Let one thing go today that isn\u2019t actually yours to carry.',
    'Watch how differently people act when they think no one\u2019s watching.',
    'Choose one conversation today where you ask more than you tell.',
    'Set a boundary today without over-explaining the reason for it.',
    'Notice how much of your day is reaction instead of choice.',
    'Spend five minutes today doing absolutely nothing productive, on purpose.',
    'Say the honest thing instead of the comfortable thing, once, today.',
    'Pay attention to what you do the moment you feel unseen.',
    'Ask yourself if you\u2019re tired, or if you\u2019re just done pretending you\u2019re not.',
    'Notice which relationships take more energy to maintain than they give back.',
    'Try responding slower than usual today. Watch what changes.',
    'Write down one thing you\u2019ve been avoiding saying out loud, even just to yourself.',
    'Do the hard conversation before it becomes a resentment.',
    'Notice what you reach for the moment you feel bored.',
    'Let today\u2019s compliment be for effort, not outcome.',
    'Go somewhere today with no phone and just observe people for ten minutes.',
    'Notice how often you apologize for things that don\u2019t need an apology.',
    'Ask one person today a question you actually want the answer to.',
    'Sit with a decision for an hour today before announcing it.',
    'Notice the people who only appear when they need something.',
    'Try saying "I don\u2019t know" today instead of guessing to sound certain.',
    'Do one thing today purely because it\u2019s right, with no one there to see it.',
    'Notice how your body feels right before you people-please.',
    'Let a small inconvenience today pass without commenting on it.',
    'Ask yourself what you\u2019d do differently if you weren\u2019t worried what it looked like.'
  ];

  var doseBtn = document.getElementById('dose-btn');
  var doseOutput = document.getElementById('dose-text');
  var lastDoseIndex = -1;

  if (doseBtn && doseOutput) {
    doseBtn.addEventListener('click', function () {
      var i;
      do { i = Math.floor(Math.random() * doses.length); } while (i === lastDoseIndex && doses.length > 1);
      lastDoseIndex = i;
      doseOutput.style.opacity = '0';
      window.setTimeout(function () {
        doseOutput.textContent = doses[i];
        doseOutput.style.opacity = '1';
      }, 180);
    });
  }

  /* ============================================
     The Authority Store (12 slots)
     ============================================ */
  var products = [
    {
      cat: 'Digital · Field Guide 01',
      name: 'Read the Room: 25 Human Behaviour Patterns People Often Miss',
      desc: 'A digital PDF field guide to 25 patterns in human behaviour that most people overlook.',
      price: 'US$3.99',
      link: 'https://stefanusbrownel.gumroad.com/l/ykpdj',
      img: 'assets/read-the-room-cover-560.jpg',
      own: true
    }
  ];

  var storeGrid = document.getElementById('store-grid');
  var filterBtns = document.querySelectorAll('.filter-btn');

  if (storeGrid) {
    products.forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'product-card product-card-feature';
      card.setAttribute('data-category', 'digital');
      var rel = p.own ? 'noopener noreferrer' : 'noopener noreferrer sponsored';
      card.innerHTML =
        '<a class="product-thumb" href="' + p.link + '" target="_blank" rel="' + rel + '" tabindex="-1" aria-hidden="true">' +
          '<img src="' + p.img + '" width="560" height="795" alt="" loading="lazy" decoding="async">' +
        '</a>' +
        '<div class="product-body">' +
          '<span class="product-category">' + p.cat + '</span>' +
          '<p class="product-name">' + p.name + '</p>' +
          '<p class="product-desc">' + p.desc + '</p>' +
          '<p class="product-price">' + p.price + '</p>' +
          '<a class="btn btn-gold" href="' + p.link + '" target="_blank" rel="' + rel + '">GET YOUR COPY</a>' +
        '</div>';
      storeGrid.appendChild(card);
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      storeGrid.querySelectorAll('.product-card').forEach(function (card) {
        var show = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('hidden-item', !show);
      });
    });
  });

  /* ============================================
     Newsletter (front-end only, no endpoint yet)
     ============================================ */
  // Set this to a real email provider's endpoint URL when one is connected.
  // Example, once connected:
  //   var NEWSLETTER_ENDPOINT = 'https://your-provider.com/api/subscribe';
  //   fetch(NEWSLETTER_ENDPOINT, { method: 'POST', body: JSON.stringify({ email: email }) })
  var NEWSLETTER_ENDPOINT = '';

  var newsletterForm = document.getElementById('newsletter-form');
  var newsletterStatus = document.getElementById('newsletter-status');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('newsletter-email').value.trim();
      if (!email) return;

      if (!NEWSLETTER_ENDPOINT) {
        newsletterStatus.textContent = 'Newsletter signup will be connected soon. Nothing was stored just now.';
        window.setTimeout(function () { newsletterStatus.textContent = ''; }, 5000);
        return;
      }

      // Once NEWSLETTER_ENDPOINT is set, replace this block with a real request, e.g.:
      // fetch(NEWSLETTER_ENDPOINT, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email: email }) })
      //   .then(function () { newsletterStatus.textContent = 'Thanks — you\u2019re on the list.'; })
      //   .catch(function () { newsletterStatus.textContent = 'Something went wrong. Please try again.'; });
      newsletterForm.reset();
    });
  }

  /* ============================================
     Legal modals
     ============================================ */
  var legalContent = {
    privacy: {
      title: 'Privacy',
      body: [
        'This is placeholder privacy text and should be reviewed by a qualified professional before formal publication. Calm Authority has not obtained legal advice in preparing it.',
        'Calm Authority does not currently collect personal data through this website beyond what a visitor voluntarily submits, such as an email address through the newsletter form.',
        'The newsletter form is front-end only until an email provider is connected. No submissions are currently stored or transmitted anywhere.'
      ]
    },
    terms: {
      title: 'Terms',
      body: [
        'This is placeholder terms text and should be reviewed by a qualified professional before formal publication. Calm Authority has not obtained legal advice in preparing it.',
        'Calm Authority is a media and commentary brand. Content is offered for perspective and reflection, not as professional, medical, psychological or legal advice.',
        'By using this site, you agree that Calm Authority is not liable for decisions made based on its content.'
      ]
    },
    affiliate: {
      title: 'Affiliate Disclosure',
      body: [
        'This is placeholder disclosure text and should be reviewed before formal publication.',
        'Some links on this site, particularly within The Authority Store, may be affiliate links.',
        'If you purchase through them, Calm Authority may receive a small commission at no additional cost to you. Affiliate links are used only for products Calm Authority would recommend regardless of commission.'
      ]
    }
  };

  document.querySelectorAll('[data-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-modal');
      var entry = legalContent[key];
      if (!entry) return;
      openModal('Legal', entry.title, entry.body.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    });
  });

});
