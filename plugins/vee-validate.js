import { extend, localize} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';

localize({
  ja: {
    ...ja,
    names: {
      todoTitle: "タイトル"
    }
  }
})

localize('ja');

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// with typescript
for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  });
}