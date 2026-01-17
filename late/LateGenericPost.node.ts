import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, } from 'n8n-workflow';
import { postsCreatePreSend } from './resources/utils/routingHooks'; // <-- Düzeltilmiş yol

export class LateGenericPost implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Late Create Post (Generic)',
        name: 'lateGenericPost',
        icon: 'file:late-logo.svg', // <-- Düzeltilmiş ikon yolu
        group: ['transform'],
        version: 1,
        subtitle: 'Generic Post Creator',
        description: 'A simplified, automation-first node to create posts with LATE for any platform',
        defaults: {
            name: 'Late Create Post (Generic)',
        },
        credentials: [
            {
                name: 'lateApi',
                required: true,
            },
        ],
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            // Bu nod sadece tek bir işlem yapacak: Create Post
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'hidden',
                default: 'create',
            },
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'hidden',
                default: 'posts',
            },

            // --- OTOMASYON İÇİN GEREKLİ ALANLAR ---

            {
                displayName: 'Content',
                name: 'content',
                type: 'string',
                typeOptions: {
                    rows: 4,
                },
                default: '',
                required: true,
                description: 'The main text content of the post. Use expressions to link data.',
            },
            {
                displayName: 'Platforms (JSON Array)',
                name: 'platforms',
                type: 'json',
                default: '[\n  {\n    "platform": "facebook",\n    "accountId": "YOUR_FB_ACCOUNT_ID"\n  }\n]',
                required: true,
                description: 'An array of platform objects. Example: [{ "platform": "pinterest", "accountId": "...", "platformSpecificData": { "pinterest": { "link": "..." } } }]',
                placeholder: '[{ "platform": "facebook", "accountId": "..." }]',
            },
            {
                displayName: 'Media Items (JSON Array)',
                name: 'mediaItems',
                type: 'json',
                default: '[]',
                description: 'An array of media objects (e.g., [{ "type": "image", "url": "..." }]). Leave empty for text-only posts.',
            },
            {
                displayName: 'Scheduled For (ISO Date)',
                name: 'scheduledFor',
                type: 'string',
                default: '',
                description: 'ISO 8601 date string for scheduling (e.g., 2026-01-19T07:13:49Z). Leave empty to publish now.',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        // Bu bölüm, postsCreatePreSend fonksiyonunu kullanarak veriyi API'ye gönderir.
        // Bu sayede orijinal nodun tüm bağlantı ve veri hazırlama mantığını miras almış oluruz.
        const sendHook = postsCreatePreSend.bind(this);
        return sendHook();
    }
}