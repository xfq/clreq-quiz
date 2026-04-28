'use strict';

const QUESTION_COUNT = 8;

const questions = [
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
    explanation: '港台标点多居中，中国大陆标点多靠近受注文字一侧；这更像地区排版规则差异，不只是繁简差异。',
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
    explanation: 'clreq 建议用户代理按“区域”而不是只按“繁简”区分排版规则。',
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
    scenario: '这件事<br>—<br>—后来没人再提。',
    choices: [
      ['a', '两个破折号可以随便拆成两行'],
      ['b', '两字宽破折号应视为整体，避免拆到两行'],
      ['c', '中文里不能使用破折号']
    ],
    answer: 'b',
    explanation: 'clreq 说明破折号占两个汉字空间，不应为了适配分行而断开。',
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
    explanation: '中文省略号占两个汉字空间，clreq 明确说明不应以适配分行为由拆至两行。',
    source: 'https://www.w3.org/TR/clreq/#h_ellipsis'
  },
  {
    id: 'emphasis-position',
    topic: '着重号',
    question: '横排中文里的着重号通常放在哪里？',
    scenario: '<span class="mark">重</span><span class="mark">要</span> 两字需要强调。',
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
    question: '给一整句加着重号时，标点也通常一起加点吗？',
    scenario: '这句话很重要。',
    choices: [
      ['a', '标点通常不再添加着重号'],
      ['b', '所有标点必须加着重号'],
      ['c', '只有句号必须加着重号']
    ],
    answer: 'a',
    explanation: 'clreq 指出，句号、逗号、引号、括号、书名号等标点的底端或顶端通常不再添加着重号。',
    source: 'https://www.w3.org/TR/clreq/#id84'
  },
  {
    id: 'mixed-punctuation',
    topic: '中西混排',
    question: '中文正文中夹杂英文和数字时，标点原则上怎么处理？',
    scenario: '我们发布了 CSS Writing Modes Level 4。',
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
    scenario: '直排文本中出现 Internationalization 这样的词。',
    choices: [
      ['a', '逐个字母直排'],
      ['b', '常使用比例字体并顺时针旋转90°配置'],
      ['c', '必须删除西文']
    ],
    answer: 'b',
    explanation: 'clreq 说明，一般西文单词、语句或四位数以上数字在直排中常旋转 90°配置。',
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
    question: '下面哪种换行通常应避免？',
    scenario: '气温达到 37<br>℃，请注意防暑。',
    choices: [
      ['a', '数字和 ℃ 之间断行'],
      ['b', '句子自然换行'],
      ['c', '段落之间换行']
    ],
    answer: 'a',
    explanation: '百分号、千分号、度数符号等与前面的阿拉伯数字之间通常不能拆成两行。',
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
];

const resultProfiles = [
  { min: 0, title: '标点还在逃', description: '你更关注内容本身，对排版细节还比较宽容。下次看到行首标点或奇怪省略号，可以多停一秒看看。' },
  { min: 3, title: '排版观察员', description: '你已经能发现一些“不太对劲”的地方。再熟悉几条规则，就能找到问题了。' },
  { min: 5, title: '细节捕手', description: '你不只凭感觉看版面，也能把问题对应到具体规则。很多中文网页的小毛病逃不过你的法眼。' },
  { min: 7, title: '中文排版守门人', description: '你理解中文排版背后的结构感。把这份敏感度带到设计和开发里，读者会感谢你。' }
];

const state = {
  activeQuestions: [],
  currentIndex: 0,
  selectedChoice: null,
  score: 0,
  mistakesByTopic: new Map()
};

const elements = {
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
  state.activeQuestions = shuffle(questions).slice(0, Math.min(QUESTION_COUNT, questions.length));
  state.currentIndex = 0;
  state.selectedChoice = null;
  state.score = 0;
  state.mistakesByTopic = new Map();
  showView(elements.quizView);
  renderQuestion();
}

function renderQuestion() {
  const question = state.activeQuestions[state.currentIndex];
  const total = state.activeQuestions.length;
  state.selectedChoice = null;

  elements.progressText.textContent = `第 ${state.currentIndex + 1} / ${total} 题`;
  elements.progressBar.style.width = `${((state.currentIndex + 1) / total) * 100}%`;
  elements.topicLabel.textContent = question.topic;
  elements.questionTitle.textContent = question.question;
  elements.scenario.innerHTML = question.scenario;
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
    button.setAttribute('aria-pressed', 'false');
    button.textContent = `${choice[0].toUpperCase()}. ${choice[1]}`;
    button.addEventListener('click', function() { selectChoice(choice[0]); });
    elements.choices.appendChild(button);
  });
}

function selectChoice(choiceId) {
  if (elements.feedback.hidden === false) {
    return;
  }
  state.selectedChoice = choiceId;
  elements.warning.hidden = true;
  Array.from(elements.choices.children).forEach(function(button) {
    button.setAttribute('aria-pressed', String(button.dataset.choice === choiceId));
  });
  revealFeedback();
}

function revealFeedback() {
  const question = state.activeQuestions[state.currentIndex];
  if (!state.selectedChoice) {
    elements.warning.hidden = false;
    return;
  }

  const isCorrect = state.selectedChoice === question.answer;
  if (isCorrect) {
    state.score += 1;
  } else {
    state.mistakesByTopic.set(question.topic, (state.mistakesByTopic.get(question.topic) || 0) + 1);
  }

  Array.from(elements.choices.children).forEach(function(button) {
    button.disabled = true;
    if (button.dataset.choice === question.answer) button.classList.add('correct');
    if (button.dataset.choice === state.selectedChoice && !isCorrect) button.classList.add('incorrect');
  });

  elements.feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
  elements.feedback.innerHTML = `
    <h3>${isCorrect ? '答对了' : '这题可以再留意'}</h3>
    <p>${question.explanation}</p>
    <p><a href="${question.source}" target="_blank">查看 clreq 对应章节</a></p>
    <button class="primary-button" type="button" id="next-button">${state.currentIndex + 1 === state.activeQuestions.length ? '查看结果' : '下一题'}</button>
  `;
  elements.feedback.hidden = false;
  document.getElementById('next-button').addEventListener('click', nextStep);
}

function nextStep() {
  if (state.currentIndex + 1 >= state.activeQuestions.length) {
    renderResult();
    return;
  }
  state.currentIndex += 1;
  renderQuestion();
  elements.quizView.scrollIntoView({ block: 'start' });
}

function getProfile(score) {
  return resultProfiles.reduce(function(best, profile) {
    return score >= profile.min ? profile : best;
  }, resultProfiles[0]);
}

function getShareUrl() {
  return location.href.split('#')[0];
}

function getShareData(profile, total) {
  return {
    title: '中文排版问题小测验',
    text: `我在「中文排版问题小测验」中拿到 ${state.score}/${total}，类型是「${profile.title}」。你能看出中文网页里的标点、换行和省略号问题吗？`,
    url: getShareUrl()
  };
}

function renderResult() {
  const total = state.activeQuestions.length;
  const profile = getProfile(state.score);
  const shareData = getShareData(profile, total);

  elements.resultTitle.textContent = profile.title;
  elements.resultScore.textContent = `${state.score}/${total}`;
  elements.resultDescription.textContent = profile.description;
  elements.shareText.value = `${shareData.text}\n${shareData.url}`;
  elements.shareButton.hidden = typeof navigator.share !== 'function';

  const weaknesses = Array.from(state.mistakesByTopic.entries()).sort(function(a, b) { return b[1] - a[1]; });
  elements.weaknesses.innerHTML = '';
  if (weaknesses.length === 0) {
    const span = document.createElement('span');
    span.textContent = '没有明显薄弱项';
    elements.weaknesses.appendChild(span);
  } else {
    weaknesses.slice(0, 3).forEach(function(item) {
      const span = document.createElement('span');
      span.textContent = `可继续关注：${item[0]}`;
      elements.weaknesses.appendChild(span);
    });
  }

  showView(elements.resultView);
  elements.resultView.scrollIntoView({ block: 'start' });
}

async function copyShareText() {
  elements.shareText.hidden = false;
  elements.shareText.select();
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(elements.shareText.value);
    } else {
      document.execCommand('copy');
    }
    elements.copyButton.textContent = '已复制';
  } catch (error) {
    elements.copyButton.textContent = '请手动复制下方文案';
  }
}

async function shareResult() {
  const total = state.activeQuestions.length;
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

elements.startButton.addEventListener('click', startQuiz);
elements.restartButton.addEventListener('click', startQuiz);
elements.shareButton.addEventListener('click', shareResult);
elements.copyButton.addEventListener('click', copyShareText);
elements.shareText.hidden = true;
elements.shareButton.hidden = true;
