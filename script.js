'use strict';

const QUESTION_COUNT = 8;
const DEFAULT_LANGUAGE = 'zh-Hans';
const LANGUAGE_STORAGE_KEY = 'clreq-quiz-language';

const locales = {
  'zh-Hans': {
    meta: {
      title: '中文排版问题小测验',
      description: '8 道题，看看你能不能发现中文网页和电子书中常见的排版问题。内容基于 W3C 中文排版需求。',
      ogDescription: '8 道题，测试你的中文排版敏感度。'
    },
    ui: {
      pageLabel: '页面标题',
      languageLabel: '语言选择',
      hansLabel: '简体',
      hantLabel: '繁體',
      headerClreq: 'W3C中文排版需求',
      footerClreq: '中文排版需求',
      startEyebrow: '8 题 · 约 2 分钟',
      titleHtml: '中文排版<br>问题小测验',
      introTitle: '这行字，哪里不对劲？',
      introDescription: '标点、换行、着重号、段首缩排……中文网页里的很多细节，平时可能不注意，错了就会影响阅读体验。',
      introNote: '本测验基于 W3C《中文排版需求》整理，每次随机抽取 8 题。',
      startButton: '开始测验',
      progress: function(current, total) { return `第 ${current} / ${total} 题`; },
      warning: '请先选择一个答案。',
      correctTitle: '答对了',
      incorrectTitle: '这题可以再留意',
      sourceLink: '查看 clreq 对应章节',
      nextQuestion: '下一题',
      viewResult: '查看结果',
      resultEyebrow: '测验完成',
      shareButton: '直接分享',
      copyButton: '复制分享文案',
      copiedButton: '已复制',
      manualCopyButton: '请手动复制下方文案',
      restartButton: '再测一次',
      resultClreq: '阅读 clreq',
      sourceCode: '查看源码',
      contribute: '贡献题目',
      shareTextLabel: '可手动复制的分享文案',
      noWeakness: '没有明显薄弱项',
      weaknessPrefix: '可继续关注：',
      shareText: function(score, total, profileTitle) {
        return `我在「中文排版问题小测验」中拿到 ${score}/${total}，类型是「${profileTitle}」。你能看出中文网页里的标点、换行和省略号问题吗？`;
      }
    },
    questions: [
      {
        id: 'regional-punctuation',
        topic: '标点位置',
        question: '同样是中文标点，不同地区最明显的排版差异之一是什么？',
        scenario: '「。」「，」这些点号，有的字体居中，有的更靠近前一个字。',
        choices: [
          ['a', '只要是简体字，标点就一定靠左下'],
          ['b', '只要是繁体字，标点就一定居中'],
          ['c', '标点在字面中的位置常有地区差异，应结合区域和字体处理']
        ],
        answer: 'c',
        explanation: '中文点号的位置常受地区排版习惯和字体设计影响。港台标点多居中，中国大陆标点多靠近受注文字一侧；这不是单纯的繁简问题。',
        source: 'https://www.w3.org/TR/clreq/#line_composition_rules_for_punctuation_marks'
      },
      {
        id: 'region-not-script',
        topic: '地区规则',
        question: '做中文排版设置时，为什么不能只看“简体/繁体”？',
        scenario: '一本在中国大陆出版的繁体直排书，和一本在台湾出版的繁体直排书，可能采用不同排版规则。',
        choices: [
          ['a', '因为排版规则常常按地区形成习惯，而不是只按字形繁简区分'],
          ['b', '因为繁体字没有排版规则'],
          ['c', '因为简体字只能横排']
        ],
        answer: 'a',
        explanation: 'clreq 建议按“区域”而不只是“繁简”区分排版规则。同样是繁体内容，出版地区和使用场景不同，排版习惯也可能不同。',
        source: 'https://www.w3.org/TR/clreq/#major_differences_between_horizontal_and_vertical_writing_modes'
      },
      {
        id: 'line-start-punctuation',
        topic: '换行禁则',
        question: '下面这个换行问题在哪里？',
        scenario: '他说：「我们明天再谈<br><span class="bad-break">。</span>」',
        choices: [
          ['a', '句号出现在行首，通常应避免'],
          ['b', '中文不能使用引号'],
          ['c', '句号必须换到下一行才对']
        ],
        answer: 'a',
        explanation: '多数点号、结束引号、结束括号等通常不应出现在行首，这是中文行首行尾禁则的一部分。',
        source: 'https://www.w3.org/TR/clreq/#prohibition_rules_for_line_start_end'
      },
      {
        id: 'dash-unbreakable',
        topic: '不可拆分',
        question: '中文破折号遇到换行时，哪种处理更合理？',
        scenario: '这件事—<br>—后来没人再提。',
        choices: [
          ['a', '两个破折号可以随便拆成两行'],
          ['b', '两字宽破折号应视为整体，避免拆到两行'],
          ['c', '中文里不能使用破折号']
        ],
        answer: 'b',
        explanation: '中文破折号通常占两个汉字空间，应作为一个整体处理。',
        source: 'https://www.w3.org/TR/clreq/#id82'
      },
      {
        id: 'ellipsis-shape',
        topic: '省略号',
        question: '普通中文正文里，哪个省略号更合适？',
        scenario: 'A：我想说...<br>B：我想说……',
        choices: [
          ['a', '用三个英文句点'],
          ['b', '六点、占两个汉字空间'],
          ['c', '两种在任何场景都完全一样']
        ],
        answer: 'b',
        explanation: '中文省略号通常由六个省略点组成，占两个汉字空间；科技或西文环境可能另有体例。',
        source: 'https://www.w3.org/TR/clreq/#h_ellipsis'
      },
      {
        id: 'ellipsis-unbreakable',
        topic: '不可拆分',
        question: '中文省略号可以在中间断行吗？',
        scenario: '他沉默了…<br>…然后点点头。',
        choices: [
          ['a', '通常不应拆开，省略号应作为整体'],
          ['b', '必须拆开，才显得自然'],
          ['c', '省略号只能放在段首']
        ],
        answer: 'a',
        explanation: '中文省略号占两个汉字空间，不应以适配分行为由拆至两行。',
        source: 'https://www.w3.org/TR/clreq/#h_ellipsis'
      },
      {
        id: 'emphasis-position',
        topic: '着重号',
        question: '横排中文里的着重号通常放在哪里？',
        scenario: '给这段文字添加<span class="mark">着重号</span>。',
        choices: [
          ['a', '文字上方'],
          ['b', '文字下方'],
          ['c', '只能放在行尾']
        ],
        answer: 'b',
        explanation: '中文横排着重号多放在文字下方；直排时通常放在文字右侧。',
        source: 'https://www.w3.org/TR/clreq/#id84'
      },
      {
        id: 'emphasis-punctuation',
        topic: '着重号',
        question: '如果整句都要加着重号，句号一般怎么处理？',
        scenario: '这句话很重要。',
        choices: [
          ['a', '只给文字加，句号不加'],
          ['b', '句号也加，因为它属于这句话'],
          ['c', '只给句号加，表示语气更强']
        ],
        answer: 'a',
        explanation: '句号、逗号、引号、括号、书名号等标点通常不再添加着重号。',
        source: 'https://www.w3.org/TR/clreq/#id84'
      },
      {
        id: 'mixed-punctuation',
        topic: '中西混排',
        question: '中文正文中夹杂英文和数字时，标点原则上怎么处理？',
        scenario: '我们发布了CSS Writing Modes Level 4。',
        choices: [
          ['a', '正文是中文时，原则上仍使用中文标点'],
          ['b', '只要有英文，就必须全篇使用英文标点'],
          ['c', '中文正文不能出现英文']
        ],
        answer: 'a',
        explanation: '中西混排中正文为中文时原则上使用中文标点，科技文献等场景可以有例外。',
        source: 'https://www.w3.org/TR/clreq/#science_and_technology_literature'
      },
      {
        id: 'vertical-western',
        topic: '直排混排',
        question: '直排中文中遇到较长的西文单词时，常见处理是什么？',
        scenario: '直排文本中出现Internationalization这样的词。',
        choices: [
          ['a', '逐个字母直排'],
          ['b', '常使用比例字体并顺时针旋转90°配置'],
          ['c', '必须删除西文']
        ],
        answer: 'b',
        explanation: '西文单词、语句或四位数以上数字在直排中常旋转 90°配置。',
        source: 'https://www.w3.org/TR/clreq/#id114'
      },
      {
        id: 'tate-chu-yoko',
        topic: '直排数字',
        question: '直排中遇到“12月”这样的两位数字，哪种说法更接近常见做法？',
        scenario: '直排日期中出现 12 月。',
        choices: [
          ['a', '二到三位数字常可用纵中横排，嵌在一个汉字大小内'],
          ['b', '所有数字都必须旋转 90°'],
          ['c', '直排中不能出现阿拉伯数字']
        ],
        answer: 'a',
        explanation: '纵中横排常用于二到三位数字，原则上排列不超过一个汉字大小。',
        source: 'https://www.w3.org/TR/clreq/#major_differences_between_horizontal_and_vertical_writing_modes'
      },
      {
        id: 'first-line-indent',
        topic: '段落',
        question: '中文书籍排版中，段首缩排常见标准是多少？',
        scenario: '　　这是一个新段落的开始。',
        choices: [
          ['a', '通常以两个汉字空间为标准'],
          ['b', '通常以一个汉字空间为标准'],
          ['c', '中文从不使用段首缩排']
        ],
        answer: 'a',
        explanation: '中文出版物段首缩排以两个汉字空间为标准；少数多栏场景可用一字缩排。',
        source: 'https://www.w3.org/TR/clreq/#first_line_indents'
      },
      {
        id: 'number-no-split',
        topic: '不可拆分',
        question: '校对时看到这个换行，应该提醒哪一点？',
        scenario: '气温达到 37<br>℃，请注意防暑。',
        choices: [
          ['a', '37 和 ℃ 不宜被拆到两行'],
          ['b', '℃ 前应该再加一个空格'],
          ['c', '所有单位符号都应该放到下一行开头']
        ],
        answer: 'a',
        explanation: '百分号、千分号、度数符号等通常要和前面的阿拉伯数字保持在一起，不宜因为换行被拆开。',
        source: 'https://www.w3.org/TR/clreq/#h-digits_and_their_prefix_and_suffix'
      },
      {
        id: 'zhuyin-position',
        topic: '行间注',
        question: '注音符号标注汉字时，哪种位置在现代排版中更常见、更稳妥？',
        scenario: '漢字旁边标注 ㄏㄢˋ ㄗˋ。',
        choices: [
          ['a', '通常放在汉字右侧'],
          ['b', '通常放在汉字上方'],
          ['c', '只能作为脚注出现']
        ],
        answer: 'a',
        explanation: '注音符号标注在汉字上方或右方都属于标准，但今天放在右侧更常见、更容易接受。',
        source: 'https://www.w3.org/TR/clreq/#positioning_of_zhuyin'
      }
    ],
    resultProfiles: [
      { min: 0, title: '仍需努力', description: '你更关注内容本身，对排版细节还比较宽容。下次看到行首标点或奇怪省略号，可以多停一秒看看。' },
      { min: 3, title: '排版观察员', description: '你已经能发现一些“不太对劲”的地方。再熟悉几条规则，就能找到问题了。' },
      { min: 5, title: '细节捕手', description: '你不只凭感觉看版面，也能把问题对应到具体规则。很多中文网页的小毛病逃不过你的法眼。' },
      { min: 7, title: '中文排版守门人', description: '你理解中文排版背后的结构感。把这份敏感度带到设计和开发里，读者会感谢你。' }
    ]
  },
  'zh-Hant': {
    meta: {
      title: '中文排版問題小測驗',
      description: '8 道題，看看你能不能發現中文網頁和電子書中常見的排版問題。內容基於 W3C 中文排版需求。',
      ogDescription: '8 道題，測試你的中文排版敏感度。'
    },
    ui: {
      pageLabel: '頁面標題',
      languageLabel: '語言選擇',
      hansLabel: '简体',
      hantLabel: '繁體',
      headerClreq: 'W3C中文排版需求',
      footerClreq: '中文排版需求',
      startEyebrow: '8 題 · 約 2 分鐘',
      titleHtml: '中文排版<br>問題小測驗',
      introTitle: '這行字，哪裡不對勁？',
      introDescription: '標點、換行、著重號、段首縮排……中文網頁裡的許多細節，平時可能不會注意，但錯了就會影響閱讀體驗。',
      introNote: '本測驗基於 W3C《中文排版需求》整理，每次隨機抽取 8 題。',
      startButton: '開始測驗',
      progress: function(current, total) { return `第 ${current} / ${total} 題`; },
      warning: '請先選擇一個答案。',
      correctTitle: '答對了',
      incorrectTitle: '這題可以再留意',
      sourceLink: '查看 clreq 對應章節',
      nextQuestion: '下一題',
      viewResult: '查看結果',
      resultEyebrow: '測驗完成',
      shareButton: '直接分享',
      copyButton: '複製分享文案',
      copiedButton: '已複製',
      manualCopyButton: '請手動複製下方文案',
      restartButton: '再測一次',
      resultClreq: '閱讀 clreq',
      sourceCode: '查看原始碼',
      contribute: '貢獻題目',
      shareTextLabel: '可手動複製的分享文案',
      noWeakness: '沒有明顯薄弱項',
      weaknessPrefix: '可繼續關注：',
      shareText: function(score, total, profileTitle) {
        return `我在「中文排版問題小測驗」中拿到 ${score}/${total}，類型是「${profileTitle}」。你能看出中文網頁裡的標點、換行和省略號問題嗎？`;
      }
    },
    questions: [
      {
        id: 'regional-punctuation',
        topic: '標點位置',
        question: '同樣是中文標點，不同地區最明顯的排版差異之一是什麼？',
        scenario: '「。」「，」這些點號，有的字型置中，有的更靠近前一個字。',
        choices: [
          ['a', '只要是簡體字，標點就一定靠左下'],
          ['b', '只要是繁體字，標點就一定置中'],
          ['c', '標點在字面中的位置常有地區差異，應結合區域和字型處理']
        ],
        answer: 'c',
        explanation: '中文點號的位置常受地區排版習慣和字型設計影響。港臺標點多置中，中國大陸標點多靠近受注文字一側；這不是單純的繁簡問題。',
        source: 'https://www.w3.org/TR/clreq/#line_composition_rules_for_punctuation_marks'
      },
      {
        id: 'region-not-script',
        topic: '地區規則',
        question: '做中文排版設定時，為什麼不能只看「簡體／繁體」？',
        scenario: '一本在中國大陸出版的繁體直排書，和一本在臺灣出版的繁體直排書，可能採用不同排版規則。',
        choices: [
          ['a', '因為排版規則常常按地區形成習慣，而不是只按字形繁簡區分'],
          ['b', '因為繁體字沒有排版規則'],
          ['c', '因為簡體字只能橫排']
        ],
        answer: 'a',
        explanation: 'clreq 建議按「區域」而不只是「繁簡」區分排版規則。同樣是繁體內容，出版地區和使用場景不同，排版習慣也可能不同。',
        source: 'https://www.w3.org/TR/clreq/#major_differences_between_horizontal_and_vertical_writing_modes'
      },
      {
        id: 'line-start-punctuation',
        topic: '換行禁則',
        question: '下面這個換行問題在哪裡？',
        scenario: '他說：「我們明天再談<br><span class="bad-break">。</span>」',
        choices: [
          ['a', '句號出現在行首，通常應避免'],
          ['b', '中文不能使用引號'],
          ['c', '句號必須換到下一行才對']
        ],
        answer: 'a',
        explanation: '多數點號、結束引號、結束括號等通常不應出現在行首，這是中文行首行尾禁則的一部分。',
        source: 'https://www.w3.org/TR/clreq/#prohibition_rules_for_line_start_end'
      },
      {
        id: 'dash-unbreakable',
        topic: '不可拆分',
        question: '中文破折號遇到換行時，哪種處理更合理？',
        scenario: '這件事—<br>—後來沒人再提。',
        choices: [
          ['a', '兩個破折號可以隨便拆成兩行'],
          ['b', '兩字寬破折號應視為整體，避免拆到兩行'],
          ['c', '中文裡不能使用破折號']
        ],
        answer: 'b',
        explanation: '中文破折號通常占兩個漢字空間，應作為一個整體處理。',
        source: 'https://www.w3.org/TR/clreq/#id82'
      },
      {
        id: 'ellipsis-shape',
        topic: '省略號',
        question: '普通中文正文裡，哪個省略號更合適？',
        scenario: 'A：我想說...<br>B：我想說……',
        choices: [
          ['a', '用三個英文句點'],
          ['b', '六點、占兩個漢字空間'],
          ['c', '兩種在任何場景都完全一樣']
        ],
        answer: 'b',
        explanation: '中文省略號通常由六個省略點組成，占兩個漢字空間；科技或西文環境可能另有體例。',
        source: 'https://www.w3.org/TR/clreq/#h_ellipsis'
      },
      {
        id: 'ellipsis-unbreakable',
        topic: '不可拆分',
        question: '中文省略號可以在中間斷行嗎？',
        scenario: '他沉默了…<br>…然後點點頭。',
        choices: [
          ['a', '通常不應拆開，省略號應作為整體'],
          ['b', '必須拆開，才顯得自然'],
          ['c', '省略號只能放在段首']
        ],
        answer: 'a',
        explanation: '中文省略號占兩個漢字空間，不應以適配分行為由拆至兩行。',
        source: 'https://www.w3.org/TR/clreq/#h_ellipsis'
      },
      {
        id: 'emphasis-position',
        topic: '著重號',
        question: '橫排中文裡的著重號通常放在哪裡？',
        scenario: '為這段文字加上<span class="mark">著重號</span>',
        choices: [
          ['a', '文字上方'],
          ['b', '文字下方'],
          ['c', '只能放在行尾']
        ],
        answer: 'b',
        explanation: '中文橫排著重號多放在文字下方；直排時通常放在文字右側。',
        source: 'https://www.w3.org/TR/clreq/#id84'
      },
      {
        id: 'emphasis-punctuation',
        topic: '著重號',
        question: '如果整句都要加著重號，句號一般怎麼處理？',
        scenario: '這句話很重要。',
        choices: [
          ['a', '只給文字加，句號不加'],
          ['b', '句號也加，因為它屬於這句話'],
          ['c', '只給句號加，表示語氣更強']
        ],
        answer: 'a',
        explanation: '句號、逗號、引號、括號、書名號等標點通常不再添加著重號。',
        source: 'https://www.w3.org/TR/clreq/#id84'
      },
      {
        id: 'mixed-punctuation',
        topic: '中西混排',
        question: '中文正文中夾雜英文和數字時，標點原則上怎麼處理？',
        scenario: '我們發布了CSS Writing Modes Level 4。',
        choices: [
          ['a', '正文是中文時，原則上仍使用中文標點'],
          ['b', '只要有英文，就必須全篇使用英文標點'],
          ['c', '中文正文不能出現英文']
        ],
        answer: 'a',
        explanation: '中西混排中正文為中文時原則上使用中文標點，科技文獻等場景可以有例外。',
        source: 'https://www.w3.org/TR/clreq/#science_and_technology_literature'
      },
      {
        id: 'vertical-western',
        topic: '直排混排',
        question: '直排中文中遇到較長的西文單字時，常見處理是什麼？',
        scenario: '直排文本中出現Internationalization這樣的詞。',
        choices: [
          ['a', '逐個字母直排'],
          ['b', '常使用比例字型並順時針旋轉90°配置'],
          ['c', '必須刪除西文']
        ],
        answer: 'b',
        explanation: '西文單字、語句或四位數以上數字在直排中常旋轉 90°配置。',
        source: 'https://www.w3.org/TR/clreq/#id114'
      },
      {
        id: 'tate-chu-yoko',
        topic: '直排數字',
        question: '直排中遇到「12月」這樣的兩位數字，哪種說法更接近常見做法？',
        scenario: '直排日期中出現 12 月。',
        choices: [
          ['a', '二到三位數字常可用縱中橫排，嵌在一個漢字大小內'],
          ['b', '所有數字都必須旋轉 90°'],
          ['c', '直排中不能出現阿拉伯數字']
        ],
        answer: 'a',
        explanation: '縱中橫排常用於二到三位數字，原則上排列不超過一個漢字大小。',
        source: 'https://www.w3.org/TR/clreq/#major_differences_between_horizontal_and_vertical_writing_modes'
      },
      {
        id: 'first-line-indent',
        topic: '段落',
        question: '中文書籍排版中，段首縮排常見標準是多少？',
        scenario: '　　這是一個新段落的開始。',
        choices: [
          ['a', '通常以兩個漢字空間為標準'],
          ['b', '通常以一個漢字空間為標準'],
          ['c', '中文從不使用段首縮排']
        ],
        answer: 'a',
        explanation: '中文出版物段首縮排以兩個漢字空間為標準；少數多欄場景可用一字縮排。',
        source: 'https://www.w3.org/TR/clreq/#first_line_indents'
      },
      {
        id: 'number-no-split',
        topic: '不可拆分',
        question: '校對時看到這個換行，應該提醒哪一點？',
        scenario: '氣溫達到 37<br>℃，請注意防暑。',
        choices: [
          ['a', '37 和 ℃ 不宜被拆到兩行'],
          ['b', '℃ 前應該再加一個空格'],
          ['c', '所有單位符號都應該放到下一行開頭']
        ],
        answer: 'a',
        explanation: '百分號、千分號、度數符號等通常要和前面的阿拉伯數字保持在一起，不宜因為換行被拆開。',
        source: 'https://www.w3.org/TR/clreq/#h-digits_and_their_prefix_and_suffix'
      },
      {
        id: 'zhuyin-position',
        topic: '行間注',
        question: '注音符號標注漢字時，哪種位置在現代排版中更常見、更穩妥？',
        scenario: '漢字旁邊標注 ㄏㄢˋ ㄗˋ。',
        choices: [
          ['a', '通常放在漢字右側'],
          ['b', '通常放在漢字上方'],
          ['c', '只能作為腳注出現']
        ],
        answer: 'a',
        explanation: '注音符號標注在漢字上方或右方都屬於標準，但今天放在右側更常見、更容易接受。',
        source: 'https://www.w3.org/TR/clreq/#positioning_of_zhuyin'
      }
    ],
    resultProfiles: [
      { min: 0, title: '仍需努力', description: '你更關注內容本身，對排版細節還比較寬容。下次看到行首標點或奇怪省略號，可以多停一秒看看。' },
      { min: 3, title: '排版觀察員', description: '你已經能發現一些「不太對勁」的地方。再熟悉幾條規則，就能找到問題了。' },
      { min: 5, title: '細節捕手', description: '你不只憑感覺看版面，也能把問題對應到具體規則。許多中文網頁的小毛病逃不過你的法眼。' },
      { min: 7, title: '中文排版守門人', description: '你理解中文排版背後的結構感。把這份敏感度帶到設計和開發裡，讀者會感謝你。' }
    ]
  }
};

const state = {
  activeQuestionIds: [],
  currentIndex: 0,
  selectedChoice: null,
  answerRevealed: false,
  score: 0,
  mistakeQuestionIds: new Map()
};

let currentLanguage = getInitialLanguage();

const elements = {
  header: document.querySelector('.site-header'),
  languageSwitcher: document.getElementById('language-switcher'),
  languageButtons: Array.from(document.querySelectorAll('[data-language]')),
  descriptionMeta: document.querySelector('meta[name="description"]'),
  ogTitleMeta: document.querySelector('meta[property="og:title"]'),
  ogDescriptionMeta: document.querySelector('meta[property="og:description"]'),
  startView: document.getElementById('start-view'),
  quizView: document.getElementById('quiz-view'),
  resultView: document.getElementById('result-view'),
  startButton: document.getElementById('start-button'),
  progressText: document.getElementById('progress-text'),
  progressBar: document.getElementById('progress-bar'),
  topicLabel: document.getElementById('topic-label'),
  questionTitle: document.getElementById('question-title'),
  scenario: document.getElementById('scenario'),
  choices: document.getElementById('choices'),
  warning: document.getElementById('choice-warning'),
  feedback: document.getElementById('feedback'),
  resultTitle: document.getElementById('result-title'),
  resultScore: document.getElementById('result-score'),
  resultDescription: document.getElementById('result-description'),
  weaknesses: document.getElementById('weaknesses'),
  shareButton: document.getElementById('share-button'),
  copyButton: document.getElementById('copy-button'),
  restartButton: document.getElementById('restart-button'),
  shareText: document.getElementById('share-text')
};

function getCurrentLocale() {
  return locales[currentLanguage] || locales[DEFAULT_LANGUAGE];
}

function getStoredLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function saveLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Ignore storage failures; the current session still updates.
  }
}

function normalizeLanguage(language) {
  return Object.prototype.hasOwnProperty.call(locales, language) ? language : DEFAULT_LANGUAGE;
}

function getInitialLanguage() {
  const stored = getStoredLanguage();
  if (stored && locales[stored]) return stored;

  const browserLanguages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  const prefersTraditional = browserLanguages.some(function(language) {
    return /^zh-(Hant|TW|HK|MO)/i.test(language);
  });

  return prefersTraditional ? 'zh-Hant' : DEFAULT_LANGUAGE;
}

function getQuestionById(id, language) {
  const locale = locales[language] || locales[DEFAULT_LANGUAGE];
  return locale.questions.find(function(question) { return question.id === id; }) ||
    locales[DEFAULT_LANGUAGE].questions.find(function(question) { return question.id === id; });
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function setHtml(id, value) {
  const element = document.getElementById(id);
  if (element) element.innerHTML = value;
}

function applyStaticText() {
  const locale = getCurrentLocale();
  const ui = locale.ui;

  document.documentElement.lang = currentLanguage;
  document.title = locale.meta.title;
  if (elements.descriptionMeta) elements.descriptionMeta.setAttribute('content', locale.meta.description);
  if (elements.ogTitleMeta) elements.ogTitleMeta.setAttribute('content', locale.meta.title);
  if (elements.ogDescriptionMeta) elements.ogDescriptionMeta.setAttribute('content', locale.meta.ogDescription);
  if (elements.header) elements.header.setAttribute('aria-label', ui.pageLabel);
  if (elements.languageSwitcher) elements.languageSwitcher.setAttribute('aria-label', ui.languageLabel);

  setText('header-clreq-link', ui.headerClreq);
  setText('start-eyebrow', ui.startEyebrow);
  setHtml('quiz-title', ui.titleHtml);
  setText('intro-title', ui.introTitle);
  setText('intro-description', ui.introDescription);
  setText('intro-note', ui.introNote);
  setText('start-button', ui.startButton);
  setText('choice-warning', ui.warning);
  setText('result-eyebrow', ui.resultEyebrow);
  setText('share-button', ui.shareButton);
  setText('copy-button', ui.copyButton);
  setText('restart-button', ui.restartButton);
  setText('result-clreq-link', ui.resultClreq);
  setText('source-link', ui.sourceCode);
  setText('contribute-link', ui.contribute);
  setText('footer-clreq-link', ui.footerClreq);
  setText('footer-contribute-link', ui.contribute);
  if (elements.shareText) elements.shareText.setAttribute('aria-label', ui.shareTextLabel);

  elements.languageButtons.forEach(function(button) {
    const isActive = button.dataset.language === currentLanguage;
    button.setAttribute('aria-pressed', String(isActive));
    if (button.dataset.language === 'zh-Hans') button.textContent = ui.hansLabel;
    if (button.dataset.language === 'zh-Hant') button.textContent = ui.hantLabel;
  });
}

function setLanguage(language) {
  const nextLanguage = normalizeLanguage(language);
  currentLanguage = nextLanguage;
  saveLanguage(nextLanguage);
  applyStaticText();

  if (!elements.quizView.hidden && state.activeQuestionIds.length > 0) {
    renderQuestion({ preserveState: true });
  }
  if (!elements.resultView.hidden && state.activeQuestionIds.length > 0) {
    renderResult({ preserveScroll: true });
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showView(view) {
  [elements.startView, elements.quizView, elements.resultView].forEach(function(section) {
    section.hidden = section !== view;
  });
}

function startQuiz() {
  state.activeQuestionIds = shuffle(locales[DEFAULT_LANGUAGE].questions.map(function(question) { return question.id; }))
    .slice(0, Math.min(QUESTION_COUNT, locales[DEFAULT_LANGUAGE].questions.length));
  state.currentIndex = 0;
  state.selectedChoice = null;
  state.answerRevealed = false;
  state.score = 0;
  state.mistakeQuestionIds = new Map();
  showView(elements.quizView);
  renderQuestion();
}

function renderQuestion(options) {
  const preserveState = options && options.preserveState;
  const questionId = state.activeQuestionIds[state.currentIndex];
  const question = getQuestionById(questionId, currentLanguage);
  const total = state.activeQuestionIds.length;
  const ui = getCurrentLocale().ui;

  if (!preserveState) {
    state.selectedChoice = null;
    state.answerRevealed = false;
  }

  elements.progressText.textContent = ui.progress(state.currentIndex + 1, total);
  elements.progressBar.style.width = `${((state.currentIndex + 1) / total) * 100}%`;
  elements.topicLabel.textContent = question.topic;
  elements.questionTitle.textContent = question.question;
  elements.scenario.innerHTML = question.scenario;
  elements.warning.textContent = ui.warning;
  elements.warning.hidden = true;
  elements.feedback.hidden = true;
  elements.feedback.className = 'feedback-card';
  elements.feedback.innerHTML = '';

  elements.choices.innerHTML = '';
  question.choices.forEach(function(choice) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.choice = choice[0];
    button.setAttribute('aria-pressed', String(state.selectedChoice === choice[0]));
    button.textContent = `${choice[0].toUpperCase()}. ${choice[1]}`;
    button.addEventListener('click', function() { selectChoice(choice[0]); });
    elements.choices.appendChild(button);
  });

  if (state.answerRevealed) {
    renderFeedback();
  }
}

function selectChoice(choiceId) {
  if (state.answerRevealed) {
    return;
  }

  const question = getQuestionById(state.activeQuestionIds[state.currentIndex], currentLanguage);
  state.selectedChoice = choiceId;
  state.answerRevealed = true;
  elements.warning.hidden = true;

  if (choiceId === question.answer) {
    state.score += 1;
  } else {
    state.mistakeQuestionIds.set(question.id, (state.mistakeQuestionIds.get(question.id) || 0) + 1);
  }

  renderFeedback();
}

function renderFeedback() {
  const question = getQuestionById(state.activeQuestionIds[state.currentIndex], currentLanguage);
  const ui = getCurrentLocale().ui;
  const isCorrect = state.selectedChoice === question.answer;

  Array.from(elements.choices.children).forEach(function(button) {
    button.disabled = true;
    button.setAttribute('aria-pressed', String(button.dataset.choice === state.selectedChoice));
    if (button.dataset.choice === question.answer) button.classList.add('correct');
    if (button.dataset.choice === state.selectedChoice && !isCorrect) button.classList.add('incorrect');
  });

  elements.feedback.className = 'feedback-card';
  elements.feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
  elements.feedback.innerHTML = `
    <h3>${isCorrect ? ui.correctTitle : ui.incorrectTitle}</h3>
    <p>${question.explanation}</p>
    <p><a href="${question.source}" target="_blank">${ui.sourceLink}</a></p>
    <button class="primary-button" type="button" id="next-button">${state.currentIndex + 1 === state.activeQuestionIds.length ? ui.viewResult : ui.nextQuestion}</button>
  `;
  elements.feedback.hidden = false;
  document.getElementById('next-button').addEventListener('click', nextStep);
}

function nextStep() {
  if (state.currentIndex + 1 >= state.activeQuestionIds.length) {
    renderResult();
    return;
  }
  state.currentIndex += 1;
  renderQuestion();
  elements.quizView.scrollIntoView({ block: 'start' });
}

function getProfile(score) {
  return getCurrentLocale().resultProfiles.reduce(function(best, profile) {
    return score >= profile.min ? profile : best;
  }, getCurrentLocale().resultProfiles[0]);
}

function getShareUrl() {
  return location.href.split('#')[0];
}

function getShareData(profile, total) {
  const locale = getCurrentLocale();
  return {
    title: locale.meta.title,
    text: locale.ui.shareText(state.score, total, profile.title),
    url: getShareUrl()
  };
}

function getLocalizedWeaknesses() {
  const topicCounts = new Map();
  state.mistakeQuestionIds.forEach(function(count, questionId) {
    const question = getQuestionById(questionId, currentLanguage);
    topicCounts.set(question.topic, (topicCounts.get(question.topic) || 0) + count);
  });
  return Array.from(topicCounts.entries()).sort(function(a, b) { return b[1] - a[1]; });
}

function renderResult(options) {
  const total = state.activeQuestionIds.length;
  const profile = getProfile(state.score);
  const shareData = getShareData(profile, total);
  const ui = getCurrentLocale().ui;

  elements.resultTitle.textContent = profile.title;
  elements.resultScore.textContent = `${state.score}/${total}`;
  elements.resultDescription.textContent = profile.description;
  elements.shareText.value = `${shareData.text}\n${shareData.url}`;
  elements.shareButton.hidden = typeof navigator.share !== 'function';
  elements.copyButton.textContent = ui.copyButton;

  const weaknesses = getLocalizedWeaknesses();
  elements.weaknesses.innerHTML = '';
  if (weaknesses.length === 0) {
    const span = document.createElement('span');
    span.textContent = ui.noWeakness;
    elements.weaknesses.appendChild(span);
  } else {
    weaknesses.slice(0, 3).forEach(function(item) {
      const span = document.createElement('span');
      span.textContent = `${ui.weaknessPrefix}${item[0]}`;
      elements.weaknesses.appendChild(span);
    });
  }

  showView(elements.resultView);
  if (!options || !options.preserveScroll) {
    elements.resultView.scrollIntoView({ block: 'start' });
  }
}

async function copyShareText() {
  const ui = getCurrentLocale().ui;
  elements.shareText.hidden = false;
  elements.shareText.select();
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(elements.shareText.value);
    } else {
      document.execCommand('copy');
    }
    elements.copyButton.textContent = ui.copiedButton;
  } catch (error) {
    elements.copyButton.textContent = ui.manualCopyButton;
  }
}

async function shareResult() {
  const total = state.activeQuestionIds.length;
  const profile = getProfile(state.score);
  const shareData = getShareData(profile, total);

  if (typeof navigator.share !== 'function') {
    await copyShareText();
    return;
  }

  try {
    await navigator.share(shareData);
  } catch (error) {
    if (error.name !== 'AbortError') {
      await copyShareText();
    }
  }
}

elements.languageButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    setLanguage(button.dataset.language);
  });
});

elements.startButton.addEventListener('click', startQuiz);
elements.restartButton.addEventListener('click', startQuiz);
elements.shareButton.addEventListener('click', shareResult);
elements.copyButton.addEventListener('click', copyShareText);
applyStaticText();
elements.shareText.hidden = true;
elements.shareButton.hidden = true;
