export const emojiScript = () => {
  window._wpemojiSettings = {
    baseUrl: "https://s.w.org/images/core/emoji/15.0.3/72x72/",
    ext: ".png",
    svgUrl: "https://s.w.org/images/core/emoji/15.0.3/svg/",
    svgExt: ".svg",
    source: {
      concatemoji:
        "https://blog.organolab.com.br/wp-includes/js/wp-emoji-release.min.js?ver=6.6.1",
    },
  };
  ((window, document) => {
    const wpEmojiSettingsSupports = "wpEmojiSettingsSupports";
    const tests = ["flag", "emoji"];
    const supportTests = { flag: true, emoji: true };
    const setSupportTests = function (tests) {
      sessionStorage.setItem(
        wpEmojiSettingsSupports,
        JSON.stringify({
          supportTests: tests,
          timestamp: new Date().valueOf(),
        })
      );
    };
    const testEmojiSupport = function (context, text, compareText) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillText(text, 0, 0);
      const data1 = new Uint32Array(
        context.getImageData(
          0,
          0,
          context.canvas.width,
          context.canvas.height
        ).data
      );
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillText(compareText, 0, 0);
      const data2 = new Uint32Array(
        context.getImageData(
          0,
          0,
          context.canvas.width,
          context.canvas.height
        ).data
      );
      return data1.every(function (val, idx) {
        return val === data2[idx];
      });
    };
    const flagTest = function (context, compareFunc) {
      return (
        !compareFunc(
          context,
          "\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f",
          "\ud83c\udff3\ufe0f\u200b\u26a7\ufe0f"
        ) &&
        !compareFunc(
          context,
          "\ud83c\uddfa\ud83c\uddf3",
          "\ud83c\uddfa\u200b\ud83c\uddf3"
        ) &&
        !compareFunc(
          context,
          "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f",
          "\ud83c\udff4\u200b\udb40\udc67\u200b\udb40\udc62\u200b\udb40\udc65\u200b\udb40\udc6e\u200b\udb40\udc67\u200b\udb40\udc7f"
        )
      );
    };
    const loadEmojiScripts = function (emojiConfig) {
      if (emojiConfig.concatemoji) loadScript(emojiConfig.concatemoji);
      else {
        if (emojiConfig.wpemoji) loadScript(emojiConfig.wpemoji);
        if (emojiConfig.twemoji) loadScript(emojiConfig.twemoji);
      }
    };
    const loadScript = function (src) {
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      document.head.appendChild(script);
    };

    if ("Promise" in window) {
      const testsFromStorage = JSON.parse(
        sessionStorage.getItem(wpEmojiSettingsSupports) || "{}"
      );
      if (
        !testsFromStorage ||
        new Date().valueOf() >= testsFromStorage.timestamp + 604800
      ) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (context) {
          context.textBaseline = "top";
          context.font = "600 32px Arial";
          const supportResults = {};
          tests.forEach(function (test) {
            supportResults[test] = flagTest(context, testEmojiSupport);
          });
          setSupportTests(supportResults);
        }
      }
      loadEmojiScripts(window._wpemojiSettings.source);
    }
  })(window, document);
};
const emojiScriptStr = `
window._wpemojiSettings = {
	baseUrl: "https://s.w.org/images/core/emoji/15.0.3/72x72/",
	ext: ".png",
	svgUrl: "https://s.w.org/images/core/emoji/15.0.3/svg/",
	svgExt: ".svg",
	source: {
		concatemoji:
			"https://blog.organolab.com.br/wp-includes/js/wp-emoji-release.min.js?ver=6.6.1",
	},
};
((window, document) => {
	const wpEmojiSettingsSupports = "wpEmojiSettingsSupports";
	const tests = ["flag", "emoji"];
	const supportTests = { flag: true, emoji: true };
	const setSupportTests = function (tests) {
		sessionStorage.setItem(
			wpEmojiSettingsSupports,
			JSON.stringify({
				supportTests: tests,
				timestamp: new Date().valueOf(),
			})
		);
	};
	const testEmojiSupport = function (context, text, compareText) {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.fillText(text, 0, 0);
		const data1 = new Uint32Array(
			context.getImageData(
				0,
				0,
				context.canvas.width,
				context.canvas.height
			).data
		);
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.fillText(compareText, 0, 0);
		const data2 = new Uint32Array(
			context.getImageData(
				0,
				0,
				context.canvas.width,
				context.canvas.height
			).data
		);
		return data1.every(function (val, idx) {
			return val === data2[idx];
		});
	};
	const flagTest = function (context, compareFunc) {
		return (
			!compareFunc(
				context,
				"\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f",
				"\ud83c\udff3\ufe0f\u200b\u26a7\ufe0f"
			) &&
			!compareFunc(
				context,
				"\ud83c\uddfa\ud83c\uddf3",
				"\ud83c\uddfa\u200b\ud83c\uddf3"
			) &&
			!compareFunc(
				context,
				"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f",
				"\ud83c\udff4\u200b\udb40\udc67\u200b\udb40\udc62\u200b\udb40\udc65\u200b\udb40\udc6e\u200b\udb40\udc67\u200b\udb40\udc7f"
			)
		);
	};
	const loadEmojiScripts = function (emojiConfig) {
		if (emojiConfig.concatemoji) loadScript(emojiConfig.concatemoji);
		else {
			if (emojiConfig.wpemoji) loadScript(emojiConfig.wpemoji);
			if (emojiConfig.twemoji) loadScript(emojiConfig.twemoji);
		}
	};
	const loadScript = function (src) {
		const script = document.createElement("script");
		script.src = src;
		script.defer = true;
		document.head.appendChild(script);
	};

	if ("Promise" in window) {
		const testsFromStorage = JSON.parse(
			sessionStorage.getItem(wpEmojiSettingsSupports) || "{}"
		);
		if (
			!testsFromStorage ||
			new Date().valueOf() >= testsFromStorage.timestamp + 604800
		) {
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d", { willReadFrequently: true });
			if (context) {
				context.textBaseline = "top";
				context.font = "600 32px Arial";
				const supportResults = {};
				tests.forEach(function (test) {
					supportResults[test] = flagTest(context, testEmojiSupport);
				});
				setSupportTests(supportResults);
			}
		}
		loadEmojiScripts(window._wpemojiSettings.source);
	}
})(window, document);
`;
export default emojiScriptStr;
