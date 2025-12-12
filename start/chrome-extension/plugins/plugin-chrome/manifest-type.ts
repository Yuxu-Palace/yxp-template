/** biome-ignore-all lint/style/useNamingConvention: chrome manifest config */

interface Icons {
  /** 用作扩展程序页面的网站图标 */
  16?: string;
  32?: string;
  /** 该图标在扩展程序管理页面 (chrome://extensions) 中使用 */
  48?: string;
  /** 安装期间以及由 Chrome 应用商店使用 */
  128?: string;
}

interface ManifestAction {
  /**
   * 指定扩展程序 Google 工具栏中 Google Chrome 工具栏上显示的标题。
   */
  default_title?: string;
  /**
   * 指定扩展程序 Google 工具栏中 Google Chrome 工具栏上显示的弹出窗口。
   */
  default_popup?: string;
  /**
   * 指定扩展程序 Google 工具栏中 Google Chrome 工具栏上显示的图标。
   */
  default_icon?: Icons;
}

interface ManifestBackground {
  /**
   * 指定包含扩展程序服务工作器 JavaScript 文件，该文件充当事件处理脚本。如需了解详情，请参阅[扩展程序服务工作器简介](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers?hl=zh-cn)。
   */
  service_worker?: string;
  /**
   * 指定扩展程序服务工作器 JavaScript 文件的类型。
   */
  type?: 'module';
}

interface ManifestContentScript {
  /**
   * 指定要将内容脚本注入到的网址格式。请参阅[匹配模式](https://developer.chrome.com/docs/extensions/mv3/match_patterns?hl=zh-cn)了解语法。
   */
  matches: string[];
  /**
   * 一系列 CSS 文件路径，按照此数组的顺序进行注入且在发生任何 DOM 构建或网页呈现之前。
   */
  css?: string[];
  /**
   * 注入 CSS 文件后的 JavaScript 文件路径数组，按照它们在此数组中出现的顺序进行注入。数组中的每个字符串都必须是扩展程序根目录中资源的相对路径。系统会自动修剪前导斜杠（“/”）。
   */
  js?: string[];
  /**
   * 不包括要向其中注入内容脚本的网址格式。请参阅[匹配模式](https://developer.chrome.com/docs/extensions/mv3/match_patterns?hl=zh-cn)了解语法。
   */
  exclude_matches?: string[];
  /**
   * 在匹配之后应用，以仅包含也与此 glob 匹配的网址。旨在模拟 [@include](https://wiki.greasespot.net/Metadata_Block#.40include) Greasemonkey 关键字。
   */
  include_globs?: string[];
  /**
   * 在匹配之后应用，以排除与此 glob 匹配的网址。旨在模拟 [@excluded](https://wiki.greasespot.net/Metadata_Block#.40exclude) Greasemonkey 关键字。
   */
  exclude_globs?: string[];
  /**
   * 默认为 false，表示仅匹配顶部的帧。如果设为 true，该帧会注入所有帧，即使该帧不是标签页中的最高帧。每个框架都会单独检查其网址要求，如果不符合网址要求，则不会注入到子框架中。
   */
  all_frames?: boolean;
  /**
   * 默认值为 false。脚本是否应注入由匹配源创建但其网址或源可能与格式不直接匹配的帧。这包括采用不同架构的帧，例如 about:、data:、blob: 和 filesystem:。
   */
  match_origin_as_fallback?: boolean;
  /**
   * 默认值为 false。脚本是否应注入到父网址与 "matches" 中声明的某个格式匹配的 about:blank 帧中。
   */
  match_about_blank?: boolean;
  /**
   * 指定应在何时将脚本注入网页。它对应于 [Document.readyState](https://developer.mozilla.org/docs/Web/API/Document/readyState) 的加载状态： <ph type="x-smartling-placeholder"></ph>
   *
   * "document_start"：DOM 仍在加载。
   *
   * "document_end"：网页的资源仍在加载
   *
   * "document_idle"：DOM 和资源已加载完毕。这是默认值。
   */
  run_at?: 'document_start' | 'document_end' | 'document_idle';
  /**
   * 用于执行脚本的 JavaScript 环境。默认值为 "ISOLATED"，这是内容脚本独有的执行环境。选择 "MAIN" 域意味着脚本将与托管页面的 JavaScript 共享执行环境。如需了解详情，请参阅[在隔离的世界中工作](https://developer.chrome.com/docs/extensions/mv3/content_scripts?hl=zh-cn#isolated_world)。
   */
  world?: 'MAIN' | 'ISOLATED';
}

interface ManifestCrossOriginEmbedderPolicy {
  /**
   * Chrome 会将此字符串用作 Cross-Origin-Embedder-Policy 标头
   */
  value?: 'require-corp' | 'credentialless' | (string & {});
}

interface ManifestContentSecurityPolicy {
  extension_pages?: string;
  sandbox?: string;
}

interface ManifestCrossOriginOpenerPolicy {
  /**
   * Chrome 会将此字符串用作 Cross-Origin-Opener-Policy 标头。
   */
  value?: 'same-origin' | 'same-origin-allow-popups' | (string & {});
}

interface ManifestEventRule {
  event: string;
  actions: Record<'type' | (string & {}), any>[];
  conditions: Record<'type' | (string & {}), any>[];
}

interface ManifestExternallyConnectable {
  /**
   * 获得连接的扩展程序的 ID。如果留空或未指定，任何扩展程序或应用都无法连接。通配符 "*" 将允许所有扩展程序和应用进行连接。
   */
  ids?: string[];
  /**
   * 允许连接的网页的网址格式。如果留空或未指定，任何网页都无法连接。格式不得包含通配符网域或[（有效）顶级网域的子网域](http://publicsuffix.org/list/)
   */
  matches?: string[];
  /**
   * 允许扩展程序使用与其连接的网页的 [TLS 通道 ID](https://developer.chrome.com/docs/extensions/runtime?hl=zh-cn#property-MessageSender-tlsChannelId)。网页还必须选择向扩展程序发送 TLS 通道 ID，具体方法是： 在 Runtime.connect 的 [connectInfo](https://developer.chrome.com/docs/extensions/reference/runtime?hl=zh-cn#type-connect-connectInfo) 或 runtime.sendMessage 的[选项](https://developer.chrome.com/docs/extensions/reference/runtime?hl=zh-cn#property-sendMessage-options-includeTlsChannelId)中将 includeTlsChannelId 设置为 true。如果设为 false， 在任何情况下，都绝不会设置 [runtime.MessageSender.tlsChannelId](https://developer.chrome.com/docs/extensions/runtime?hl=zh-cn#property-MessageSender-tlsChannelId)。
   */
  accepts_tls_channel_id?: boolean;
}

interface ManifestFileHandler {
  /**
   * 指定打开文件时显示的 HTML 文件。该文件必须位于您的扩展名内。无论是显示该文件还是以其他方式使用该文件，均通过 JavaScript 使用适当的网络平台 API 完成处理。此代码必须位于通过 <script> 标记添加的单独 JavaScript 文件中。
   */
  action: string;
  /**
   * 简单易懂的操作说明。
   */
  name: string;
  /**
   * 
"action" 中指定的页面可处理的文件类型。字典中的项是一个键值对，其中键是 MIME 类型，值是文件扩展名数组。对于该键，仅允许使用已知的 MIME 类型。系统允许使用自定义文件类型，但自定义类型的键必须是已知的 MIME 类型，并且 MIME 类型与自定义文件类型之间的映射必须受底层操作系统支持。
   */
  accept: Record<string, string[]>;
  /**
   * 指定应在单个客户端还是多个客户端中打开多个文件。有效值为 "single-client" 和 "multiple-clients"。默认值为 "single-client"。
   */
  launch_type?: 'single-client' | 'multiple-clients';
}

interface ManifestInputComponent {
  /**
   * 输入组件对象的必需名称。
   */
  name: string;
  /**
   * 组件对象 ID。
   */
  id?: string;
  /**
   * 指定的语言或适用语言列表。示例："en", ["en", "pt"]
   */
  language?: string | string[];
  /**
   * 输入法的可选列表。请注意，ChromeOS 仅支持每种输入法使用一种布局。如果指定了多个布局，选择顺序将处于未定义状态。因此，强烈建议扩展程序为每种输入法仅指定一个布局。对于键盘布局，xkb: 前缀表示这是一个键盘布局扩展。
   *
   * 示例：["us::eng"]
   */
  layouts: string | string[];
  /**
   * 用于指定扩展程序资源。
   */
  input_view?: string;
  /**
   * 用于指定扩展程序资源。如果未提供此项，系统将使用默认扩展程序的选项页面。
   */
  options_page?: string;
}

interface ManifestOauth2 {
  client_id: string;
  scopes: string[];
}

interface ManifestRequirements {
  /**
   * "3D" 要求表示 GPU 硬件加速，并采用 "webgl" 或 "css3d" 作为有效值。"webgl" 要求是指 [WebGL API](https://www.khronos.org/webgl/)。有关 Chrome 浏览器 3D 图形支持的详情，请参见关于 [WebGL 和 3D 的帮助文章。 图形](https://support.google.com/chrome/answer/1220892?hl=zh-cn)。您可以列出扩展程序所需的 3D 相关功能
   */
  '3D': {
    features: ('webgl' | 'css3d' | (string & {}))[];
  };
}

interface ManifestSandbox {
  pages: string[];
}

interface ManifestStorage {
  /**
   * 扩展名中包含该政策的文件 架构。
   */
  managed_schema: string;
}

interface ManifestWebAccessibleResource {
  /**
   * 一个字符串数组，其中每个字符串都包含从扩展程序根目录到给定资源的相对路径。资源可能包含星号 (*) 以实现通配符匹配。例如，"/images/*" 会以递归方式公开扩展程序的 images/ 目录中的所有内容，而 "*.png" 会公开所有 PNG 文件。
   */
  resources: string[];
  /**
   * 一个字符串数组，其中每个字符串都包含一个[匹配模式](https://developer.chrome.com/docs/extensions/mv3/match_patterns?hl=zh-cn)，用于指定哪些网站可以访问这组资源。只有来源用于匹配网址。来源包括子网域匹配。Google Chrome 发出“无效的匹配模式”错误消息错误。
   */
  matches?: string[];
  /**
   * 一个字符串数组，其中每个字符串都包含可以访问资源的扩展程序的 ID。
   */
  extension_ids?: string[];
  /**
   * 如果为 true，则仅允许通过动态 ID 访问资源。系统会为每个会话生成一个动态 ID。也就是说，系统会在浏览器重启或扩展程序重新加载时重新生成此文件。
   */
  use_dynamic_url?: boolean;
}

interface ManifestChromeSettingsOverrides {
  /**
   * 首页的新值。
   */
  homepage?: string;
  search_provider?: {
    /**
     * 向用户显示的搜索引擎的名称。如果您不设置 prepopulated_id，则必须提供此值。
     */
    name?: string;
    /**
     * 搜索引擎的多功能框关键字。如果您不设置 prepopulated_id，则必须提供此值。
     */
    keyword?: string;
    /**
     * 搜索引擎使用的搜索网址。
     */
    search_url: string;
    /**
     * 搜索引擎的图标网址。如果您不设置 prepopulated_id，则必须提供此值。
     */
    favicon_url?: string;
    /**
     * 搜索引擎用于提供建议的网址。如果不指定此设置，则相应引擎不支持提供建议。
     */
    suggest_url?: string;
    /**
     * 搜索引擎用于提供即时搜索的网址。如果不指定此属性，则表示相应引擎不支持即时搜索。
     */
    instant_url?: string;
    /**
     * 搜索引擎用于图片搜索的网址。如果不指定此属性，则表示相应引擎不支持图片搜索。
     */
    image_url?: string;
    /**
     * search_url 的 post 参数。
     */
    search_url_post_params?: string;
    /**
     * suggest_url 的 post 参数。
     */
    suggest_url_post_params?: string;
    /**
     * instant_url 的 post 参数。
     */
    instant_url_post_params?: string;
    /**
     * image_url 的 post 参数。
     */
    image_url_post_params?: string;
    /**
     * 除 search_url. 之外可以使用的网址格式列表
     */
    alternate_urls?: string[];
    /**
     * 用于搜索字词的编码。如果您不设置 prepopulated_id，则必须提供此值。
     */
    encoding?: string;
    /**
     * 指定是否应将搜索服务提供商设为默认搜索服务提供商。
     */
    is_default: boolean;
    /**
     * Chrome 内置搜索引擎的 ID。
     */
    prepopulated_id?: number;
    /**
     * 搜索引擎。
     */
    search_provider?: Record<string, any>;
  };
  /**
   * 一个长度数组，包含用作启动页的网址。
   */
  startup_pages?: string[];
}

interface ManifestChromeUrlOverrides {
  bookmarks?: string;
  history?: string;
  newtab?: string;
}

interface Command {
  suggested_key:
    | string
    | {
        default: string;
        mac?: string;
        windows?: string;
        linux?: string;
        chromeos?: string;
        android?: string;
        ios?: string;
      };
  description?: string;
  global?: boolean;
}

type ManifestCommands = {
  _execute_action: Command;
} & Record<string & {}, Command>;

interface ManifestExport {
  allowlist?: string[];
}

interface ManifestImport {
  id: string;
  minimum_version?: string;
}

interface ManifestRuleResource {
  id: string;
  enabled: boolean;
  path: string;
}

interface ManifestDeclarativeNetRequest {
  rule_resources: ManifestRuleResource[];
}

interface ManifestOmnibox {
  /**
   * 搜索框中用于触发多功能框的关键字。
   */
  keyword: string;
}

interface ManifestOptionsUi {
  /**
   * 指定相对于扩展程序根目录的选项页面路径。
   */
  page: string;
  /**
   * 指定选项页面是否在选项卡中打开。
   */
  open_in_tab?: boolean;
}

interface ManifestSidePanel {
  /**
   * 侧边栏最初可以从清单的 "side_panel" 键中的 "default_path" 属性进行设置，以便在每个网站上显示相同的侧边栏。此路径应指向扩展程序目录中的相对路径。
   */
  default_path: string;
}

interface TtsVoice {
  /**
   * voice_name 为必需参数，名称应具有足够的描述性，能够指明语音的名称和所使用的引擎。在极少数情况下，如果两个扩展程序注册了同名的语音，客户端可以指定应执行合成的扩展程序的 ID。
   */
  voice_name: string;
  /**
   * lang 参数是可选的，但强烈建议您使用。几乎在所有情况下，一个语音只能合成一种语言的语音。当引擎支持多种语言时，它可以轻松为每种语言注册单独的声音。在极少数情况下，单个语音可以处理多种语言，最简单的方法就是列出两个单独的语音，并在内部使用相同的逻辑进行处理。不过，如果您想创建一个可处理任何语言的语音，请从扩展程序的清单中省略 lang 参数。
   */
  lang?: string;
  /**
   * 最后，如果引擎可以发送事件来更新客户端的语音合成进度，则必须使用 event_types 参数。强烈建议至少支持 'end' 事件类型，以指示语音何时结束，否则 Chrome 将无法调度已排队的语音指令。
   */
  event_types?: string[];
}

interface ManifestTtsEngine {
  /**
   * 一个数组，其中每个元素都包含一个 TTS 语音。
   */
  voices: TtsVoice[];
}

interface ManifestFileBrowserHandler {
  /**
   * 清单文件中的 id 值。如果您的扩展程序实现了多个处理程序，您可以检查 ID 值，看看触发了哪个处理程序。
   */
  id: string;
  default_title: string;
  file_filters: string[];
}

interface ManifestFileSystemProviderCapabilities {
  /**
   * 是否支持通过 onConfigureRequested 进行配置。默认值：false。
   */
  configurable?: boolean;
  /**
   * 是否支持多个（超过一个）已装载的文件系统。默认值：false。
   */
  watchable?: boolean;
  /**
   * 是否支持设置监视者和通知更改。默认值：false。
   */
  multiple_mounts?: boolean;
  /**
   * 已装载文件系统的数据源。
   */
  source: string;
}

export interface ManifestConfig {
  /**
   * 一个整数，用于指定扩展程序使用的清单文件格式的版本。唯一支持的值是 3。
   */
  manifest_version: 3;
  /**
   * 一个字符串，用于在 [Chrome 应用商店](https://chrome.google.com/webstore?hl=zh-cn)、安装对话框和用户的“Chrome 扩展程序”页面 (chrome://extensions) 中标识扩展程序。此字符串的长度不得超过 75 个字符。如需了解如何使用特定于语言区域的名称，请参阅[国际化](https://developer.chrome.com/docs/extensions/reference/api/i18n?hl=zh-cn)。
   */
  name: string;
  /**
   * 用于标识扩展程序版本号的字符串。如需了解版本号格式设置，请参阅[版本](https://developer.chrome.com/docs/extensions/reference/manifest/version?hl=zh-cn)。
   */
  version: string;
  /**
   * 一个字符串，用于在 Chrome 应用商店和用户的扩展程序管理页面上描述扩展程序。长度上限为 132 个字符。如需了解如何本地化说明，请参阅[国际化](https://developer.chrome.com/docs/extensions/reference/api/i18n?hl=zh-cn)。
   */
  description?: string;
  /**
   * 一个或多个表示您的扩展程序的图标。如需了解最佳实践，请参阅[图标](https://developer.chrome.com/docs/extensions/reference/manifest/icons?hl=zh-cn)。
   */
  icons?: Icons;
  /** TODO: 定义 Google 工具栏中扩展程序图标的外观和行为。如需了解详情，请参阅 [chrome.action](https://developer.chrome.com/docs/extensions/reference/api/action?hl=zh-cn)。 */
  action?: ManifestAction;
  /** 指定包含扩展程序的服务工件的 JavaScript 文件，该文件充当事件处理脚本。如需了解详情，请参阅[扩展程序服务工作器简介](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers?hl=zh-cn)。 */
  background?: ManifestBackground;
  /**
   * 为所选 Chrome 设置定义替换项。如需了解详情，请参阅[替换 Chrome 设置](https://developer.chrome.com/docs/extensions/reference/manifest/chrome-settings-override?hl=zh-cn)。
   */
  chrome_settings_overrides?: ManifestChromeSettingsOverrides;
  /**
   * 为默认的 Chrome 网页定义替换项。如需了解详情，请参阅[替换 Chrome 网页](https://developer.chrome.com/docs/extensions/develop/ui/override-chrome-pages?hl=zh-cn)。
   */
  chrome_url_overrides?: ManifestChromeUrlOverrides;
  /**
   * 在扩展程序中定义键盘快捷键。如需了解详情，请参阅 [chrome.commands](https://developer.chrome.com/docs/extensions/reference/api/commands?hl=zh-cn)。
   */
  commands?: ManifestCommands;
  /**
   * 指定用户打开特定网页时要使用的 JavaScript 或 CSS 文件。如需了解详情，请参阅[内容脚本](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts?hl=zh-cn)。
   *
   * 类型参考: https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts?hl=zh-cn
   */
  content_scripts?: ManifestContentScript[];
  /**
   * 对扩展程序可以使用的脚本、样式和其他资源施加限制。如需了解详情，请参阅[内容安全政策](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy?hl=zh-cn)。
   *
   * 类型参考: https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy?hl=zh-cn
   */
  content_security_policy?: ManifestContentSecurityPolicy;
  /**
   * 为 Cross-Origin-Embedder-Policy HTTP 标头指定值，用于配置在扩展程序页面中嵌入跨源资源。
   */
  cross_origin_embedder_policy?: ManifestCrossOriginEmbedderPolicy;
  /**
   * 为 Cross-Origin-Opener-Policy HTTP 标头指定值，以便确保顶级扩展程序页面不会与跨源文档共享浏览上下文组。
   */
  cross_origin_opener_policy?: ManifestCrossOriginOpenerPolicy;
  /**
   * 为 [declarativeNetRequest](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest?hl=zh-cn) API 定义静态规则，允许屏蔽和修改网络请求。
   */
  declarative_net_request?: ManifestDeclarativeNetRequest;
  /**
   * 一个字符串，用于定义支持多语言区域的扩展程序的默认语言。例如“en”和“pt_BR”。此键是本地化扩展程序的必需键，不得在未本地化的扩展程序中使用。如需了解详情，请参阅[国际化](https://developer.chrome.com/docs/extensions/reference/api/i18n?hl=zh-cn)。
   */
  default_locale?: string;
  /**
   * 定义使用 [DevTools](https://developer.chrome.com/docs/extensions/how-to/devtools/extend-devtools?hl=zh-cn) API 的网页。
   */
  devtools_page?: string;
  /**
   * 允许从扩展程序导出资源。如需了解详情，请参阅[导出](https://developer.chrome.com/docs/extensions/reference/manifest/shared-modules?hl=zh-cn#export)。
   */
  export?: ManifestExport;
  /**
   * 指定哪些其他网页和扩展程序可以连接到您的扩展程序。如需了解详情，请参阅 ["externally_connectable"](https://developer.chrome.com/docs/extensions/reference/manifest/externally-connectable?hl=zh-cn)。
   */
  externally_connectable?: ManifestExternallyConnectable;
  /**
   * 一个字符串，用于指定扩展程序首页的网址。如果未定义此属性，首页将默认为扩展程序的 Chrome 应用商店页面。如果您在自己的网站上[托管扩展程序](https://developer.chrome.com/docs/extensions/how-to/distribute/host-extensions?hl=zh-cn)，此字段尤其有用。
   */
  homepage_url?: string;
  /**
   * 列出您的扩展程序可以与之互动的网页，这些网页是使用网址匹配模式定义的。系统会在安装时请求用户授予对这些网站的权限。如需了解详情，请参阅[主机权限](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions?hl=zh-cn)。
   */
  host_permissions?: string[];
  /**
   * 允许将资源导入扩展程序。如需了解详情，请参阅[导入](https://developer.chrome.com/docs/extensions/reference/manifest/shared-modules?hl=zh-cn#import)。
   */
  import?: ManifestImport[];
  /**
   * 定义扩展程序在无痕模式下的行为方式。支持的值包括 "spanning"、"split" 和 "not_allowed"。如需了解详情，请参阅[无痕模式](https://developer.chrome.com/docs/extensions/reference/manifest/incognito?hl=zh-cn)。
   */
  incognito?: 'spanning' | 'split' | 'not_allowed';
  /**
   * 为各种开发用例指定扩展程序的 ID。如需了解详情，请参阅[密钥](https://developer.chrome.com/docs/extensions/reference/manifest/key?hl=zh-cn)。
   */
  key?: string;
  /**
   * 定义可安装您的扩展程序的最旧 Chrome 版本。该值必须是现有 Chrome 浏览器版本字符串的子字符串，例如 "107" 或 "107.0.5304.87"。如果用户使用的 Chrome 版本低于最低版本，则会在 Chrome 应用商店中看到“不兼容”警告，并且无法安装您的扩展程序。如果您将此属性添加到现有扩展程序，则 Chrome 版本较低的用户将不会收到扩展程序的自动更新。这包括使用[暂存](https://support.google.com/chrome/a/answer/3538894?hl=zh-cn)模式的商家用户。
   */
  minimum_chrome_version?: string;
  /**
   * 允许使用 OAuth 2.0 安全 ID。此键的值必须是具有 "client_id" 和 "scopes" 属性的对象。如需了解详情，请参阅 [OAuth 2.0 教程](https://developer.chrome.com/docs/extensions/how-to/integrate/oauth?hl=zh-cn)。
   */
  oauth2?: ManifestOauth2;
  /**
   * 允许扩展程序在 Chrome 的地址栏中注册关键字。如需了解详情，请参阅[万能搜索框](https://developer.chrome.com/docs/extensions/reference/api/omnibox?hl=zh-cn)。
   */
  omnibox?: ManifestOmnibox;
  /**
   * 为您的扩展程序声明可选的[主机权限](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions?hl=zh-cn)。
   */
  optional_host_permissions?: string[];
  /**
   * 为您的扩展程序声明[可选权限](https://developer.chrome.com/docs/extensions/reference/api/permissions?hl=zh-cn#step-2-declare-optional-permissions-in-the-manifest)。
   */
  optional_permissions?: string[];
  /**
   * 指定 options.html 文件的路径，以供扩展程序用作选项页面。如需了解详情，请参阅[向用户提供选项](https://developer.chrome.com/docs/extensions/develop/ui/options-page?hl=zh-cn)。
   */
  options_page?: string;
  /**
   * 指定 HTML 文件的路径，以便用户从 Chrome“扩展程序”页面更改扩展程序选项。如需了解详情，请参阅[嵌入选项](https://developer.chrome.com/docs/extensions/develop/ui/options-page?hl=zh-cn#embedded_options)。
   */
  options_ui?: ManifestOptionsUi;
  /**
   * 启用特定扩展程序 API。如需了解一般说明，请参阅[权限](https://developer.chrome.com/docs/extensions/reference/permissions?hl=zh-cn)。各个 API 的参考页面会列出它们所需的权限。
   */
  permissions?: string[];
  /**
   * 列出使用该扩展程序所需的技术。如需查看支持的要求列表，请参阅[要求](https://developer.chrome.com/docs/extensions/reference/manifest/requirements?hl=zh-cn)。
   */
  requirements?: ManifestRequirements;
  /**
   * 定义一组不具有扩展程序 API 访问权限或对非沙盒化网页的直接访问权限的扩展程序网页。如需了解详情，请参阅[沙盒](https://developer.chrome.com/docs/extensions/reference/manifest/sandbox?hl=zh-cn)。
   */
  sandbox?: ManifestSandbox;
  /**
   * 一个字符串，包含扩展程序名称的缩写版本，用于字符空间有限时。长度上限为 12 个字符。如果未定义此值，系统会改为显示“name”键的截断版本。
   */
  short_name?: string;
  /**
   * 用于标识要在 [sidePanel](https://developer.chrome.com/docs/extensions/reference/api/sidePanel?hl=zh-cn) 中显示的 HTML 文件。
   */
  side_panel?: ManifestSidePanel;
  /**
   * 为[受管理的存储区域](https://developer.chrome.com/docs/extensions/reference/storage?hl=zh-cn#property-managed)声明 JSON 架构。如需了解详情，请参阅[存储区域清单](https://developer.chrome.com/docs/extensions/reference/manifest/storage?hl=zh-cn)。
   */
  storage?: ManifestStorage;
  /**
   * 将扩展程序注册为文字转语音引擎。如需了解详情，请参阅 [ttsEngine](https://developer.chrome.com/docs/extensions/reference/api/ttsEngine?hl=zh-cn) API。
   */
  tts_engine?: ManifestTtsEngine;
  /**
   * 一个字符串，其中包含扩展程序的更新页面的网址。如果您[在 Chrome 应用商店之外托管扩展程序](https://developer.chrome.com/docs/extensions/how-to/distribute/host-extensions?hl=zh-cn)，请使用此密钥。
   */
  update_url?: string;
  /**
   * 一个字符串，用于描述扩展程序的版本。例如 "1.0 beta" 和 "build rc2"。如果未指定此值，则“版本”值会显示在扩展程序管理页面上。
   */
  version_name?: string;
  /**
   * 定义扩展程序中可供网页或其他扩展程序访问的文件。如需了解详情，请参阅[适用于网络的无障碍资源](https://developer.chrome.com/docs/extensions/reference/manifest/web-accessible-resources?hl=zh-cn)。
   */
  web_accessible_resources?: ManifestWebAccessibleResource[];
  /**
   * 提供对 [fileBrowserHandler](https://developer.chrome.com/docs/extensions/reference/api/fileBrowserHandler?hl=zh-cn) API 的访问权限，让扩展程序可以访问 ChromeOS 文件浏览器。
   */
  file_browser_handlers?: ManifestFileBrowserHandler[];
  /**
   * 指定 ChromeOS 扩展程序要处理的文件类型。如需了解详情，请参阅 [file_handlers](https://developer.chrome.com/docs/extensions/reference/manifest/file-handlers?hl=zh-cn)。
   */
  file_handlers?: ManifestFileHandler[];
  /**
   * 允许访问 [fileSystemProvider](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider?hl=zh-cn) API，以便扩展程序创建 ChromeOS 可以使用的文件系统。
   */
  file_system_provider_capabilities?: ManifestFileSystemProviderCapabilities;
  /**
   * 允许使用输入法编辑器 API。如需了解详情，请参阅 [input_components](https://developer.chrome.com/docs/extensions/reference/manifest/input-components?hl=zh-cn)。
   */
  input_components?: ManifestInputComponent[];
  /**
   * event_rules 清单属性提供了一种机制来添加用于拦截、屏蔽或 使用 [declarativeWebRequest](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest?hl=zh-cn) 修改正在运行的网络请求，或根据 而无需使用 [declarativeContent](https://developer.chrome.com/docs/extensions/reference/api/declarativeContent?hl=zh-cn)。
   */
  event_rules?: ManifestEventRule[];
}

export function defineManifest(manifest: ManifestConfig) {
  return manifest;
}
