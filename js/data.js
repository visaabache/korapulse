/* KoraPulse — site content (JSON inside, so the Worker can read it for link previews).
   Everything the site shows comes from this file: menus, articles, scores, the table,
   comments, authors and uploaded images. Edit it in the admin dashboard (/admin/) and publish
   with "Settings → Publish & Backup → Download data.js", then upload it here as js/data.js.
   The articles, clubs, players and scores are sample content: replace them before launch. */
window.KP = {
  "site": {
    "name": "KoraPulse",
    "tagline": "Football news from Morocco, Africa and the world",
    "email": "contact@korapulse.com",
    "social": {
      "instagram": "https://www.instagram.com/kora_pulsee/",
      "x": "#",
      "facebook": "#",
      "youtube": "#",
      "tiktok": "#",
      "linkedin": "#"
    },
    "comments": false,
    "ticker": "auto",
    "tr": {
      "fr": {
        "tagline": "L'actualité du football au Maroc, en Afrique et dans le monde"
      },
      "ar": {
        "tagline": "أخبار كرة القدم من المغرب وإفريقيا والعالم"
      }
    },
    "languages": [
      "en",
      "fr",
      "ar"
    ]
  },
  "categories": [
    {
      "slug": "news",
      "name": "News",
      "subs": [],
      "tr": {
        "fr": {
          "name": "Actualités",
          "subs": []
        },
        "ar": {
          "name": "أخبار",
          "subs": []
        }
      }
    },
    {
      "slug": "botola",
      "name": "Botola Pro",
      "subs": [
        "Results",
        "Clubs",
        "Previews"
      ],
      "tr": {
        "fr": {
          "name": "Botola Pro",
          "subs": [
            "Résultats",
            "Clubs",
            "Avant-match"
          ]
        },
        "ar": {
          "name": "البطولة الاحترافية",
          "subs": [
            "النتائج",
            "الأندية",
            "تقديم المباريات"
          ]
        }
      }
    },
    {
      "slug": "atlas-lions",
      "name": "Atlas Lions",
      "subs": [
        "Senior team",
        "U23",
        "Interviews"
      ],
      "tr": {
        "fr": {
          "name": "Lions de l'Atlas",
          "subs": [
            "Équipe A",
            "U23",
            "Entretiens"
          ]
        },
        "ar": {
          "name": "أسود الأطلس",
          "subs": [
            "المنتخب الأول",
            "أقل من 23 سنة",
            "حوارات"
          ]
        }
      }
    },
    {
      "slug": "africa",
      "name": "Africa",
      "subs": [
        "AFCON",
        "CAF Champions League"
      ],
      "tr": {
        "fr": {
          "name": "Afrique",
          "subs": [
            "CAN",
            "Ligue des champions CAF"
          ]
        },
        "ar": {
          "name": "إفريقيا",
          "subs": [
            "كأس أمم إفريقيا",
            "دوري أبطال إفريقيا"
          ]
        }
      }
    },
    {
      "slug": "europe",
      "name": "Europe",
      "subs": [
        "Champions League",
        "Premier League",
        "LaLiga"
      ],
      "tr": {
        "fr": {
          "name": "Europe",
          "subs": [
            "Ligue des champions",
            "Premier League",
            "LaLiga"
          ]
        },
        "ar": {
          "name": "أوروبا",
          "subs": [
            "دوري الأبطال",
            "الدوري الإنجليزي",
            "الدوري الإسباني"
          ]
        }
      }
    },
    {
      "slug": "transfers",
      "name": "Transfers",
      "subs": [],
      "tr": {
        "fr": {
          "name": "Transferts",
          "subs": []
        },
        "ar": {
          "name": "الانتقالات",
          "subs": []
        }
      }
    },
    {
      "slug": "women",
      "name": "Women",
      "subs": [],
      "tr": {
        "fr": {
          "name": "Féminin",
          "subs": []
        },
        "ar": {
          "name": "الكرة النسوية",
          "subs": []
        }
      }
    },
    {
      "slug": "world-cup-2030",
      "name": "World Cup 2030",
      "subs": [],
      "tr": {
        "fr": {
          "name": "Mondial 2030",
          "subs": []
        },
        "ar": {
          "name": "مونديال 2030",
          "subs": []
        }
      }
    },
    {
      "slug": "opinion",
      "name": "Opinion",
      "subs": [],
      "tr": {
        "fr": {
          "name": "Opinion",
          "subs": []
        },
        "ar": {
          "name": "رأي",
          "subs": []
        }
      }
    }
  ],
  "topLinks": [
    {
      "label": "Botola Pro",
      "href": "category.html?c=botola",
      "tr": {
        "fr": "Botola Pro",
        "ar": "البطولة الاحترافية"
      }
    },
    {
      "label": "Atlas Lions",
      "href": "category.html?c=atlas-lions",
      "tr": {
        "fr": "Lions de l'Atlas",
        "ar": "أسود الأطلس"
      }
    },
    {
      "label": "Champions League",
      "href": "category.html?c=europe&t=Champions%20League",
      "tr": {
        "fr": "Ligue des champions",
        "ar": "دوري الأبطال"
      }
    },
    {
      "label": "World Cup 2030",
      "href": "category.html?c=world-cup-2030",
      "tr": {
        "fr": "Mondial 2030",
        "ar": "مونديال 2030"
      }
    }
  ],
  "scores": [],
  "standings": {
    "title": "Botola Pro table",
    "rows": [],
    "tr": {
      "fr": {
        "title": "Classement Botola Pro"
      },
      "ar": {
        "title": "ترتيب البطولة الاحترافية"
      }
    }
  },
  "users": [
    {
      "id": "u1",
      "name": "KoraPulse Administration",
      "role": "Administrator",
      "bio": "",
      "tr": {
        "fr": "Administration KoraPulse",
        "ar": "إدارة كورابولس"
      }
    }
  ],
  "comments": [],
  "media": [],
  "articles": [
    {
      "id": "germany-thrash-netherlands-nations-league-quarter-finals",
      "cat": "europe",
      "tags": [],
      "image": "images/germany-netherlands-nations-league.jpg",
      "motif": "pitch",
      "title": "Germany Thrash the Netherlands 5-0 as Both Reach the Nations League Quarter-Finals",
      "excerpt": "Florian Wirtz scored twice in Berlin as Germany won their group with a 5-0 rout of the Netherlands. Both teams are through to the quarter-finals.",
      "body": [
        "Germany sent a strong message to the rest of Europe on Monday night in Berlin, beating the Netherlands 5-0 on the final matchday of the UEFA Nations League group stage.",
        "Germany led 1-0 at half-time and pulled away after the break. Florian Wirtz scored twice, in the 60th and 71st minutes, Schlotterbeck added a goal in between, and Brajan Gruda completed the scoring in the 77th minute.",
        "## Both teams through",
        "The result confirmed Germany as winners of Group A2. Despite the heavy defeat, the Netherlands also qualified for the quarter-finals by finishing second in the group.",
        "## A busy final round",
        "Germany and the Netherlands were not the only big stories of the round. Belgium came from behind to beat Italy 4-1, France beat Türkiye 2-1, and England won 3-2 in Madrid, ending Spain's 43-match unbeaten run. Slovenia won 3-0 in North Macedonia to secure a League A/B play-off place.",
        "Germany, the Netherlands, France, Belgium, England, Portugal and Spain are guaranteed places in the quarter-finals. The last spot is decided on Tuesday between Denmark and Norway.",
        "## What's next",
        "The quarter-final draw takes place on 20 November. The two-legged ties are played in March 2027, and the Nations League Finals follow in June 2027."
      ],
      "tr": {
        "fr": {
          "title": "L'Allemagne écrase les Pays-Bas 5-0, les deux équipes en quarts de finale de la Ligue des nations",
          "excerpt": "Florian Wirtz a marqué un doublé à Berlin, et l'Allemagne termine en tête de son groupe après sa large victoire 5-0 contre les Pays-Bas. Les deux sélections sont qualifiées pour les quarts.",
          "body": [
            "L'Allemagne a envoyé un message fort au reste de l'Europe lundi soir à Berlin, en battant les Pays-Bas 5-0 lors de la dernière journée de la phase de groupes de la Ligue des nations.",
            "Menée 1-0 à la pause, la Mannschaft a fait la différence en seconde période. Florian Wirtz a inscrit un doublé, à la 60e et à la 71e minute, Schlotterbeck a marqué entre-temps, et Brajan Gruda a clos la marque à la 77e minute.",
            "## Les deux équipes qualifiées",
            "Ce résultat assure à l'Allemagne la première place du groupe A2. Malgré cette lourde défaite, les Pays-Bas se qualifient eux aussi pour les quarts de finale grâce à leur deuxième place.",
            "## Une dernière journée riche",
            "L'Allemagne et les Pays-Bas n'ont pas été les seuls à faire l'actualité. La Belgique a renversé l'Italie 4-1, la France a battu la Türkiye 2-1, et l'Angleterre s'est imposée 3-2 à Madrid, mettant fin à une série de 43 matchs sans défaite de l'Espagne. La Slovénie a gagné 3-0 en Macédoine du Nord et s'assure une place en barrages Ligue A/B.",
            "L'Allemagne, les Pays-Bas, la France, la Belgique, l'Angleterre, le Portugal et l'Espagne sont assurés de disputer les quarts de finale. La dernière place se joue mardi entre le Danemark et la Norvège.",
            "## La suite",
            "Le tirage au sort des quarts de finale aura lieu le 20 novembre. Les matchs aller-retour se joueront en mars 2027, avant le Final Four en juin 2027."
          ]
        },
        "ar": {
          "title": "ألمانيا تكتسح هولندا بخماسية وتتأهلان معا إلى ربع نهائي دوري الأمم الأوروبية",
          "excerpt": "سجل فلوريان فيرتز هدفين في برلين، وتصدرت ألمانيا مجموعتها بعد فوز كبير على هولندا 5-0، فيما تأهل المنتخبان معا إلى ربع النهائي.",
          "body": [
            "وجهت ألمانيا رسالة قوية إلى باقي منتخبات أوروبا مساء الإثنين في برلين، بعدما تغلبت على هولندا بخمسة أهداف دون رد في الجولة الأخيرة من دور المجموعات لدوري الأمم الأوروبية.",
            "تقدم المنتخب الألماني بهدف في الشوط الأول، ثم حسم المباراة بعد الاستراحة. وسجل فلوريان فيرتز هدفين في الدقيقتين 60 و71، وأضاف شلوتربيك هدفا بينهما، قبل أن يختم براين غرودا الخماسية في الدقيقة 77.",
            "## تأهل المنتخبين",
            "ضمنت ألمانيا بهذا الفوز صدارة المجموعة الثانية من المستوى الأول، ورغم الهزيمة الثقيلة تأهلت هولندا بدورها إلى ربع النهائي بعد احتلالها المركز الثاني.",
            "## جولة أخيرة حافلة",
            "لم تكن مباراة ألمانيا وهولندا الحدث الوحيد في الجولة، إذ قلبت بلجيكا تأخرها أمام إيطاليا لتفوز 4-1، وتغلبت فرنسا على تركيا 2-1، وفازت إنجلترا في مدريد 3-2 لتنهي سلسلة إسبانيا من 43 مباراة دون هزيمة. كما فازت سلوفينيا 3-0 في مقدونيا الشمالية وضمنت مقعدا في الملحق بين المستويين الأول والثاني.",
            "وضمنت كل من ألمانيا وهولندا وفرنسا وبلجيكا وإنجلترا والبرتغال وإسبانيا مكانها في ربع النهائي، فيما يُحسم المقعد الأخير يوم الثلاثاء بين الدنمارك والنرويج.",
            "## ماذا بعد؟",
            "تُسحب قرعة ربع النهائي يوم 20 نونبر، وتُلعب مباريات الذهاب والإياب في مارس 2027، قبل الأدوار النهائية في يونيو 2027."
          ]
        }
      },
      "author": "KoraPulse Administration",
      "date": "2026-11-16",
      "modified": "2026-11-16T23:23:31",
      "status": "publish",
      "featured": false,
      "imageCredit": {
        "en": "Illustrative photo · Unsplash",
        "fr": "Photo d'illustration · Unsplash",
        "ar": "صورة توضيحية · Unsplash"
      }
    },
    {
      "id": "madrid-mayor-2030-world-cup-final-morocco-insult",
      "cat": "world-cup-2030",
      "tags": [],
      "image": "images/world-cup-2030-final-stadium.jpg",
      "motif": "stadium",
      "title": "Madrid Mayor Says a 2030 World Cup Final in Morocco Would Be \"an Insult\" to Spain",
      "excerpt": "José Luis Martínez-Almeida wants the final in Madrid or Barcelona. Morocco is bidding to stage it at the Grand Stade Hassan II, and FIFA says no decision has been made.",
      "body": [
        "The debate over where the 2030 World Cup final will be played has reignited after Madrid's mayor, José Luis Martínez-Almeida, said that losing the final to Morocco would be \"a direct insult\" to Spain.",
        "Speaking at Madrid City Hall, Almeida said the final must be played in Spain, ideally at the Santiago Bernabéu, and that he would support Barcelona's Camp Nou if Madrid is not chosen. He also suggested Spain should reconsider its role as co-host if the final goes elsewhere.",
        "## Spain's arguments",
        "Almeida argued that Spain and Portugal launched the joint bid before Morocco joined it, pointed to Spain's status as world champions, and highlighted the high marks FIFA gave the Bernabéu and the Metropolitano. According to reports, his position echoes that of opposition leader Alberto Núñez Feijóo, who has said Spain should not pay to host a tournament whose final is played abroad.",
        "## Morocco's project",
        "Morocco wants the final at the Grand Stade Hassan II, the new stadium under construction near Casablanca, designed to be one of the largest football stadiums in the world.",
        "## FIFA has not decided",
        "FIFA has said that the venue of the final has not been decided and will be chosen through its selection process. The 2030 World Cup will be co-hosted by Morocco, Spain and Portugal, with three opening matches in South America to mark the competition's centenary."
      ],
      "tr": {
        "fr": {
          "title": "Pour le maire de Madrid, une finale du Mondial 2030 au Maroc serait « une insulte » pour l'Espagne",
          "excerpt": "José Luis Martínez-Almeida veut la finale à Madrid ou à Barcelone. Le Maroc est candidat avec le Grand Stade Hassan II, et la FIFA indique qu'aucune décision n'a été prise.",
          "body": [
            "Le débat sur le lieu de la finale de la Coupe du monde 2030 est relancé : le maire de Madrid, José Luis Martínez-Almeida, a estimé que perdre la finale au profit du Maroc serait « une insulte directe » pour l'Espagne.",
            "S'exprimant à l'hôtel de ville de Madrid, il a affirmé que la finale devait se jouer en Espagne, idéalement au Santiago Bernabéu, et qu'il soutiendrait le Camp Nou de Barcelone si Madrid n'était pas retenue. Il a aussi laissé entendre que l'Espagne devrait reconsidérer son rôle de co-organisateur si la finale se jouait ailleurs.",
            "## Les arguments espagnols",
            "Selon lui, l'Espagne et le Portugal ont lancé la candidature commune avant que le Maroc ne la rejoigne. Il a aussi mis en avant le statut de champion du monde de l'Espagne et les excellentes notes attribuées par la FIFA au Bernabéu et au Metropolitano. D'après la presse, sa position rejoint celle du chef de l'opposition, Alberto Núñez Feijóo, qui a déclaré que l'Espagne ne devrait pas financer un tournoi dont la finale se jouerait à l'étranger.",
            "## Le projet marocain",
            "Le Maroc souhaite accueillir la finale au Grand Stade Hassan II, le nouveau stade en construction près de Casablanca, conçu pour figurer parmi les plus grands stades de football au monde.",
            "## La FIFA n'a pas tranché",
            "La FIFA a indiqué que le lieu de la finale n'est pas encore décidé et qu'il sera choisi à l'issue de son processus de sélection. Le Mondial 2030 sera co-organisé par le Maroc, l'Espagne et le Portugal, avec trois matchs d'ouverture en Amérique du Sud pour célébrer le centenaire de la compétition."
          ]
        },
        "ar": {
          "title": "عمدة مدريد: إقامة نهائي مونديال 2030 في المغرب «إهانة» لإسبانيا",
          "excerpt": "يطالب خوسيه لويس مارتينيث ألميدا بإقامة النهائي في مدريد أو برشلونة، بينما يترشح المغرب لاحتضانه في ملعب الحسن الثاني الكبير، والفيفا يؤكد أن القرار لم يُتخذ بعد.",
          "body": [
            "عاد الجدل حول مكان إقامة نهائي كأس العالم 2030 إلى الواجهة، بعدما صرح عمدة مدريد خوسيه لويس مارتينيث ألميدا بأن خسارة النهائي لصالح المغرب ستكون «إهانة مباشرة» لإسبانيا.",
            "وقال ألميدا، في تصريح من مقر بلدية مدريد، إن النهائي يجب أن يُقام في إسبانيا، ويفضل أن يكون في ملعب سانتياغو برنابيو، مضيفا أنه سيدعم ملعب كامب نو في برشلونة إذا لم يقع الاختيار على مدريد. كما ألمح إلى أن على إسبانيا إعادة النظر في دورها كبلد مضيف إذا أُقيم النهائي في مكان آخر.",
            "## حجج الجانب الإسباني",
            "يرى ألميدا أن إسبانيا والبرتغال أطلقتا الملف المشترك قبل انضمام المغرب إليه، كما استند إلى لقب إسبانيا العالمي والتقييمات العالية التي منحها الفيفا لملعبي برنابيو وميتروبوليتانو. وبحسب تقارير صحفية، يتقاطع موقفه مع موقف زعيم المعارضة ألبرتو نونييث فيخو، الذي قال إن إسبانيا لا ينبغي أن تموّل بطولة يُلعب نهائيها خارج أراضيها.",
            "## المشروع المغربي",
            "يطمح المغرب إلى احتضان النهائي في ملعب الحسن الثاني الكبير، الملعب الجديد الذي يجري تشييده قرب الدار البيضاء، والمصمم ليكون من أكبر ملاعب كرة القدم في العالم.",
            "## الفيفا لم يحسم بعد",
            "أكد الاتحاد الدولي لكرة القدم أن مكان إقامة النهائي لم يُحدد بعد، وأنه سيُختار وفق مسطرة الاختيار المعتمدة. ويُنظم مونديال 2030 بشكل مشترك بين المغرب وإسبانيا والبرتغال، مع ثلاث مباريات افتتاحية في أمريكا الجنوبية احتفالا بمئوية البطولة."
          ]
        }
      },
      "author": "KoraPulse Administration",
      "date": "2026-11-16",
      "modified": "2026-11-16T23:23:31",
      "status": "publish",
      "featured": false,
      "imageCredit": {
        "en": "Illustrative photo · Unsplash",
        "fr": "Photo d'illustration · Unsplash",
        "ar": "صورة توضيحية · Unsplash"
      }
    },
    {
      "id": "morocco-vs-niger-afcon-2027-qualifier-preview-rabat",
      "cat": "atlas-lions",
      "tags": [
        "Senior team"
      ],
      "image": "images/morocco-flag-fans.jpg",
      "imageCredit": {
        "en": "Illustrative photo · Unsplash",
        "fr": "Photo d'illustration · Unsplash",
        "ar": "صورة توضيحية · Unsplash"
      },
      "motif": "stadium",
      "title": "Morocco vs Niger Tonight: Atlas Lions Chase a Fourth Straight Win in AFCON 2027 Qualifying",
      "excerpt": "Four days after the 5-1 first leg, Morocco face Niger again tonight at the Moulay Abdellah Sports Complex in Rabat. Kick-off is at 8 p.m. Moroccan time (GMT).",
      "body": [
        "Morocco meet Niger for the second time in five days tonight, Tuesday 17 November, in the fourth round of qualifying for the 2027 Africa Cup of Nations. The match kicks off at 8 p.m. Moroccan time (GMT) at the Moulay Abdellah Sports Complex in Rabat.",
        "Niger are the nominal home side, but, as in Friday's first leg, the game is played in Morocco.",
        "## A perfect start",
        "The Atlas Lions have won all three of their qualifying matches so far and lead Group A with nine points. On Friday they beat Niger 5-1, with captain Achraf Hakimi scoring twice and Brahim Díaz setting up the opening goal.",
        "Niger have three points from their first three games. They opened with a 2-1 win over Lesotho, then lost 2-0 to Gabon before Friday's heavy defeat.",
        "## What to watch",
        "After the first leg, the coaching staff praised the new generation of players who were given a chance alongside the established stars. Tonight is another opportunity for them to impress, while a win would leave Morocco with twelve points from twelve and a big step closer to the 2027 tournament.",
        "Morocco start as clear favourites. Niger, who conceded five goals on Friday, will look to tighten up at the back and make the game more difficult than the first meeting.",
        "## How to follow the match",
        "Follow the live score on KoraPulse in the Live section, and find the result and reaction on the site after the final whistle."
      ],
      "tr": {
        "ar": {
          "title": "المغرب والنيجر الليلة: أسود الأطلس يبحثون عن فوز رابع توالياً في تصفيات كأس أمم إفريقيا 2027",
          "excerpt": "بعد أربعة أيام من الفوز 5-1 ذهاباً، يواجه المنتخب المغربي نظيره النيجيري مجدداً الليلة بالمركب الرياضي مولاي عبد الله في الرباط، على الساعة 20:00 بتوقيت المغرب.",
          "body": [
            "يلتقي المنتخب المغربي بنظيره النيجيري للمرة الثانية في خمسة أيام، مساء اليوم الثلاثاء 17 نونبر، لحساب الجولة الرابعة من تصفيات كأس أمم إفريقيا 2027. وتنطلق المباراة على الساعة 20:00 بتوقيت المغرب (غرينتش) بالمركب الرياضي مولاي عبد الله في الرباط.",
            "ورغم أن النيجر هي صاحبة الأرض رسمياً، تُلعب المباراة في المغرب كما كان الحال في مباراة الذهاب يوم الجمعة.",
            "## بداية مثالية",
            "حقق أسود الأطلس الفوز في مبارياتهم الثلاث الأولى في التصفيات، ويتصدرون المجموعة الأولى برصيد تسع نقاط. وفي مباراة الجمعة تغلبوا على النيجر بخمسة أهداف مقابل هدف، سجل منها القائد أشرف حكيمي هدفين، فيما صنع إبراهيم دياز الهدف الأول.",
            "أما منتخب النيجر فيملك ثلاث نقاط من ثلاث مباريات، بعدما افتتح مشواره بالفوز على ليسوتو 2-1، ثم خسر أمام الغابون 2-0، قبل الهزيمة الثقيلة يوم الجمعة.",
            "## ما يجب متابعته",
            "بعد مباراة الذهاب، أشاد الطاقم التقني بالجيل الجديد من اللاعبين الذين منحوا الفرصة إلى جانب النجوم المعروفين، وتمثل مباراة الليلة فرصة جديدة لهم لإثبات الذات. والفوز سيمنح المغرب 12 نقطة من أصل 12، ويقربه كثيراً من بلوغ نهائيات 2027.",
            "ويدخل المنتخب المغربي المباراة مرشحاً بقوة للفوز، بينما سيسعى منتخب النيجر، الذي استقبل خمسة أهداف يوم الجمعة، إلى تحسين أدائه الدفاعي وجعل المهمة أصعب مما كانت عليه في الذهاب.",
            "## كيف تتابع المباراة",
            "تابع النتيجة المباشرة على كورابولس في قسم «مباشر»، وستجد النتيجة وردود الفعل على الموقع بعد صافرة النهاية."
          ]
        }
      },
      "author": "KoraPulse Administration",
      "date": "2026-11-17",
      "modified": "2026-11-17T12:34:31",
      "status": "publish",
      "featured": false
    },
    {
      "id": "morocco-players-world-cup-2026-quarter-final-bonus-ouahbi",
      "cat": "atlas-lions",
      "tags": [
        "Senior team"
      ],
      "image": "images/morocco-fans-green-flare.jpg",
      "imageCredit": {
        "en": "Illustrative photo · Unsplash",
        "fr": "Photo d'illustration · Unsplash",
        "ar": "صورة توضيحية · Unsplash"
      },
      "motif": "stadium",
      "title": "Atlas Lions to Receive MAD 8 Million Each for 2026 World Cup Quarter-Final, Ouahbi MAD 16 Million, Reports Say",
      "excerpt": "According to Moroccan media, each Morocco player is set to receive a bonus of 800 million centimes for reaching the World Cup quarter-finals, and coach Mohamed Ouahbi 1.6 billion. The federation has not confirmed the figures.",
      "body": [
        "Morocco's players are set to receive a bonus of MAD 8 million (800 million centimes) each for reaching the quarter-finals of the 2026 World Cup, according to several Moroccan media outlets.",
        "Head coach Mohamed Ouahbi would receive double the players' amount, MAD 16 million (1.6 billion centimes), for leading the team to the last eight. One report puts the coach's bonus slightly higher, at 1.7 billion centimes.",
        "## Not officially confirmed",
        "The Royal Moroccan Football Federation (FRMF) has not published the amounts. The figures come from media reports citing sources close to the national team, so they should be treated with caution until an official announcement.",
        "## A historic run",
        "The bonuses reward Morocco's run to the quarter-finals of the 2026 World Cup, where the Atlas Lions were knocked out by France, 2-0.",
        "Before that quarter-final, Ouahbi had played down talk of money, saying that the only bonus that mattered was winning the World Cup.",
        "## Back to work",
        "The national team has since moved on to the 2027 Africa Cup of Nations qualifiers, where Morocco are top of Group A."
      ],
      "tr": {
        "fr": {
          "title": "Mondial 2026 : 8 millions de dirhams par joueur et 16 millions pour Ouahbi, selon la presse",
          "excerpt": "Selon des médias marocains, chaque joueur de l'équipe nationale recevrait une prime de 800 millions de centimes pour la qualification en quarts de finale du Mondial, et le sélectionneur Mohamed Ouahbi 1,6 milliard. La Fédération n'a pas confirmé ces montants.",
          "body": [
            "Les joueurs de l'équipe du Maroc recevraient chacun une prime de 8 millions de dirhams (800 millions de centimes) pour la qualification en quarts de finale de la Coupe du monde 2026, selon plusieurs médias marocains.",
            "Le sélectionneur Mohamed Ouahbi toucherait le double, soit 16 millions de dirhams (1,6 milliard de centimes), pour avoir mené l'équipe jusqu'en quarts de finale. Un média évoque un montant légèrement supérieur, de 1,7 milliard de centimes.",
            "## Pas de confirmation officielle",
            "La Fédération royale marocaine de football (FRMF) n'a pas publié ces montants. Les chiffres proviennent de médias citant des sources proches de la sélection : ils sont donc à prendre avec prudence en attendant une annonce officielle.",
            "## Un parcours historique",
            "Ces primes récompensent le parcours du Maroc jusqu'en quarts de finale du Mondial 2026, où les Lions de l'Atlas ont été éliminés par la France (2-0).",
            "Avant ce quart de finale, Ouahbi avait relativisé la question de l'argent, affirmant que la seule prime qui comptait était de gagner la Coupe du monde.",
            "## Retour au travail",
            "La sélection est depuis passée aux éliminatoires de la CAN 2027, où le Maroc occupe la tête du groupe A."
          ]
        },
        "ar": {
          "title": "800 مليون سنتيم لكل لاعب ومليار و600 مليون لوهبي.. مكافآت بلوغ ربع نهائي مونديال 2026 حسب تقارير",
          "excerpt": "بحسب وسائل إعلام مغربية، سيحصل كل لاعب في المنتخب الوطني على مكافأة قدرها 800 مليون سنتيم نظير بلوغ ربع نهائي كأس العالم، والمدرب محمد وهبي على مليار و600 مليون سنتيم، دون تأكيد رسمي من الجامعة.",
          "body": [
            "سيحصل لاعبو المنتخب المغربي على مكافأة مالية قدرها 800 مليون سنتيم (8 ملايين درهم) لكل لاعب، نظير بلوغ الدور ربع النهائي من كأس العالم 2026، وفق ما أوردته عدة وسائل إعلام مغربية.",
            "أما الناخب الوطني محمد وهبي فسينال ضعف منحة اللاعب، أي مليارا و600 مليون سنتيم (16 مليون درهم)، مكافأة على قيادته المنتخب إلى ربع النهائي، فيما تحدث مصدر إعلامي آخر عن مليار و700 مليون سنتيم.",
            "## لا تأكيد رسمي",
            "لم تنشر الجامعة الملكية المغربية لكرة القدم هذه الأرقام بشكل رسمي، إذ جرى تداولها عبر مصادر إعلامية مقربة من المنتخب، ما يستدعي التعامل معها بحذر إلى حين صدور إعلان رسمي.",
            "## مشوار تاريخي",
            "وتأتي هذه المكافآت تتويجا لمشوار أسود الأطلس في مونديال 2026، الذي بلغوا فيه الدور ربع النهائي قبل أن يودعوا المنافسة على يد المنتخب الفرنسي بهدفين دون رد.",
            "وكان وهبي قد قلل قبل مباراة ربع النهائي من الحديث عن المال، مؤكدا أن المكافأة الوحيدة التي تهم هي الفوز بكأس العالم.",
            "## العودة إلى العمل",
            "وانتقل المنتخب الوطني بعد ذلك إلى تصفيات كأس أمم إفريقيا 2027، حيث يتصدر المغرب المجموعة الأولى."
          ]
        }
      },
      "author": "KoraPulse Administration",
      "date": "2026-11-18",
      "modified": "2026-11-18T23:35:52",
      "status": "publish",
      "featured": false
    },
    {
      "id": "caf-unveils-afcon-2027-logo-pamoja-kenya-tanzania-uganda",
      "cat": "africa",
      "tags": [
        "AFCON"
      ],
      "motif": "trophy",
      "title": "CAF Unveils the Official AFCON 2027 Logo for Kenya, Tanzania and Uganda",
      "excerpt": "Inspired by traditional East African shields, the PAMOJA 2027 emblem places the AFCON trophy at its centre, in the colours of the three host nations. The tournament runs from 19 June to 17 July 2027.",
      "body": [
        "The Confederation of African Football (CAF) and the three host countries unveiled the official logo of the 2027 Africa Cup of Nations on Thursday, 19 November. The tournament will be played in Kenya, Tanzania and Uganda under the name TotalEnergies CAF AFCON PAMOJA 2027.",
        "## A shield for three nations",
        "The emblem is built on the traditional East African shield, a symbol that appears on the coats of arms of all three host countries. The AFCON trophy sits at its centre, topped by the outline of the African continent and the CAF name.",
        "Its colours (red, black, green, yellow and blue) are taken from the flags of Kenya, Tanzania and Uganda. CAF has also designed a set of shield patterns that express each host's identity, from Kenya's horizontal bands to Tanzania's diagonal lines and Uganda's warm colours and crested crane.",
        "## \"Together\"",
        "PAMOJA means \"together\" in Swahili, the language shared across East Africa. The name reflects the first Africa Cup of Nations to be jointly hosted by three countries.",
        "## The key dates",
        "The tournament is scheduled from 19 June to 17 July 2027, with 24 teams. Qualifying is under way, and Morocco are among the teams leading their group as they chase a place in East Africa next summer."
      ],
      "tr": {
        "fr": {
          "title": "La CAF dévoile le logo officiel de la CAN 2027 au Kenya, en Tanzanie et en Ouganda",
          "excerpt": "Inspiré des boucliers traditionnels d'Afrique de l'Est, l'emblème PAMOJA 2027 place le trophée de la CAN en son centre, aux couleurs des trois pays hôtes. Le tournoi aura lieu du 19 juin au 17 juillet 2027.",
          "body": [
            "La Confédération africaine de football (CAF) et les trois pays hôtes ont dévoilé jeudi 19 novembre le logo officiel de la Coupe d'Afrique des nations 2027. Le tournoi se jouera au Kenya, en Tanzanie et en Ouganda sous le nom de TotalEnergies CAF AFCON PAMOJA 2027.",
            "## Un bouclier pour trois nations",
            "L'emblème s'appuie sur le bouclier traditionnel d'Afrique de l'Est, un symbole présent sur les armoiries des trois pays hôtes. Le trophée de la CAN en occupe le centre, surmonté de la silhouette du continent africain et du nom de la CAF.",
            "Ses couleurs (rouge, noir, vert, jaune et bleu) sont tirées des drapeaux du Kenya, de la Tanzanie et de l'Ouganda. La CAF a aussi conçu une série de motifs de boucliers propres à chaque pays : bandes horizontales pour le Kenya, lignes diagonales pour la Tanzanie, couleurs chaudes et grue couronnée pour l'Ouganda.",
            "## « Ensemble »",
            "PAMOJA signifie « ensemble » en swahili, la langue partagée en Afrique de l'Est. Le nom reflète la première Coupe d'Afrique des nations organisée conjointement par trois pays.",
            "## Les dates clés",
            "Le tournoi est prévu du 19 juin au 17 juillet 2027, avec 24 équipes. Les éliminatoires sont en cours, et le Maroc fait partie des équipes en tête de leur groupe dans la course à l'Afrique de l'Est l'été prochain."
          ]
        },
        "ar": {
          "title": "الكاف يكشف عن الشعار الرسمي لكأس أمم إفريقيا 2027 في كينيا وتنزانيا وأوغندا",
          "excerpt": "مستوحى من الدروع التقليدية لشرق إفريقيا، يضع شعار «باموجا 2027» كأس البطولة في وسطه بألوان البلدان المضيفة الثلاثة. وتقام البطولة من 19 يونيو إلى 17 يوليوز 2027.",
          "body": [
            "كشف الاتحاد الإفريقي لكرة القدم (كاف) والبلدان المضيفة الثلاثة، يوم الخميس 19 نونبر، عن الشعار الرسمي لكأس أمم إفريقيا 2027، التي ستقام في كينيا وتنزانيا وأوغندا تحت اسم «توتال إنرجيز كأس أمم إفريقيا باموجا 2027».",
            "## درع لثلاث دول",
            "يرتكز الشعار على الدرع التقليدي لشرق إفريقيا، وهو رمز حاضر في شعارات الدول المضيفة الثلاث. وتتوسطه كأس البطولة، تعلوها خريطة القارة الإفريقية واسم الكاف.",
            "أما ألوانه (الأحمر والأسود والأخضر والأصفر والأزرق) فمستمدة من أعلام كينيا وتنزانيا وأوغندا. كما صمم الكاف مجموعة من نقوش الدروع تعبر عن هوية كل بلد مضيف: خطوط أفقية لكينيا، وخطوط مائلة لتنزانيا، وألوان دافئة وطائر الكركي المتوج لأوغندا.",
            "## «معاً»",
            "تعني كلمة «باموجا» «معاً» باللغة السواحيلية المشتركة في شرق إفريقيا، ويعكس الاسم أول كأس أمم إفريقيا تنظمها ثلاث دول بشكل مشترك.",
            "## المواعيد الرئيسية",
            "من المقرر أن تقام البطولة من 19 يونيو إلى 17 يوليوز 2027 بمشاركة 24 منتخبا. وتتواصل التصفيات حاليا، ويوجد المغرب ضمن المنتخبات المتصدرة لمجموعاتها في سباق التأهل إلى شرق إفريقيا الصيف المقبل."
          ]
        }
      },
      "author": "KoraPulse Administration",
      "date": "2026-11-19",
      "modified": "2026-11-19T16:33:43",
      "status": "publish",
      "featured": true,
      "image": "images/afcon-2027-pamoja-logo.jpg",
      "imageCredit": {
        "en": "The official TotalEnergies CAF AFCON PAMOJA 2027 logo · CAF",
        "fr": "Le logo officiel de la TotalEnergies CAF AFCON PAMOJA 2027 · CAF",
        "ar": "الشعار الرسمي لكأس أمم إفريقيا باموجا 2027 · الكاف"
      }
    },
    {
      "id": "walid-regragui-close-to-qatar-national-team-job",
      "cat": "news",
      "tags": [],
      "image": "images/walid-regragui-qatar.jpg",
      "imageCredit": {
        "en": "Photo · MWN Sport",
        "fr": "Photo · MWN Sport",
        "ar": "صورة · MWN Sport"
      },
      "motif": "pitch",
      "title": "Walid Regragui Reportedly Close to Taking Charge of Qatar",
      "excerpt": "French outlet Foot Mercato reports that the former Morocco coach is close to an agreement with the Qatar Football Association. Neither side has confirmed it yet.",
      "body": [
        "Walid Regragui could soon be back on the touchline. According to French outlet Foot Mercato, the former Morocco head coach is close to reaching an agreement to take charge of the Qatar national team.",
        "The report says the Qatar Football Association has pursued Regragui for several months. The Moroccan coach first preferred a return to club football, but Qatar is said to be the only national-team project able to change his plans.",
        "## Advanced talks, no official announcement",
        "Transfer journalist Fabrizio Romano also reported on Thursday that Qatar are in advanced talks with Regragui. For now, neither the coach nor the Qatari federation has officially confirmed an appointment, and no date has been given for the signing of a contract.",
        "Qatar are currently coached by Julen Lopetegui. Several reports say the Spaniard's departure after the November international break is all but decided.",
        "## A familiar place for Regragui",
        "Doha is well known to the 51-year-old. He coached Qatari club Al-Duhail and won the Qatar Stars League title with them in 2020.",
        "It is also the city where he wrote the greatest chapter of his career: at the 2022 World Cup in Qatar, he led the Atlas Lions to the semi-finals, the first African team ever to reach that stage.",
        "## What's next",
        "If the deal is completed, Regragui would take over a Qatar side that is building towards its next major tournaments. KoraPulse will update this story as soon as there is official confirmation."
      ],
      "tr": {
        "fr": {
          "title": "Walid Regragui serait proche de prendre en main le Qatar",
          "excerpt": "Selon Foot Mercato, l'ancien sélectionneur du Maroc est proche d'un accord avec la Fédération qatarie de football. Rien n'est encore officiel.",
          "body": [
            "Walid Regragui pourrait bientôt retrouver un banc. Selon le média français Foot Mercato, l'ancien sélectionneur du Maroc est proche d'un accord pour prendre en main l'équipe nationale du Qatar.",
            "D'après ce média, la Fédération qatarie de football courtise Regragui depuis plusieurs mois. Le technicien marocain privilégiait d'abord un retour en club, mais le Qatar serait le seul projet de sélection capable de le faire changer d'avis.",
            "## Des discussions avancées, rien d'officiel",
            "Le journaliste Fabrizio Romano a lui aussi indiqué jeudi que le Qatar était en discussions avancées avec Regragui. Pour l'instant, ni l'entraîneur ni la fédération qatarie n'ont confirmé officiellement sa nomination, et aucune date de signature n'a été annoncée.",
            "Le Qatar est actuellement dirigé par Julen Lopetegui. Plusieurs sources affirment que le départ de l'Espagnol après la trêve internationale de novembre est quasiment acté.",
            "## Un terrain connu pour Regragui",
            "Doha n'a pas de secret pour le technicien de 51 ans. Il a entraîné le club qatari d'Al-Duhail, avec lequel il a remporté le championnat du Qatar en 2020.",
            "C'est aussi là qu'il a écrit la plus belle page de sa carrière : lors de la Coupe du monde 2022 au Qatar, il a mené les Lions de l'Atlas jusqu'en demi-finale, une première pour une équipe africaine.",
            "## La suite",
            "Si l'accord est finalisé, Regragui prendra en main une sélection qatarie qui prépare ses prochaines grandes compétitions. KoraPulse mettra cet article à jour dès la confirmation officielle."
          ]
        },
        "ar": {
          "title": "تقارير: وليد الركراكي قريب من تدريب منتخب قطر",
          "excerpt": "كشف موقع فوت ميركاتو الفرنسي أن المدرب السابق للمنتخب المغربي قريب من الاتفاق مع الاتحاد القطري لكرة القدم، دون أي تأكيد رسمي حتى الآن.",
          "body": [
            "قد يعود وليد الركراكي قريبا إلى عالم التدريب، إذ كشف موقع فوت ميركاتو الفرنسي أن المدرب السابق للمنتخب المغربي بات قريبا من التوصل إلى اتفاق لتولي تدريب المنتخب القطري.",
            "وحسب المصدر ذاته، يسعى الاتحاد القطري لكرة القدم إلى التعاقد مع الركراكي منذ عدة أشهر، علما أن المدرب المغربي كان يفضل في البداية العودة إلى تدريب الأندية، غير أن مشروع قطر يبقى العرض الوحيد على مستوى المنتخبات القادر على تغيير مخططاته.",
            "## مفاوضات متقدمة دون إعلان رسمي",
            "وأكد الصحفي فابريزيو رومانو بدوره يوم الخميس أن قطر دخلت في مفاوضات متقدمة مع الركراكي. وإلى حدود الساعة، لم يؤكد المدرب ولا الاتحاد القطري هذا التعيين بشكل رسمي، كما لم يُحدد أي موعد لتوقيع العقد.",
            "ويشرف الإسباني جولين لوبيتيغي حاليا على تدريب المنتخب القطري، فيما تشير عدة تقارير إلى أن رحيله بعد فترة التوقف الدولي لشهر نونبر أصبح شبه محسوم.",
            "## أرض يعرفها الركراكي جيدا",
            "ليست الدوحة غريبة على المدرب البالغ من العمر 51 عاما، فقد سبق له تدريب نادي الدحيل القطري وقاده إلى التتويج بلقب الدوري القطري سنة 2020.",
            "وفي قطر أيضا كتب أجمل صفحات مسيرته، عندما قاد أسود الأطلس إلى نصف نهائي كأس العالم 2022، كأول منتخب إفريقي يبلغ هذا الدور في تاريخ المسابقة.",
            "## ماذا بعد؟",
            "في حال إتمام الاتفاق، سيتولى الركراكي قيادة منتخب قطري يستعد لاستحقاقاته الكبرى المقبلة. وسيُحدّث موقع كورابولس هذا الخبر فور صدور التأكيد الرسمي."
          ]
        }
      },
      "author": "KoraPulse Administration",
      "date": "2026-11-20",
      "modified": "2026-11-20T18:30:00",
      "status": "publish",
      "featured": false
    },
    {
      "id": "morocco-amputee-football-team-brazil-world-cup-semi-final-captain",
      "cat": "news",
      "tags": [],
      "image": "images/morocco-amputee-football-captain.jpg",
      "imageCredit": {
        "en": "Photo · MWN Sport",
        "fr": "Photo · MWN Sport",
        "ar": "صورة · MWN Sport"
      },
      "motif": "pitch",
      "title": "\"We Will Bring the Cup to Morocco\": Amputee Lions Face Brazil in a Historic World Cup Semi-Final",
      "excerpt": "Captain Mohsen Chagagh promised to fight for a place in the final as Morocco meet Brazil today in their first-ever Amputee Football World Cup semi-final in Mexico.",
      "body": [
        "Morocco's national amputee football team are one match away from the final of the 2026 Amputee Football World Cup in Mexico. Today, Friday, they face Brazil in the semi-finals, the first in the team's history.",
        "Before the match, captain Mohsen Chagagh sent a powerful message to Moroccan fans: \"We will bring the Cup to Morocco no matter what, even if we leave the leg we have left here in Mexico. We promise our people that we will fight against Brazil just as we did against Angola to qualify for the final. Support us, we will not let you down.\"",
        "## A historic run",
        "Morocco opened the tournament with a 4-1 win over Uruguay, then beat the United States 2-1 to reach the knockout rounds unbeaten.",
        "In the quarter-finals, the Atlas Lions knocked out former champions Angola 4-1. The match was level 1-1 in normal time before Morocco scored three more goals to seal their place among the last four. At the previous World Cup, in Türkiye in 2022, Morocco finished fifth.",
        "## Brazil stand in the way",
        "Brazil reached the semi-finals by beating Spain 2-0. The match is played at San Martín stadium in San Juan de los Lagos, the tournament's main venue. In the other semi-final, Ghana face the defending champions Türkiye.",
        "The final takes place on Sunday, 22 November.",
        "## A whole country behind them",
        "Coached by Othmane Najmi, this team has already given Morocco one of the most inspiring stories of the year. Whatever the result against Brazil, the Amputee Lions have shown the strength, courage and pride of Moroccan football."
      ],
      "tr": {
        "fr": {
          "title": "« Nous ramènerons la Coupe au Maroc » : les Lions amputés défient le Brésil en demi-finale historique du Mondial",
          "excerpt": "Le capitaine Mohsen Chagagh promet de tout donner pour une place en finale : le Maroc affronte le Brésil ce vendredi, pour sa première demi-finale de Coupe du monde de football pour amputés, au Mexique.",
          "body": [
            "L'équipe nationale marocaine de football pour amputés n'est plus qu'à un match de la finale de la Coupe du monde 2026 au Mexique. Ce vendredi, elle affronte le Brésil en demi-finale, la première de son histoire.",
            "Avant la rencontre, le capitaine Mohsen Chagagh a adressé un message fort aux supporters marocains : « Nous ramènerons la Coupe au Maroc quoi qu'il arrive, même si nous devons laisser ici, au Mexique, la jambe qu'il nous reste. Nous promettons à notre peuple de nous battre contre le Brésil comme nous l'avons fait contre l'Angola, pour nous qualifier pour la finale. Soutenez-nous, nous ne vous décevrons pas. »",
            "## Un parcours historique",
            "Le Maroc a lancé son tournoi par une victoire 4-1 contre l'Uruguay, puis a battu les États-Unis 2-1 pour rejoindre la phase à élimination directe sans défaite.",
            "En quart de finale, les Lions de l'Atlas ont éliminé l'Angola, ancien champion du monde, sur le score de 4-1. Le score était de 1-1 à la fin du temps réglementaire avant que le Maroc n'inscrive trois buts supplémentaires pour rejoindre le dernier carré. Lors de la précédente Coupe du monde, en Turquie en 2022, le Maroc avait terminé cinquième.",
            "## Le Brésil sur la route",
            "Le Brésil s'est qualifié en battant l'Espagne 2-0. La rencontre se joue au stade San Martín de San Juan de los Lagos, principal site du tournoi. Dans l'autre demi-finale, le Ghana affronte la Turquie, tenante du titre.",
            "La finale aura lieu le dimanche 22 novembre.",
            "## Tout un pays derrière eux",
            "Entraînée par Othmane Najmi, cette équipe offre déjà au Maroc l'une des plus belles histoires de l'année. Quel que soit le résultat face au Brésil, les Lions amputés ont montré la force, le courage et la fierté du football marocain."
          ]
        },
        "ar": {
          "title": "«سنعيد الكأس إلى المغرب»: أسود مبتوري الأطراف يواجهون البرازيل في نصف نهائي تاريخي لكأس العالم",
          "excerpt": "وعد القائد محسن شغاغ بالقتال من أجل بطاقة النهائي، حيث يواجه المنتخب المغربي نظيره البرازيلي اليوم في أول نصف نهائي في تاريخه بكأس العالم لمبتوري الأطراف بالمكسيك.",
          "body": [
            "بات المنتخب الوطني المغربي لكرة القدم لمبتوري الأطراف على بعد مباراة واحدة من نهائي كأس العالم 2026 بالمكسيك، إذ يواجه اليوم الجمعة منتخب البرازيل في نصف النهائي، وهو الأول في تاريخه.",
            "وقبل المواجهة، وجّه القائد محسن شغاغ رسالة قوية إلى الجماهير المغربية قائلا: «سنعيد الكأس إلى المغرب مهما كلّف الأمر، حتى لو تركنا الرجل التي بقيت لنا هنا في المكسيك. نعد شعبنا بأننا سنقاتل أمام البرازيل كما فعلنا أمام أنغولا من أجل التأهل إلى النهائي. ادعمونا، لن نخذلكم».",
            "## مسار تاريخي",
            "افتتح المنتخب المغربي مشواره في البطولة بفوز على الأوروغواي بأربعة أهداف مقابل هدف، ثم تغلب على الولايات المتحدة 2-1 ليبلغ الأدوار الإقصائية دون هزيمة.",
            "وفي ربع النهائي، أطاح الأسود بمنتخب أنغولا، البطل السابق، بنتيجة 4-1، بعدما انتهى الوقت الأصلي بالتعادل 1-1، قبل أن يضيف المغرب ثلاثة أهداف ليحجز مكانه في المربع الذهبي. وكان المنتخب المغربي قد أنهى النسخة السابقة في تركيا سنة 2022 في المركز الخامس.",
            "## البرازيل في الطريق",
            "تأهل المنتخب البرازيلي إلى نصف النهائي بعد فوزه على إسبانيا 2-0. وتقام المباراة على ملعب سان مارتين بمدينة سان خوان دي لوس لاغوس، الملعب الرئيسي للبطولة. وفي نصف النهائي الآخر، يلتقي منتخب غانا مع تركيا حاملة اللقب.",
            "ويقام النهائي يوم الأحد 22 نونبر.",
            "## شعب بأكمله خلفهم",
            "بقيادة المدرب عثمان النجمي، منح هذا المنتخب المغاربة واحدة من أجمل قصص هذه السنة. ومهما كانت نتيجة مباراة البرازيل، فقد أظهر أسود مبتوري الأطراف قوة وشجاعة وفخر كرة القدم المغربية."
          ]
        }
      },
      "author": "KoraPulse Administration",
      "date": "2026-11-20",
      "modified": "2026-11-20T18:35:00",
      "status": "publish",
      "featured": true
    },
    {
      "id": "cas-ruling-morocco-senegal-afcon-2025-final-tuesday",
      "cat": "africa",
      "tags": [
        "AFCON"
      ],
      "image": "images/morocco-senegal-afcon-final-cas.jpg",
      "imageCredit": {
        "en": "Morocco and Senegal players during the AFCON 2025 final in Rabat · MWN Sport",
        "fr": "Joueurs du Maroc et du Sénégal lors de la finale de la CAN 2025 à Rabat · MWN Sport",
        "ar": "لاعبو المغرب والسنغال خلال نهائي كأس أمم إفريقيا 2025 بالرباط · MWN Sport"
      },
      "motif": "pitch",
      "title": "CAS to Rule on Morocco–Senegal AFCON 2025 Final Dispute on Tuesday",
      "excerpt": "The Court of Arbitration for Sport will announce on Tuesday afternoon whether Morocco keep the AFCON 2025 title or Senegal win their appeal.",
      "body": [
        "**Update, 24 November:** CAS has upheld Senegal's appeal and reinstated them as AFCON 2025 champions. [Read the verdict](article.html?id=cas-reinstates-senegal-afcon-2025-champions-morocco).",
        "The long legal battle over the AFCON 2025 title is about to reach its decisive moment. The Court of Arbitration for Sport (CAS) has announced that it will deliver its ruling on the Morocco–Senegal final dispute on Tuesday, 24 November, in the afternoon (GMT).",
        "In an official statement, CAS said it had notified all the parties involved in Senegal's appeal against the Confederation of African Football (CAF) and the Royal Moroccan Football Federation (FRMF). The court stressed that only announcements published through its official channels should be considered authentic, and that it would not comment further until the decision is released.",
        "## What happened in the final",
        "The final was played on 18 January 2026 in Rabat. Late in normal time, the referee awarded a penalty to Morocco, and several Senegal players walked off the pitch in protest. The match was stopped for around a quarter of an hour before play resumed, and Senegal went on to win 1-0 after extra time.",
        "CAF's first disciplinary decision handed out fines and suspensions but left the result unchanged. The FRMF appealed, and on 17 March 2026 the CAF Appeal Board ruled that Senegal had forfeited the final, recording a 3-0 victory for Morocco and naming the Atlas Lions African champions.",
        "## Senegal's appeal",
        "The Senegalese federation rejected the decision and took the case to CAS on 25 March, asking for CAF's ruling to be cancelled and for Senegal to be reinstated as champions. The hearing took place behind closed doors in Lausanne, Switzerland, on 8 October, with Senegal, Morocco and CAF all presenting their arguments.",
        "## What is at stake",
        "Tuesday's decision will settle who is officially the champion of Africa. According to reports, it could also affect the prize money, with around $7 million for the winners and $4 million for the runners-up.",
        "KoraPulse will publish the verdict and the reactions as soon as CAS makes its decision public."
      ],
      "tr": {
        "fr": {
          "title": "Le TAS rendra mardi sa décision sur la finale de la CAN 2025 entre le Maroc et le Sénégal",
          "excerpt": "Le Tribunal arbitral du sport annoncera mardi après-midi si le Maroc conserve le titre de la CAN 2025 ou si le Sénégal obtient gain de cause.",
          "body": [
            "**Mise à jour, 24 novembre :** le TAS a donné raison au Sénégal, de nouveau champion de la CAN 2025. [Lire le verdict](article.html?id=cas-reinstates-senegal-afcon-2025-champions-morocco&lang=fr).",
            "La longue bataille juridique autour du titre de la CAN 2025 approche de son dénouement. Le Tribunal arbitral du sport (TAS) a annoncé qu'il rendra sa décision sur le litige de la finale Maroc–Sénégal le mardi 24 novembre, dans l'après-midi (GMT).",
            "Dans un communiqué officiel, le TAS indique avoir informé toutes les parties concernées par l'appel du Sénégal contre la Confédération africaine de football (CAF) et la Fédération royale marocaine de football (FRMF). Le tribunal souligne que seules les annonces publiées sur ses canaux officiels doivent être considérées comme authentiques, et qu'il ne fera aucun autre commentaire avant la publication de la décision.",
            "## Ce qui s'est passé en finale",
            "La finale s'est jouée le 18 janvier 2026 à Rabat. En fin de temps réglementaire, l'arbitre a accordé un penalty au Maroc et plusieurs joueurs sénégalais ont quitté la pelouse en signe de protestation. Le match a été interrompu pendant environ un quart d'heure avant de reprendre, et le Sénégal s'est finalement imposé 1-0 après prolongation.",
            "La première décision disciplinaire de la CAF a infligé des amendes et des suspensions sans modifier le résultat. La FRMF a fait appel et, le 17 mars 2026, le jury d'appel de la CAF a déclaré le Sénégal forfait, a donné le match gagné 3-0 au Maroc et a sacré les Lions de l'Atlas champions d'Afrique.",
            "## L'appel du Sénégal",
            "La fédération sénégalaise a contesté cette décision et a saisi le TAS le 25 mars, demandant l'annulation de la décision de la CAF et le rétablissement du Sénégal comme champion. L'audience s'est tenue à huis clos à Lausanne, en Suisse, le 8 octobre, en présence des représentants du Sénégal, du Maroc et de la CAF.",
            "## Les enjeux",
            "La décision de mardi désignera officiellement le champion d'Afrique. Selon plusieurs médias, elle pourrait aussi avoir un impact sur les primes, d'environ 7 millions de dollars pour le vainqueur et 4 millions pour le finaliste.",
            "KoraPulse publiera le verdict et les réactions dès que le TAS rendra sa décision publique."
          ]
        },
        "ar": {
          "title": "محكمة التحكيم الرياضي تصدر قرارها في نزاع نهائي كأس أمم إفريقيا 2025 بين المغرب والسنغال يوم الثلاثاء",
          "excerpt": "ستعلن محكمة التحكيم الرياضي بعد ظهر الثلاثاء ما إذا كان المغرب سيحتفظ بلقب كأس أمم إفريقيا 2025 أم أن السنغال ستكسب طعنها.",
          "body": [
            "**تحديث، 24 نونبر:** قبلت محكمة التحكيم الرياضي طعن السنغال وأعادت إليها لقب كأس أمم إفريقيا 2025. [اقرأ الحكم](article.html?id=cas-reinstates-senegal-afcon-2025-champions-morocco&lang=ar).",
            "تقترب المعركة القانونية الطويلة حول لقب كأس أمم إفريقيا 2025 من لحظتها الحاسمة، بعدما أعلنت محكمة التحكيم الرياضي (طاس) أنها ستصدر قرارها في نزاع نهائي المغرب والسنغال يوم الثلاثاء 24 نونبر، بعد الظهر بتوقيت غرينتش.",
            "وأوضحت المحكمة في بلاغ رسمي أنها أبلغت جميع الأطراف المعنية بطعن السنغال ضد الاتحاد الإفريقي لكرة القدم (الكاف) والجامعة الملكية المغربية لكرة القدم، مشددة على أن الإعلانات المنشورة عبر قنواتها الرسمية وحدها تُعتبر موثوقة، وأنها لن تدلي بأي تعليق آخر قبل صدور القرار رسميا.",
            "## ماذا حدث في النهائي؟",
            "أقيم النهائي يوم 18 يناير 2026 بالرباط. وفي أواخر الوقت الأصلي، أعلن الحكم عن ضربة جزاء لصالح المغرب، فغادر عدد من لاعبي السنغال أرضية الملعب احتجاجا. وتوقفت المباراة قرابة ربع ساعة قبل أن تُستأنف، لتفوز السنغال في النهاية بهدف دون رد بعد الأشواط الإضافية.",
            "وفرض القرار التأديبي الأول للكاف غرامات وعقوبات إيقاف دون تغيير النتيجة. فاستأنفت الجامعة الملكية المغربية لكرة القدم، وفي 17 مارس 2026 قضت لجنة الاستئناف بالكاف بخسارة السنغال للنهائي، واعتماد فوز المغرب بثلاثية نظيفة وتتويج أسود الأطلس أبطالا لإفريقيا.",
            "## طعن السنغال",
            "رفض الاتحاد السنغالي القرار ولجأ إلى محكمة التحكيم الرياضي يوم 25 مارس، مطالبا بإلغاء قرار الكاف وإعادة اللقب إلى السنغال. وعُقدت الجلسة بشكل مغلق في لوزان السويسرية يوم 8 أكتوبر، حيث قدمت السنغال والمغرب والكاف حججها.",
            "## ما الذي على المحك؟",
            "سيحسم قرار الثلاثاء هوية بطل إفريقيا بشكل رسمي، وحسب تقارير إعلامية فقد يؤثر أيضا على الجوائز المالية، التي تبلغ نحو 7 ملايين دولار للبطل و4 ملايين دولار للوصيف.",
            "وسينشر موقع كورابولس الحكم وردود الفعل فور إعلان المحكمة عن قرارها."
          ]
        }
      },
      "author": "KoraPulse Administration",
      "date": "2026-11-23",
      "modified": "2026-11-24T16:00:00",
      "status": "publish",
      "featured": false
    },
    {
      "id": "cas-reinstates-senegal-afcon-2025-champions-morocco",
      "cat": "africa",
      "tags": [
        "AFCON"
      ],
      "image": "images/senegal-afcon-2025-title-cas.jpg",
      "imageCredit": {
        "en": "Senegal players celebrate with the AFCON trophy in Rabat, 18 January 2026 · beIN SPORTS",
        "fr": "Les joueurs sénégalais célèbrent avec le trophée de la CAN à Rabat, le 18 janvier 2026 · beIN SPORTS",
        "ar": "لاعبو السنغال يحتفلون بكأس أمم إفريقيا بالرباط يوم 18 يناير 2026 · beIN SPORTS"
      },
      "motif": "pitch",
      "title": "CAS Reinstates Senegal as AFCON 2025 Champions, Overturning Morocco's Title",
      "excerpt": "The Court of Arbitration for Sport has unanimously upheld Senegal's appeal and restored their 1-0 win in the final in Rabat. Morocco lose the title CAF had awarded them in March.",
      "body": [
        "Senegal are once again the champions of Africa. On Tuesday, 24 November, the Court of Arbitration for Sport (CAS) upheld the Senegalese Football Federation's appeal and set aside the decision of the CAF Appeal Board that had awarded the AFCON 2025 title to Morocco.",
        "According to reports, the panel's decision was unanimous. The original result of the final, played on 18 January 2026 in Rabat, is restored: a 1-0 win for Senegal after extra time. Morocco, who had been recognised as champions since March, lose that status.",
        "## Why CAS ruled for Senegal",
        "CAS has announced its decision and will publish a full written award setting out its reasons later. According to early reports, the panel found that the referee's decision to resume the match after Senegal's players walked off the pitch was within his authority, and that the forfeit and the 3-0 win recorded by the CAF Appeal Board could not stand.",
        "## How we got here",
        "Late in normal time of the final, the referee awarded Morocco a penalty, and several Senegal players left the pitch in protest. Play was stopped for around a quarter of an hour, then resumed, and Senegal won the match 1-0 in extra time.",
        "CAF's first disciplinary decision handed out fines and suspensions but kept the result. The Royal Moroccan Football Federation (FRMF) appealed, and on 17 March 2026 the CAF Appeal Board declared that Senegal had forfeited the final and recorded a 3-0 win for Morocco. Senegal took the case to CAS on 25 March, and the hearing was held in Lausanne on 8 October.",
        "## Morocco's position",
        "Hours before the verdict, Moroccan media reported that the FRMF had written to CAS about an alleged phone call between the president of the Senegalese federation and one of the arbitrators, asking for the notification of the decision to be suspended and reserving its right to appeal. CAS had not commented on this request when it announced its ruling.",
        "CAS decisions are final in sport, but they can be challenged before the Swiss Federal Supreme Court on limited grounds, mainly procedural. KoraPulse will follow the FRMF's official reaction and any next steps.",
        "## What changes",
        "Senegal keep the trophy they lifted in Rabat and the champions' prize money, reported at around $7 million, while Morocco are listed as runners-up. For the Atlas Lions and their fans, it is a painful end to a ten-month legal battle that began on the night of the final.",
        "Read our preview of the decision: [CAS to rule on the Morocco–Senegal AFCON 2025 final dispute](article.html?id=cas-ruling-morocco-senegal-afcon-2025-final-tuesday)."
      ],
      "tr": {
        "fr": {
          "title": "Le TAS rend le titre de la CAN 2025 au Sénégal et annule celui du Maroc",
          "excerpt": "Le Tribunal arbitral du sport a donné raison au Sénégal à l'unanimité et rétabli sa victoire 1-0 en finale à Rabat. Le Maroc perd le titre que la CAF lui avait attribué en mars.",
          "body": [
            "Le Sénégal est de nouveau champion d'Afrique. Ce mardi 24 novembre, le Tribunal arbitral du sport (TAS) a accueilli l'appel de la Fédération sénégalaise de football et annulé la décision du jury d'appel de la CAF qui avait attribué le titre de la CAN 2025 au Maroc.",
            "Selon les médias, la décision de la formation arbitrale a été prise à l'unanimité. Le résultat initial de la finale, jouée le 18 janvier 2026 à Rabat, est rétabli : une victoire 1-0 du Sénégal après prolongation. Le Maroc, reconnu champion depuis mars, perd ce statut.",
            "## Pourquoi le TAS a donné raison au Sénégal",
            "Le TAS a annoncé sa décision et publiera plus tard une sentence écrite détaillant ses motifs. Selon les premières informations, la formation a estimé que la décision de l'arbitre de reprendre le match après la sortie des joueurs sénégalais relevait de sa seule autorité, et que le forfait ainsi que la victoire 3-0 prononcés par le jury d'appel de la CAF ne pouvaient être maintenus.",
            "## Retour sur l'affaire",
            "En fin de temps réglementaire, l'arbitre a accordé un penalty au Maroc et plusieurs joueurs sénégalais ont quitté la pelouse pour protester. Le jeu a été interrompu pendant environ un quart d'heure avant de reprendre, et le Sénégal s'est imposé 1-0 en prolongation.",
            "La première décision disciplinaire de la CAF a infligé des amendes et des suspensions sans toucher au résultat. La Fédération royale marocaine de football (FRMF) a fait appel et, le 17 mars 2026, le jury d'appel de la CAF a déclaré le Sénégal forfait et donné le match gagné 3-0 au Maroc. Le Sénégal a saisi le TAS le 25 mars, et l'audience s'est tenue à Lausanne le 8 octobre.",
            "## La position du Maroc",
            "Quelques heures avant le verdict, des médias marocains ont rapporté que la FRMF avait écrit au TAS au sujet d'un appel téléphonique présumé entre le président de la fédération sénégalaise et l'un des arbitres, en demandant la suspension de la notification de la décision et en se réservant le droit de faire appel. Le TAS ne s'était pas exprimé sur cette demande au moment d'annoncer sa décision.",
            "Les décisions du TAS sont définitives dans le sport, mais elles peuvent être contestées devant le Tribunal fédéral suisse pour des motifs limités, principalement de procédure. KoraPulse suivra la réaction officielle de la FRMF et la suite de l'affaire.",
            "## Ce qui change",
            "Le Sénégal conserve le trophée soulevé à Rabat et la prime du champion, estimée à environ 7 millions de dollars, tandis que le Maroc redevient finaliste. Pour les Lions de l'Atlas et leurs supporters, c'est une fin douloureuse pour une bataille juridique de dix mois commencée le soir même de la finale.",
            "Lire notre article avant la décision : [Le TAS rendra mardi sa décision sur la finale de la CAN 2025](article.html?id=cas-ruling-morocco-senegal-afcon-2025-final-tuesday&lang=fr)."
          ]
        },
        "ar": {
          "title": "محكمة التحكيم الرياضي تعيد لقب كأس أمم إفريقيا 2025 إلى السنغال وتلغي تتويج المغرب",
          "excerpt": "قبلت محكمة التحكيم الرياضي بالإجماع طعن السنغال وأعادت فوزها بهدف دون رد في نهائي الرباط، ليفقد المغرب اللقب الذي منحه إياه الكاف في مارس.",
          "body": [
            "عادت السنغال لتكون بطلة إفريقيا من جديد، بعدما قبلت محكمة التحكيم الرياضي (طاس)، يوم الثلاثاء 24 نونبر، الطعن الذي تقدم به الاتحاد السنغالي لكرة القدم، وألغت قرار لجنة الاستئناف بالكاف الذي منح لقب كأس أمم إفريقيا 2025 للمغرب.",
            "وحسب التقارير، صدر قرار هيئة التحكيم بالإجماع، لتعود النتيجة الأصلية لنهائي 18 يناير 2026 بالرباط، أي فوز السنغال بهدف دون رد بعد الأشواط الإضافية، فيما يفقد المغرب صفة البطل التي حصل عليها منذ مارس.",
            "## لماذا حكمت المحكمة لصالح السنغال؟",
            "أعلنت المحكمة قرارها على أن تنشر لاحقا الحكم المكتوب بتعليلاته الكاملة. ووفق المعطيات الأولى، رأت الهيئة أن قرار الحكم استئناف المباراة بعد مغادرة لاعبي السنغال أرضية الملعب يدخل ضمن صلاحياته، وأن اعتبار السنغال منسحبة واحتساب فوز المغرب 3-0 من طرف لجنة الاستئناف بالكاف لا يمكن الإبقاء عليه.",
            "## كيف وصلنا إلى هنا؟",
            "في أواخر الوقت الأصلي للنهائي، أعلن الحكم عن ضربة جزاء للمغرب، فغادر عدد من لاعبي السنغال الملعب احتجاجا. وتوقف اللعب قرابة ربع ساعة قبل أن يُستأنف، لتفوز السنغال بهدف دون رد في الأشواط الإضافية.",
            "وفرض القرار التأديبي الأول للكاف غرامات وعقوبات إيقاف دون المساس بالنتيجة، فاستأنفت الجامعة الملكية المغربية لكرة القدم، وفي 17 مارس 2026 اعتبرت لجنة الاستئناف بالكاف السنغال منسحبة واحتسبت فوز المغرب 3-0. ولجأت السنغال إلى محكمة التحكيم الرياضي يوم 25 مارس، وعُقدت الجلسة في لوزان يوم 8 أكتوبر.",
            "## موقف المغرب",
            "قبل ساعات من صدور الحكم، أفادت وسائل إعلام مغربية بأن الجامعة الملكية المغربية لكرة القدم راسلت المحكمة بشأن اتصال هاتفي مفترض بين رئيس الاتحاد السنغالي وأحد المحكمين، وطلبت تعليق تبليغ القرار مع احتفاظها بحقها في الطعن. ولم تعلق المحكمة على هذا الطلب عند إعلان قرارها.",
            "وتُعد قرارات محكمة التحكيم الرياضي نهائية في المجال الرياضي، لكن يمكن الطعن فيها أمام المحكمة الفيدرالية السويسرية لأسباب محدودة، تتعلق أساسا بالإجراءات. وسيتابع موقع كورابولس رد الفعل الرسمي للجامعة والخطوات المقبلة.",
            "## ما الذي يتغير؟",
            "تحتفظ السنغال بالكأس التي رفعتها في الرباط وبجائزة البطل، التي تقدر بنحو 7 ملايين دولار، فيما يعود المغرب إلى مركز الوصيف. وبالنسبة لأسود الأطلس وجماهيرهم، تشكل هذه النهاية خيبة مؤلمة لمعركة قانونية دامت عشرة أشهر منذ ليلة النهائي.",
            "اقرأ مقالنا قبل صدور القرار: [محكمة التحكيم الرياضي تصدر قرارها في نزاع نهائي كأس أمم إفريقيا 2025](article.html?id=cas-ruling-morocco-senegal-afcon-2025-final-tuesday&lang=ar)."
          ]
        }
      },
      "author": "KoraPulse Administration",
      "date": "2026-11-24",
      "modified": "2026-11-24T16:00:00",
      "status": "publish",
      "featured": true
    }
  ],
  "updated": "2026-11-24T16:00:00",
  "pages": [
    {
      "slug": "about",
      "status": "publish",
      "title": "About KoraPulse",
      "body": [
        "KoraPulse is an independent football news website covering Moroccan football, the Atlas Lions, African competitions and the biggest leagues in the world, in English, French and Arabic.",
        "## What we cover",
        "News, match previews and reports from the Botola Pro, the national teams (men's, women's and youth), the CAF competitions, the road to the 2030 World Cup, transfers, opinion pieces and live scores from around the world.",
        "## How we work",
        "Our articles are written and checked by the KoraPulse editorial team. We separate news from opinion: opinion pieces are always labelled as such. When we make a mistake, we correct it and say so.",
        "Live scores come from specialised data providers and update automatically. They may occasionally be delayed or differ from the official result; the official result is always the one published by the competition organiser.",
        "## Follow us",
        "Share our articles on Facebook, X, WhatsApp and Instagram with the buttons on each article. To reach the team, use our [contact page](page.html?p=contact)."
      ],
      "tr": {
        "fr": {
          "title": "À propos de KoraPulse",
          "body": [
            "KoraPulse est un site d'information indépendant consacré au football marocain, aux Lions de l'Atlas, aux compétitions africaines et aux plus grands championnats du monde, en anglais, en français et en arabe.",
            "## Ce que nous couvrons",
            "L'actualité, les avant-matchs et les comptes rendus de la Botola Pro, les sélections nationales (masculines, féminines et de jeunes), les compétitions de la CAF, la route vers le Mondial 2030, le mercato, des tribunes et les scores en direct du monde entier.",
            "## Notre façon de travailler",
            "Nos articles sont rédigés et vérifiés par la rédaction de KoraPulse. Nous séparons l'information de l'opinion : les tribunes sont toujours signalées comme telles. Quand nous nous trompons, nous corrigeons et nous le disons.",
            "Les scores en direct proviennent de fournisseurs de données spécialisés et se mettent à jour automatiquement. Ils peuvent parfois être retardés ou différer du résultat officiel ; le résultat officiel reste celui publié par l'organisateur de la compétition.",
            "## Nous suivre",
            "Partagez nos articles sur Facebook, X, WhatsApp et Instagram grâce aux boutons de chaque article. Pour joindre l'équipe, utilisez notre [page contact](page.html?p=contact&lang=fr)."
          ]
        },
        "ar": {
          "title": "من نحن",
          "body": [
            "كورابولس موقع إخباري مستقل متخصص في كرة القدم المغربية وأسود الأطلس والمسابقات الإفريقية وأكبر الدوريات في العالم، باللغات الإنجليزية والفرنسية والعربية.",
            "## ما نغطيه",
            "أخبار البطولة الاحترافية وتقديم المباريات وتقاريرها، والمنتخبات الوطنية (الرجال والسيدات والفئات السنية)، ومسابقات الاتحاد الإفريقي، والطريق إلى مونديال 2030، وسوق الانتقالات، ومقالات الرأي، والنتائج المباشرة من كل أنحاء العالم.",
            "## طريقة عملنا",
            "يكتب مقالاتنا ويراجعها فريق تحرير كورابولس. نفصل بين الخبر والرأي، ونشير دائما إلى مقالات الرأي. وعندما نخطئ نصحح الخطأ ونعلن ذلك.",
            "تأتي النتائج المباشرة من مزودي بيانات متخصصين وتُحدَّث تلقائيا، وقد تتأخر أحيانا أو تختلف عن النتيجة الرسمية، والنتيجة الرسمية هي التي تنشرها الجهة المنظمة للمسابقة.",
            "## تابعنا",
            "شارك مقالاتنا على فيسبوك وإكس وواتساب وإنستغرام عبر الأزرار الموجودة في كل مقال. وللتواصل مع الفريق استعمل [صفحة الاتصال](page.html?p=contact&lang=ar)."
          ]
        }
      }
    },
    {
      "slug": "contact",
      "status": "publish",
      "title": "Contact us",
      "body": [
        "Have a question, a correction, a story idea or a partnership proposal? Send us a message with the form below and the KoraPulse team will get back to you if you leave a way to reach you.",
        "Please do not send sensitive personal information. See our [privacy policy](page.html?p=privacy) to learn how we handle your message."
      ],
      "tr": {
        "fr": {
          "title": "Nous contacter",
          "body": [
            "Une question, une correction, une idée de sujet ou une proposition de partenariat ? Envoyez-nous un message avec le formulaire ci-dessous ; l'équipe KoraPulse vous répondra si vous laissez un moyen de vous joindre.",
            "Merci de ne pas envoyer d'informations personnelles sensibles. Consultez notre [politique de confidentialité](page.html?p=privacy&lang=fr) pour savoir comment nous traitons votre message."
          ]
        },
        "ar": {
          "title": "اتصل بنا",
          "body": [
            "لديك سؤال أو تصحيح أو فكرة موضوع أو مقترح شراكة؟ أرسل لنا رسالة عبر النموذج أدناه، وسيرد عليك فريق كورابولس إذا تركت وسيلة للتواصل معك.",
            "نرجو عدم إرسال معلومات شخصية حساسة. اطلع على [سياسة الخصوصية](page.html?p=privacy&lang=ar) لمعرفة كيفية تعاملنا مع رسالتك."
          ]
        }
      }
    },
    {
      "slug": "advertise",
      "status": "soon",
      "title": "Advertise with KoraPulse",
      "body": [
        "Advertising and sponsorship opportunities on KoraPulse are coming soon. In the meantime, you can reach us through our [contact page](page.html?p=contact)."
      ],
      "tr": {
        "fr": {
          "title": "Annoncer sur KoraPulse",
          "body": [
            "Les offres de publicité et de sponsoring sur KoraPulse arrivent bientôt. En attendant, vous pouvez nous écrire via notre [page contact](page.html?p=contact&lang=fr)."
          ]
        },
        "ar": {
          "title": "أعلن مع كورابولس",
          "body": [
            "فرص الإعلان والرعاية على كورابولس قريبا. وفي الأثناء يمكنك مراسلتنا عبر [صفحة الاتصال](page.html?p=contact&lang=ar)."
          ]
        }
      }
    },
    {
      "slug": "careers",
      "status": "soon",
      "title": "Careers",
      "body": [
        "We will soon be looking for writers, translators and football lovers to join the KoraPulse team. Openings will be posted on this page."
      ],
      "tr": {
        "fr": {
          "title": "Carrières",
          "body": [
            "Nous recruterons bientôt des rédacteurs, des traducteurs et des passionnés de football pour rejoindre l'équipe KoraPulse. Les offres seront publiées sur cette page."
          ]
        },
        "ar": {
          "title": "وظائف",
          "body": [
            "سنبحث قريبا عن محررين ومترجمين وعشاق لكرة القدم للانضمام إلى فريق كورابولس، وستُنشر العروض في هذه الصفحة."
          ]
        }
      }
    },
    {
      "slug": "privacy",
      "status": "publish",
      "title": "Privacy Policy",
      "body": [
        "This policy explains what information KoraPulse handles when you visit the site, and why. Last updated: 16 November 2026.",
        "## No account needed",
        "You can read and share everything on KoraPulse without creating an account. We do not ask for your name or email to read the site.",
        "## Information stored on your device",
        "The site remembers your choice of language and of light or dark mode in your browser (local storage). This stays on your device and is not used to track you. Advertising cookies are explained below. You can clear stored data and cookies at any time in your browser settings.",
        "## Contact form",
        "If you write to us, we receive the name, the contact details and the message you choose to send, together with the date. We use them only to read and answer your message, keep them no longer than necessary (at most 12 months), and do not sell or share them.",
        "## Hosting and technical data",
        "The site is hosted by Cloudflare, which processes technical data such as your IP address to deliver the pages and protect the site against attacks. To limit spam, we temporarily keep a count of messages sent from the same connection.",
        "## Sharing buttons and live scores",
        "The share buttons only open Facebook, X, WhatsApp or Instagram when you tap them; these services then apply their own privacy policies. Live scores are loaded from our own server, so your browser does not contact the score providers directly.",
        "## Advertising and cookies",
        "KoraPulse is funded by advertising. We use Google AdSense to show ads. Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this website and other websites.",
        "Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to KoraPulse and/or other sites on the Internet. You can opt out of personalised advertising by visiting [Google Ads Settings](https://adssettings.google.com), or opt out of some third-party vendors' use of cookies for personalised advertising at [www.aboutads.info](https://www.aboutads.info/choices).",
        "Visitors in the European Economic Area, the United Kingdom and Switzerland are asked for their consent before personalised ads are shown, through Google's consent message, and can change their choice at any time. Learn more about [how Google uses information from sites that use its services](https://policies.google.com/technologies/partner-sites).",
        "## Your rights",
        "In line with Moroccan law 09-08 on the protection of personal data, you can ask to access, correct or delete the information you sent us, or object to its use, through our [contact page](page.html?p=contact)."
      ],
      "tr": {
        "fr": {
          "title": "Politique de confidentialité",
          "body": [
            "Cette politique explique quelles informations KoraPulse traite lors de votre visite, et pourquoi. Dernière mise à jour : 16 novembre 2026.",
            "## Aucun compte nécessaire",
            "Vous pouvez lire et partager l'ensemble du site sans créer de compte. Nous ne demandons ni votre nom ni votre e-mail pour lire le site.",
            "## Informations enregistrées sur votre appareil",
            "Le site mémorise dans votre navigateur (stockage local) votre choix de langue et de mode clair ou sombre. Ces informations restent sur votre appareil et ne servent pas à vous suivre. Les cookies publicitaires sont expliqués ci-dessous. Vous pouvez effacer ces données et les cookies à tout moment dans les réglages de votre navigateur.",
            "## Formulaire de contact",
            "Si vous nous écrivez, nous recevons le nom, les coordonnées et le message que vous choisissez d'envoyer, ainsi que la date. Nous les utilisons uniquement pour lire votre message et y répondre, les conservons au maximum 12 mois, et ne les vendons ni ne les partageons.",
            "## Hébergement et données techniques",
            "Le site est hébergé par Cloudflare, qui traite des données techniques comme votre adresse IP pour afficher les pages et protéger le site contre les attaques. Pour limiter le spam, nous conservons temporairement le nombre de messages envoyés depuis une même connexion.",
            "## Boutons de partage et scores en direct",
            "Les boutons de partage n'ouvrent Facebook, X, WhatsApp ou Instagram que lorsque vous appuyez dessus ; ces services appliquent alors leur propre politique de confidentialité. Les scores en direct sont chargés depuis notre propre serveur : votre navigateur ne contacte pas directement les fournisseurs de scores.",
            "## Publicité et cookies",
            "KoraPulse est financé par la publicité. Nous utilisons Google AdSense pour afficher des annonces. Des fournisseurs tiers, dont Google, utilisent des cookies pour diffuser des annonces en fonction de vos visites précédentes sur ce site et sur d'autres sites.",
            "Les cookies publicitaires permettent à Google et à ses partenaires de diffuser des annonces en fonction de vos visites sur KoraPulse et/ou sur d'autres sites Internet. Vous pouvez désactiver la publicité personnalisée dans les [paramètres des annonces Google](https://adssettings.google.com), ou désactiver l'utilisation de cookies par certains fournisseurs tiers sur [www.aboutads.info](https://www.aboutads.info/choices).",
            "Les visiteurs de l'Espace économique européen, du Royaume-Uni et de la Suisse sont invités à donner leur consentement avant l'affichage d'annonces personnalisées, via le message de consentement de Google, et peuvent modifier leur choix à tout moment. En savoir plus sur [l'utilisation des données par Google sur les sites partenaires](https://policies.google.com/technologies/partner-sites).",
            "## Vos droits",
            "Conformément à la loi marocaine 09-08 relative à la protection des données à caractère personnel, vous pouvez demander l'accès, la rectification ou la suppression des informations que vous nous avez envoyées, ou vous opposer à leur utilisation, via notre [page contact](page.html?p=contact&lang=fr)."
          ]
        },
        "ar": {
          "title": "سياسة الخصوصية",
          "body": [
            "توضح هذه السياسة المعلومات التي يتعامل معها كورابولس عند زيارتك للموقع وسبب ذلك. آخر تحديث: 16 نونبر 2026.",
            "## لا حاجة إلى حساب",
            "يمكنك قراءة كل محتوى كورابولس ومشاركته دون إنشاء حساب، ولا نطلب اسمك أو بريدك الإلكتروني لقراءة الموقع.",
            "## المعلومات المحفوظة على جهازك",
            "يحفظ الموقع في متصفحك (التخزين المحلي) اختيارك للغة وللوضع الفاتح أو الداكن، وتبقى هذه المعلومات على جهازك ولا تُستعمل لتتبعك. أما ملفات تعريف الارتباط الإعلانية فموضحة أدناه. ويمكنك حذف هذه البيانات والكوكيز في أي وقت من إعدادات المتصفح.",
            "## نموذج الاتصال",
            "عندما تراسلنا نتلقى الاسم ووسيلة التواصل والرسالة التي تختار إرسالها مع تاريخها. نستعملها فقط لقراءة رسالتك والرد عليها، ونحتفظ بها مدة لا تتجاوز 12 شهرا، ولا نبيعها ولا نشاركها.",
            "## الاستضافة والبيانات التقنية",
            "يستضيف الموقعَ Cloudflare، الذي يعالج بيانات تقنية مثل عنوان IP لعرض الصفحات وحماية الموقع من الهجمات. وللحد من الرسائل المزعجة نحتفظ مؤقتا بعدد الرسائل المرسلة من نفس الاتصال.",
            "## أزرار المشاركة والنتائج المباشرة",
            "لا تفتح أزرار المشاركة فيسبوك أو إكس أو واتساب أو إنستغرام إلا عند الضغط عليها، وتطبق هذه الخدمات حينها سياسات الخصوصية الخاصة بها. أما النتائج المباشرة فتُحمَّل من خادمنا، فلا يتصل متصفحك مباشرة بمزودي النتائج.",
            "## الإعلانات وملفات تعريف الارتباط",
            "يعتمد كورابولس على الإعلانات في تمويله، ونستعمل Google AdSense لعرض الإعلانات. ويستعمل مزودون خارجيون، من بينهم Google، ملفات تعريف الارتباط (كوكيز) لعرض إعلانات بناء على زياراتك السابقة لهذا الموقع ولمواقع أخرى.",
            "تتيح ملفات تعريف الارتباط الإعلانية لـGoogle وشركائها عرض إعلانات لك بناء على زياراتك لكورابولس و/أو لمواقع أخرى على الإنترنت. ويمكنك إيقاف الإعلانات المخصصة عبر [إعدادات إعلانات Google](https://adssettings.google.com)، أو إيقاف استعمال بعض المزودين الخارجيين لملفات تعريف الارتباط عبر [www.aboutads.info](https://www.aboutads.info/choices).",
            "يُطلب من زوار المنطقة الاقتصادية الأوروبية والمملكة المتحدة وسويسرا الموافقة قبل عرض الإعلانات المخصصة عبر رسالة الموافقة الخاصة بـGoogle، ويمكنهم تغيير اختيارهم في أي وقت. اعرف المزيد عن [كيفية استعمال Google للمعلومات من المواقع الشريكة](https://policies.google.com/technologies/partner-sites).",
            "## حقوقك",
            "وفقا للقانون المغربي 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي، يمكنك طلب الاطلاع على المعلومات التي أرسلتها إلينا أو تصحيحها أو حذفها أو الاعتراض على استعمالها عبر [صفحة الاتصال](page.html?p=contact&lang=ar)."
          ]
        }
      }
    },
    {
      "slug": "terms",
      "status": "publish",
      "title": "Terms of Use",
      "body": [
        "By using KoraPulse, you accept these terms. Last updated: 15 November 2026.",
        "## Our content",
        "Articles, photos, illustrations and the KoraPulse name and logo belong to KoraPulse or their respective owners. You may share links to our articles freely. Copying or republishing our content in full requires our written permission; short quotes with a link to the original article are welcome.",
        "## Accuracy",
        "We work hard to publish accurate information, but news changes quickly and mistakes can happen. The content is provided for information only. Live scores, fixtures and tables come from third-party data providers and may be delayed or incomplete; official results are those published by the competition organisers.",
        "## Opinion pieces",
        "Opinion pieces reflect the views of their authors and are labelled as opinion.",
        "## External links",
        "We may link to other websites. We are not responsible for their content or their privacy practices.",
        "## Acceptable use",
        "Do not use the site or the contact form to send spam, unlawful, offensive or misleading content, or to try to disrupt or attack the service.",
        "## Changes",
        "We may update these terms; the date above shows the latest version. These terms are governed by Moroccan law.",
        "## Contact",
        "Questions about these terms? Write to us through our [contact page](page.html?p=contact)."
      ],
      "tr": {
        "fr": {
          "title": "Conditions d'utilisation",
          "body": [
            "En utilisant KoraPulse, vous acceptez les présentes conditions. Dernière mise à jour : 15 novembre 2026.",
            "## Nos contenus",
            "Les articles, photos, illustrations ainsi que le nom et le logo KoraPulse appartiennent à KoraPulse ou à leurs propriétaires respectifs. Vous pouvez librement partager les liens vers nos articles. La copie ou la republication intégrale de nos contenus nécessite notre autorisation écrite ; les courtes citations accompagnées d'un lien vers l'article original sont les bienvenues.",
            "## Exactitude",
            "Nous faisons tout pour publier des informations exactes, mais l'actualité évolue vite et des erreurs peuvent arriver. Les contenus sont fournis à titre informatif. Les scores, calendriers et classements proviennent de fournisseurs de données tiers et peuvent être retardés ou incomplets ; les résultats officiels sont ceux publiés par les organisateurs des compétitions.",
            "## Tribunes",
            "Les tribunes reflètent l'avis de leurs auteurs et sont signalées comme opinions.",
            "## Liens externes",
            "Nous pouvons renvoyer vers d'autres sites. Nous ne sommes pas responsables de leur contenu ni de leurs pratiques en matière de confidentialité.",
            "## Utilisation acceptable",
            "N'utilisez pas le site ni le formulaire de contact pour envoyer du spam ou des contenus illicites, offensants ou trompeurs, ni pour tenter de perturber ou d'attaquer le service.",
            "## Modifications",
            "Nous pouvons mettre à jour ces conditions ; la date ci-dessus indique la dernière version. Ces conditions sont régies par le droit marocain.",
            "## Contact",
            "Une question sur ces conditions ? Écrivez-nous via notre [page contact](page.html?p=contact&lang=fr)."
          ]
        },
        "ar": {
          "title": "شروط الاستخدام",
          "body": [
            "باستعمالك لكورابولس فإنك توافق على هذه الشروط. آخر تحديث: 15 نونبر 2026.",
            "## محتوانا",
            "المقالات والصور والرسوم واسم كورابولس وشعاره ملك لكورابولس أو لأصحابها. يمكنك مشاركة روابط مقالاتنا بحرية، أما نسخ محتوانا أو إعادة نشره كاملا فيتطلب إذنا كتابيا منا، ونرحب بالاقتباسات القصيرة المرفقة برابط المقال الأصلي.",
            "## دقة المعلومات",
            "نحرص على نشر معلومات دقيقة، لكن الأخبار تتغير بسرعة وقد تقع أخطاء. يُقدَّم المحتوى لأغراض إخبارية فقط. وتأتي النتائج والمواعيد وجداول الترتيب من مزودي بيانات خارجيين وقد تتأخر أو تكون ناقصة، والنتائج الرسمية هي التي تنشرها الجهات المنظمة للمسابقات.",
            "## مقالات الرأي",
            "تعبر مقالات الرأي عن آراء كتابها، ويُشار إليها دائما بأنها رأي.",
            "## الروابط الخارجية",
            "قد نضع روابط لمواقع أخرى، ولسنا مسؤولين عن محتواها أو عن ممارساتها في مجال الخصوصية.",
            "## الاستعمال المقبول",
            "لا تستعمل الموقع أو نموذج الاتصال لإرسال رسائل مزعجة أو محتوى غير قانوني أو مسيء أو مضلل، أو لمحاولة تعطيل الخدمة أو مهاجمتها.",
            "## التعديلات",
            "قد نحدّث هذه الشروط، ويشير التاريخ أعلاه إلى آخر نسخة. وتخضع هذه الشروط للقانون المغربي.",
            "## اتصل بنا",
            "لديك سؤال حول هذه الشروط؟ راسلنا عبر [صفحة الاتصال](page.html?p=contact&lang=ar)."
          ]
        }
      }
    }
  ]
};
