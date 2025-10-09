// project-data.js

const projectData = {
    // --- ID 1: Braço Robótico ---
    '1': {
        
        // TÍTULO EM MÚLTIPLOS IDIOMAS
        title: {
            pt: 'Braço Robótico Autônomo com Visão Computacional',
            en: 'Autonomous Robotic Arm with Computer Vision',
            zh: '具有计算机视觉的自主机械臂',
            ja: 'コンピュータービジョン搭載の自律型ロボットアーム'
        },
        meta: 'Tecnologias: Python, OpenCV, ESP32, Motores de Passo',
        date: 'Setembro 2025',
        image: 'Imagens/projects/robot_arm.jpg',
        
        // VISÃO GERAL EM MÚLTIPLOS IDIOMAS
        overview: {
            pt: `Este projeto foca na criação de um braço robótico de 4 eixos capaz de identificar objetos usando visão 
                 computacional (OpenCV) rodando em um Raspberry Pi embarcado. O sistema utiliza comunicação serial 
                 para controlar a precisão dos motores de passo, permitindo operações complexas de pick-and-place.`,
            en: `This project focuses on creating a 4-axis robotic arm capable of identifying objects using computer 
                 vision (OpenCV) running on an embedded Raspberry Pi. The system uses serial communication to control 
                 the precision of stepper motors, enabling complex pick-and-place operations in simulated industrial environments.`,
            zh: `本项目侧重于创建一个四轴机械臂，能够使用嵌入式树莓派上的计算机视觉（OpenCV）来识别物体。
                 该系统利用串行通信来控制步进电机的精度，可在模拟工业环境中进行复杂的抓取操作。`,
            ja: `本プロジェクトは、組み込みRaspberry Pi上で動作するコンピュータービジョン（OpenCV）を使用して物体を識別できる4軸ロボットアームの作成に焦点を当てています。
                 ステッピングモーターの精度を制御するためにシリアル通信を使用し、シミュレートされた工業環境での複雑なピックアンドプレース操作を可能にします。`
        },
        
        // DESAFIOS EM MÚLTIPLOS IDIOMAS
        challenges: [
            {
                name: {pt: 'Precisão de Posicionamento', en: 'Positioning Accuracy', zh: '定位精度', ja: '位置決め精度'},
                solution: {pt: 'Implementação de controle de micro-passos e calibração via software.', en: 'Implementation of micro-stepping control and software-based calibration.', zh: '实施微步控制和基于软件的校准。', ja: 'マイクロステップ制御とソフトウェアによるキャリブレーションの実装。'}
            },
            {
                name: {pt: 'Processamento em Tempo Real', en: 'Real-Time Processing', zh: '实时处理', ja: 'リアルタイム処理'},
                solution: {pt: 'Otimização dos algoritmos de detecção de bordas e compressão de dados.', en: 'Optimization of edge detection algorithms and data compression.', zh: '优化边缘检测算法和数据压缩。', ja: 'エッジ検出アルゴリズムとデータ圧縮の最適化。'}
            }
        ],
        github: 'https://github.com/seuusuario/robot-arm',
        video: '#'
    },

    // --- ID 2: Estação Meteorológica IoT ---
    '2': {
        title: {
            pt: 'Estação Meteorológica IoT em Tempo Real com ESP32',
            en: 'Real-Time IoT Weather Station with ESP32',
            zh: '基于ESP32的实时物联网气象站',
            ja: 'ESP32によるリアルタイムIoT気象ステーション'
        },
        meta: 'Tecnologias: ESP32, MQTT, AWS IoT, Sensor BME280',
        date: 'Junho 2025',
        image: 'Imagens/projects/iot_sensor.jpg',
        
        overview: {
            pt: `Uma estação meteorológica conectada que coleta dados de temperatura, umidade e pressão. Os dados são enviados 
                 via protocolo MQTT para a AWS IoT Core e visualizados em um dashboard em tempo real.`,
            en: `A connected weather station that collects temperature, humidity, and pressure data. Data is sent via the MQTT 
                 protocol to AWS IoT Core and visualized on a real-time dashboard.`,
            zh: `一个连接的气象站，收集温度、湿度和压力数据。数据通过MQTT协议发送到AWS IoT Core并在实时仪表板上可视化。`,
            ja: `温度、湿度、気圧データを収集する接続型気象ステーション。データはMQTTプロトコル経由でAWS IoT Coreに送信され、リアルタイムダッシュボードで視覚化されます。`
        },
        challenges: [
            {
                name: {pt: 'Conectividade e Bateria', en: 'Connectivity and Battery Life', zh: '连接和电池寿命', ja: '接続性とバッテリー寿命'},
                solution: {pt: 'Uso de modo Deep Sleep do ESP32 e lógica de reconexão automática ao Wi-Fi.', en: 'Using ESP32 Deep Sleep mode and automatic Wi-Fi reconnection logic.', zh: '使用ESP32深度睡眠模式和自动Wi-Fi重连逻辑。', ja: 'ESP32ディープスリープモードの使用とWi-Fi自動再接続ロジック。'}
            }
        ],
        github: 'https://github.com/seuusuario/iot-weather',
        video: '#'
    },
    
    // --- ID 3: Design de PCB ---
    '3': {
        title: {
            pt: 'PCB de Alta Velocidade para Comunicação Wireless BLE',
            en: 'High-Speed PCB for BLE Wireless Communication',
            zh: '用于BLE无线通信的高速PCB',
            ja: 'BLE無線通信用の高速PCB'
        },
        meta: 'Tecnologias: Altium Designer, Bluetooth Low Energy (BLE), Microcontrolador ARM Cortex',
        date: 'Abril 2025',
        image: 'Imagens/projects/pcb_design.jpg',
        
        overview: {
            pt: `Design e prototipagem de uma Placa de Circuito Impresso (PCB) compacta, focada em otimizar a comunicação BLE de baixa latência.
                 O projeto deu ênfase ao roteamento de trilhas de RF e à minimização de ruídos eletromagnéticos.`,
            en: `Design and prototyping of a compact Printed Circuit Board (PCB), focused on optimizing low-latency BLE communication. 
                 The project emphasized RF trace routing and minimizing electromagnetic noise.`,
            zh: `设计和原型制作了一个紧凑的印刷电路板（PCB），专注于优化低延迟BLE通信。
                 该项目强调射频（RF）走线布线和最小化电磁噪声。`,
            ja: `低遅延BLE通信の最適化に焦点を当てたコンパクトなプリント基板（PCB）の設計とプロトタイピング。
                 このプロジェクトでは、RFトレース配線と電磁ノイズの最小化に重点を置きました。`
        },
        challenges: [
            {
                name: {pt: 'Integridade de Sinal', en: 'Signal Integrity', zh: '信号完整性', ja: '信号保全性'},
                solution: {pt: 'Utilização de trilhas de impedância controlada e plano de terra sólido sob a antena.', en: 'Use of controlled impedance traces and a solid ground plane under the antenna.', zh: '使用受控阻抗走线和天线下方坚实的接地层。', ja: '制御されたインピーダンス配線とアンテナ下の強固なグランドプレーンの使用。'}
            }
        ],
        github: 'https://github.com/seuusuario/pcb-ble',
        video: '#'
    }
};