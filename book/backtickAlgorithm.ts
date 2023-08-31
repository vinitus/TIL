export interface FilterTarget {
  include: string[];
  exclude: string[];
  excludeTag: string[];
}

export default function backtickAlgorithm(markdown: string, filterTarget: FilterTarget) {
  // 줄바꿈을 기준으로 배열로 나누기
  const splitedMarkdown = markdown.split('\n');

  // statement를 기반으로 한 정규식 만들기
  const { include, exclude, excludeTag } = filterTarget;

  // include 정규식 생성, 앞은 공백이 아닌 문자로 하고 뒤는 어떤 단어가 왔으나 영어면 전부 미포함
  const includeRegex = new RegExp(`(?<!\\S)(?:${include.join('|')})(?![a-zA-Z])`, 'gi');

  // exclude 정규식 생성, exclude는 해당 문자열이 들어간 모든 것을 해야할듯?
  const excludeRegex = new RegExp(`${exclude.join('|')}`, 'gi');

  splitedMarkdown.forEach((line, n) => {
    let pushWordIdx = 0;
    const trimedLine = line.trim();

    const checkIsExcludeTag = excludeTagToRegExp(excludeTag).test(trimedLine);
    if (checkIsExcludeTag) return;

    const includeMatchedWordIter = trimedLine.matchAll(includeRegex);
    const includeMatchedWords = [...includeMatchedWordIter];

    const excludeMatchedWordIter = trimedLine.matchAll(excludeRegex);
    const excludeMatchedWords = [...excludeMatchedWordIter];

    if (!includeMatchedWords.length) return;

    let flag = true;

    includeMatchedWords.forEach((includeWordArr) => {
      const { 0: includeWord, index: includeIndex } = includeWordArr;

      if (includeIndex === undefined) return;

      if (excludeMatchedWords.length) {
        excludeMatchedWords.forEach((excludeWordArr) => {
          const { 0: excludeWord, index: excludeIndex } = excludeWordArr;
          // 연관없는 단어에 대한 종료처리
          if (!new RegExp(`${includeWord}`, 'gi').test(excludeWord)) return;

          // 띄어져있는 단어에 대한 처리
          if (new RegExp(`\\b${includeWord}\\b`, 'gi').test(excludeWord)) {
            // 타겟단어는 exclude의 중앙 단어임
            const { index } = [...excludeWord.matchAll(new RegExp(`\\b${includeWord}\\b`, 'gi'))][0];

            // typescript undefined 에러 제거를 위한 조건문, 이 상황은 나올 이유가 없음
            if (index === undefined) return;

            if (includeIndex - index === excludeIndex) {
              flag = false;
              return;
            }
          }

          // exclude의 단어가 include의 뒤에 무언가 추가된 형태의 새로운 단어일 경우에 대한 처리
          if (new RegExp(`\\b${includeWord}\\B`, 'gi').test(excludeWord)) {
            flag = false;
            return;
          }
        });
      }

      if (flag) splitedMarkdown[n] = cutSentenceByWord(splitedMarkdown[n], includeWord, includeIndex, pushWordIdx);
    });
  });

  return splitedMarkdown.join('\n');
}

function excludeTagToRegExp(excludeReg: string[]) {
  let tagRegArr: RegExp[] = [];
  if (excludeReg.indexOf('a')) tagRegArr.push(/\[[^\]]*\]\([^\)]*\)/g);
  if (excludeReg.indexOf('h1')) tagRegArr.push(/^# /gm);
  if (excludeReg.indexOf('h2')) tagRegArr.push(/^## /gm);
  if (excludeReg.indexOf('h3')) tagRegArr.push(/^### /gm);
  if (excludeReg.indexOf('h4')) tagRegArr.push(/^#### /gm);
  if (excludeReg.indexOf('h5')) tagRegArr.push(/^##### /gm);
  if (excludeReg.indexOf('h6')) tagRegArr.push(/^###### /gm);

  const tagReg = new RegExp(tagRegArr.map((regex) => regex.source).join('|'), 'g');

  return tagReg;
}

function map<T>(arr: T[], f: (arg: T) => T) {
  const newArr = [...arr];
  forEach<T>(arr, (element: T) => {
    newArr.push(f(element));
  });

  return newArr;
}

function forEach<T>(arr: T[], f: (arg: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    f(item);
  }
}

function cutSentenceByWord(sentence: string, targetWord: string, includeIndex: number, pushWordIndex: number) {
  const sliceIndex = includeIndex + pushWordIndex;
  const frontSentence = sentence.substring(0, sliceIndex);

  const pushedByTargetWord = sliceIndex + targetWord.length;
  const backSentence = sentence.substring(pushedByTargetWord);

  const newSentence = frontSentence + targetWord + backSentence;

  return newSentence;
}
