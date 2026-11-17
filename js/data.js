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
      "featured": true
    }
  ],
  "updated": "2026-11-17T12:34:31.000Z",
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
