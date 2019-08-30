import * as React from 'react';
import { CStart } from './CStart';
import { VPage, Page, FA, nav } from 'tonva';
import { consts } from 'consts';

export class VAgencyClauseDetil extends VPage<CStart> {

    private pa: any
    async open(param: any) {
        this.pa = param;
        await this.openPage(this.page, param);
    }



    private page = (param: any) => {
        return <Page header="服务条款与隐私政策" headerClassName={consts.headerClass}>
            <div className="p-4 text-center">
                <p className="mb-5 pl-2 text-left ">
                    <span className="text-info" >VS.20190827</span><br />
                    百灵威化学技术有限公司 （以下简称“本公司”）提供。用户在登录本网站后，请仔细阅读本《服务条款与隐私政策》，如您不同意有关条款或本网站对其进行的修改，请停止使用本网站提供的服务。您一旦使用本网站提供的内容，包括但不限于浏览网站信息、下载网站内容、使用网站提供的第三方网站链接等，即视为您已了解并完全同意本《服务条款与隐私政策》中的所有条款。<br />
                    <br />
                    <span className="text-info" >一、网站使用</span><br />
                    除非相关法律法规许可或征得本公司同意，本网站的信息及其任何组成部分不得被重新编辑、复制、仿制、抄袭，或为任何未经本公司允许的商业目的所使用。如果本公司确定客户行为违法或有损本网站和本公司的合法利益，则本公司保留包括但不限于拒绝提供服务、冻结或删除会员帐户、采取相关法律措施的权利。<br />
                    <br />
                    <span className="text-info" >二、链接</span><br />
                    （一）本网站对第三方网站的链接<br />
                    必要时，本网站将提供对第三方经营的其他网站的超级链接或指引服务，或者通过帧联及其他方式在本网站上提供第三方网站的内容，此“内容”包括但不限于本网站上包含或可获得的任何材料、文件、信息、图片、图表、标识、设计以及本网站上提供的任何其他信息。<br />
                    对第三方网站的链接仅为供您方便之用。本公司保留在任何时间终止对第三方网站链接的权利。所链接网站、网站上的内容及其描述或提供的产品与服务均不受本公司的控制，因此本公司不对任何该等网站及其上的内容、产品或服务（包括对第三方网站的进一步链接）负责。您一旦决定登录或使用任何所链接的网站，应当注意可能会受到适用于该网站的任何条款和条件的限制，同时自行采取预防措施以便在登录或使用该网站时避免病毒或其他破坏性因素。对于您登录或使用所链接网站所产生的任何损失，由您自行承担。<br />
                    本公司对于任何所链接网站或其上所显示的内容、描述或提供的任何产品或服务不作任何保证或陈述，并且不对其作出任何认可、建议、批准或介绍。除非本公司另行明确规定或同意，本公司将不是您与任何被链接网站的提供者之间达成的任何协议的当事方。本公司不对因任何被链接网站上提供的内容、产品、服务等存在的任何中断、延迟、漏洞或疏忽所导致的任何损害或损失（无论该损害或损失是直接、间接、特别或是偶然的）负责。本网站上出现对第三方网站的链接并不表示本公司或本网站与其相关联，或已获得合法授权使用被链接网站中显示的或可通过其链接到的任何商标、商号、标识或著作权。<br />
                    （二）第三方网站对本网站的链接<br />
                    第三方网站对本网站的链接，并不必然表示本公司对第三方作出了某种认可、授权、赞助，或表明其属于本公司的关联企业、合资企业、合作企业或业务伙伴。在多数情况下，本公司并未意识到第三方已提供对本网站的链接。<br />
                    <span className="text-info" >三、知识产权保护</span><br />
                    本网站所载述的域名、商标、商号、信息、文字、图形、图像、声音、链接、软件及所有其它内容均由本公司、其内容提供商及第三方许可人提供。上述内容的知识产权依具体情况分别为本公司、其内容提供商及第三方许可人所拥有。
                    除法律另有规定或双方另有约定外，未经本公司和/或其他权利人事先许可，任何人不得以任何形式通过任何方式（包括但不限于电子、机械复印或录制等方式）复制、展示、修改、转让、分发、重新发布、下载、张贴或传输本网站的内容。
                    未经本公司或商标权人事先许可，任何单位及个人不得以任何方式或理由对本网站的商标、商号或标识的任何部分进行使用、复制、修改、传播或与其它产品捆绑使用。
                    <br />
                    <span className="text-info" >四、免责声明</span><br />
                    本网站所提供的信息，具备一定的准确性、有效性和完整性，但因数据庞大，且受数据来源的不确定性影响，不能保证绝对的准确性、有效性和完整性。本公司及其员工一概毋须以任何方式就任何信息传递或传送的失误、不准确或错误对用户或任何其他人士负任何直接或间接的责任。在法律允许的范围内，本公司不承担用户或任何人士就使用或未能使用本网站所提供的信息或任何链接或项目所引致的任何直接、间接、附带、从属、特殊、惩罚性的损害赔偿（包括但不限于收益、预期利润的损失或失去的业务、未实现预期的节减）。本公司保留自行决定更正本网站中任何部分的任何错误或遗漏的权利。本公司可以在任何时间对本网站、本网站上描述的内容和产品、项目、服务或价格作出任何其他修改而无需通知。
                    本网站、本网站上的信息和内容以及在本网站上可获得的软件和材料均“依原样”提供而不包含明示或暗示的任何性质的陈述或保证。在法律许可的最大限度内，本公司声明不作出任何明示或暗示的陈述和保证，包括但不限于有关安全性、准确性、完整性、适销性、无侵权、适合任何特别目的或没有计算机病毒的保证。您应为使用本网站承担全部责任和风险。
                    如发生以下情况，本网站不对用户的直接或间接损失承担法律责任：<br />
                    1. 营业中断。<br />
                    2. 无法登录本网站，或登录本网站延迟或中断。<br />
                    3. 数据无法传送、错误传送、毁损、灭失或其他修改。<br />
                    4. 因处理本网站上对其它网站的链接或本网站上存在对其它网站的链接所遭受的任何种类的损失或损害。<br />
                    5. 就客户使用本网站（包括链接到第三方网站或自第三方网站链接）而可能产生的计算机病毒、系统失灵或功能紊乱。<br />
                    6. 本《服务条款与隐私政策》第四条中规定的六种情形所引起的用户个人资料的披露或泄露。<br />
                    7. 因不可抗力或本公司无法合理控制的其他原因所导致的用户损失。<br />
                    <br />
                    <span className="text-info" >五、服务变更、中断或终止</span><br />
                    1. 如因系统维护或升级的需要而需暂停网络服务，百灵威将尽可能事先进行通告。<br />
                    2. 如发生下列任何一种情形，百灵威有权随时中断或终止向用户提供本协议项下的网络服务而无需通知用户：<br />
                    (a) 用户提供的资料不真实；<br />
                    (b) 用户违反本协议中规定的使用规则。<br />
                    3. 除前款所述情形外，百灵威同时保留在不事先通知用户的情况下随时中断或终止部分或全部网络服务的权利，对于所有服务的中断或终止而造成的任何损失，百灵威无需对用户或任何第三方承担任何责任。<br />
                    4. 用户若反对任何服务条款的建议或对后来的条款修改有异议，或对网络服务不满，用户只有以下追索权：<br />
                    (a) 不再使用百灵威提供的网络服务。<br />
                    (b) 通告百灵威停止使用百灵威的网络服务，得到百灵威确认后，用户使用网络服务的权利马上中止。从即时起，百灵威不再对用户承担任何义务。<br />
                    <br />
                    <span className="text-info" >六、关于Cookies</span><br />
                    百灵威在您的设备上放置小数据文件（“cookies”）以增强网站的功能。 这是大多数商业网站的常见做法。 这些文本文件允许网站存储您的操作和偏好（例如地理区域），以便您以后的访问更加个性化和简化。 Cookie旨在增强您的用户体验。 例如，他们会将商品存储在购物车中，直到您下次访问为止。<br />
                    Cookie取决于浏览器，您可以通过浏览器阻止Cookie被放置在您的设备上和/或您可以在访问网站后删除Cookie。 这些操作中的任何一种都会限制您的用户体验并导致J＆K网站无法按预期运行。<br />
                    <br />
                    <span className="text-info" >七、个人信息和隐私政策</span><br />
                    1)	百灵威收集的信息<br />
                    本公司将收集您用户资料中的某些信息，以满足法律和业务要求。此信息包括但不限于您的姓名和联系信息。当然，您只会向百灵威提供准确的信息，并且您对与您的用户个人资料帐户相关的所有活动负全部责任。您同意在信息发生任何变化时更新您的个人资料信息。您有责任保密您的用户名和密码，并立即通知我们有任何违反此保密规定的行为。<br />
                    百灵威可能会收集有关其客户和网站用户的汇总统计数据，供其内部使用；可能会使用网站用户和/或客户信息来提供相关信息、促销和奖励。<br />
                    通过cookie可能会收集另外一些信息（参见上文第六节）。<br />
                    <br />
                    2)	信息安全<br />
                    本公司不会出售您的信息，也不会与任何其他个人或企业共享或披露您的信息，除非为您提供您所要求的产品和服务。 这种信息共享可能涉及，但不限于，您从百灵威订购产品的分发、交付、合作伙伴的沟通。 未经相关个人许可，本公司不会向任何第三方分享、出售或分发与其客户、消费者或网站用户有关的任何个人信息。<br />
                    百灵威使用安全套接字层（SSL）软件协议在传输数据时加密您的信息。<br />
                    百灵威遵守所有关于其开展业务的司法管辖区内的数据传输的国家和国际协议。<br />
                    <br />
                    3)	许可<br />
                    您可以选择退出百灵威的某些通信（例如，通过电子邮件发送促销优惠），方法是通过您在用户档案中做出的选择。<br />
                    您可以选择不与百灵威共享您的个人信息，但在这种情况下，您将无法建立用户帐户。 如果没有用户帐户，您仍然可以浏览网站的大部分内容，但无法在线订购或查看某些页面。<br />
                    您可以选择在计算机上禁用cookie，但cookie是网站许多方面功能的组成部分。 如果您不允许使用Cookie，则无法将商品添加到购物车或执行任何要求您登录用户帐户的功能。 此外，如果没有Cookie，百灵威网站将无法定制您的用户体验，以反映您所在地区的产品和服务。<br />
                    <br />
                    4)	用户限制<br />
                    百灵威不向18岁以下的客户销售产品或服务。 本公司不会故意收集、使用或透露18岁以下人士的个人数据。<br />
                    <br />
                    5)	联系信息<br />
                    百灵威致力于向客户保证有权访问他们的信息并更正他们认为不准确的任何信息。 如果您对收集和使用您的个人信息有任何疑问或异议，请通过privacy@jk-sci.com与我们联系。<br />
                    <br />
                    <span className="text-info" >八、条款修改</span><br />
                    本公司保留在任何时间自行修改、增删本《服务条款与隐私政策》中任何内容的权利。您每次登录或使用本网站时均视为同意受当时有效的条款的制约。因此，您每次登录或使用本网站时应查看本《服务条款与隐私政策》的日期，并检查与上一版本的修改之处。<br />
                    <br />
                    <span className="text-info" >九、法律适用与司法管辖</span><br />
                    本《服务条款与隐私政策》的制定、执行和解释及争议的解决均应适用中华人民共和国法律。双方因使用本网站所产生的争议，协商不成的，任何一方可以向本公司所在地人民法院提起诉讼。<br />
                </p>
            </div>
        </Page>
    }
}
